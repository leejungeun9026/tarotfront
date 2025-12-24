import { getCardBack, getCardImg } from "@/utils/imageMapper";
import { Info, RotateCcw } from "lucide-react";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { Button } from "../ui/button";

// 라운드 사각형 shape
function roundedRect(w: number, h: number, r: number) {
  const x = -w / 2;
  const y = -h / 2;

  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

export default function Card3d({ cardId }: { cardId: number }) {
  console.log(cardId);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<THREE.Group | null>(null);

  // ✅ cardId 바뀔 때 앞면 텍스처만 바꾸려고 material ref 보관
  const frontMatRef = useRef<THREE.MeshBasicMaterial | null>(null);
  const texLoaderRef = useRef(new THREE.TextureLoader());

  // 원위치(정면) 기준
  const targetQuatRef = useRef(new THREE.Quaternion());
  const targetPosRef = useRef(new THREE.Vector3(0, 0, 0));

  // 스냅(원위치 이동) 토글
  const snapRef = useRef(false);

  // 드래그 상태
  const draggingRef = useRef(false);

  // ✅ 드래그/관성 상태를 cardId 변경에도 유지하려면 ref로 들고 있어야 함
  const yawRef = useRef(0); // y축 회전
  const pitchRef = useRef(0); // x축 회전
  const velYawRef = useRef(0);
  const velPitchRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ======================
      Scene / Camera / Renderer
    ====================== */
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10);
    camera.position.z = 2;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const handleResize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;

      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    handleResize();
    requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);

    /* ======================
      Light
    ====================== */
    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(2, 3, 4);
    scene.add(dir);

    /* ======================
      Card Mesh
    ====================== */
    const W = 0.7;
    const H = 1.2;
    const T = 0.006; // 두께
    const R = 0.04; // 라운드
    const shape = roundedRect(W, H, R);

    const sideGeom = new THREE.ExtrudeGeometry(shape, {
      depth: T,
      bevelEnabled: false,
    });
    sideGeom.translate(0, 0, -T / 2);

    const sideMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.6,
    });
    const sideMesh = new THREE.Mesh(sideGeom, sideMat);

    const faceGeom = new THREE.ShapeGeometry(shape);

    // UV
    const pos = faceGeom.getAttribute("position") as THREE.BufferAttribute;
    const uvs: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      uvs.push((pos.getX(i) + W / 2) / W, (pos.getY(i) + H / 2) / H);
    }
    faceGeom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

    const loader = new THREE.TextureLoader();

    // ✅ 앞/뒤 placeholder를 각각 따로 로드 (앞면 교체 시 dispose해도 뒷면 안 깨지게)
    const placeholderFrontTex = loader.load(getCardBack(null));
    const backTex = loader.load(getCardBack(null));
    placeholderFrontTex.colorSpace = THREE.SRGBColorSpace;
    backTex.colorSpace = THREE.SRGBColorSpace;

    const frontMat = new THREE.MeshBasicMaterial({
      map: placeholderFrontTex,
      side: THREE.DoubleSide,
    });
    const backMat = new THREE.MeshBasicMaterial({
      map: backTex,
      side: THREE.DoubleSide,
    });

    // ✅ 텍스처 교체를 위해 앞면 material ref 저장
    frontMatRef.current = frontMat;

    const front = new THREE.Mesh(faceGeom, frontMat);
    front.position.z = T / 2 + 0.001;

    const back = new THREE.Mesh(faceGeom, backMat);
    back.position.z = -T / 2 - 0.001;
    back.rotation.y = Math.PI;

    // 카드 생성
    const card = new THREE.Group();
    card.add(sideMesh, front, back);
    scene.add(card);

    // 카드에 ref추가
    cardRef.current = card;

    // 원위치(정면) 기준 저장
    targetQuatRef.current.copy(card.quaternion);
    targetPosRef.current.copy(card.position);

    // 처음 보여줄 때만 살짝 기울이기 (원하는 값으로 조절)
    const initialPitch = THREE.MathUtils.degToRad(-15); // 위아래
    const initialYaw = THREE.MathUtils.degToRad(-20); // 좌우
    card.rotation.set(initialPitch, initialYaw, 0, "YXZ");

    /* ======================
      Timing
    ====================== */
    const clock = new THREE.Clock();

    /* ======================
      Drag + Inertia
    ====================== */
    let lastX = 0;
    let lastY = 0;

    // 초기 각도
    const euler = new THREE.Euler().setFromQuaternion(card.quaternion, "YXZ");
    yawRef.current = euler.y;
    pitchRef.current = euler.x;

    const applyRotation = () => {
      card.rotation.set(pitchRef.current, yawRef.current, 0, "YXZ");
    };

    // 회전 감도 + 가속
    const SPEED = 0.007;
    let lastMoveTime = performance.now();

    // 감쇠(낮을수록 오래 미끄러짐)
    // 프레임마다 vel *= damping 을 할 거라 0.90~0.98 사이 추천
    const damping = 0.93;

    // 너무 느려지면 멈춤 처리
    const stopEps = 0.00002; // rad/ms

    const onDown = (e: PointerEvent) => {
      draggingRef.current = true;
      lastX = e.clientX;
      lastY = e.clientY;

      // 드래그 시작하면 관성 끊기
      velYawRef.current = 0;
      velPitchRef.current = 0;

      lastMoveTime = performance.now();
      renderer.domElement.setPointerCapture(e.pointerId);
    };

    const onMove = (e: PointerEvent) => {
      if (!draggingRef.current) return;

      const now = performance.now();
      const dt = Math.max(1, now - lastMoveTime); // ms
      lastMoveTime = now;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;

      // 속도 기반 가속
      const speed = Math.sqrt(dx * dx + dy * dy) / dt; // px/ms
      const accel = THREE.MathUtils.clamp(1 + speed * 0.15, 1, 3);

      // 이번 프레임의 각도 변화량(rad)
      const dYaw = dx * SPEED * accel;
      const dPitch = dy * SPEED * accel;

      yawRef.current += dYaw;
      pitchRef.current += dPitch;

      // 각속도(rad/ms) 업데이트 (놓는 순간 관성으로 사용)
      velYawRef.current = dYaw / dt;
      velPitchRef.current = dPitch / dt;

      applyRotation();
    };

    const endDrag = (e: PointerEvent) => {
      draggingRef.current = false;
      try {
        renderer.domElement.releasePointerCapture(e.pointerId);
      } catch {
        // 이미 release 된 경우 무시
      }
    };

    renderer.domElement.style.touchAction = "none";
    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerup", endDrag);
    renderer.domElement.addEventListener("pointercancel", endDrag);
    // 캔버스 밖에서 놓치는 케이스 대비
    window.addEventListener("pointerup", endDrag);

    /* ======================
      Animate
    ====================== */
    const basePos = new THREE.Vector3().copy(card.position);
    const floatAmp = 0.03;
    const floatSpeed = 2;

    let raf = 0;
    let lastFrameTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const dt = Math.max(1, now - lastFrameTime); // ms
      lastFrameTime = now;

      const t = clock.getElapsedTime();

      if (snapRef.current) {
        // 회전 원위치
        card.quaternion.slerp(targetQuatRef.current, 0.15);
        // 위치 원위치
        card.position.lerp(targetPosRef.current, 0.12);

        // 스냅 중에는 관성 끊기
        velYawRef.current = 0;
        velPitchRef.current = 0;

        if (card.quaternion.angleTo(targetQuatRef.current) < 0.001) {
          card.quaternion.copy(targetQuatRef.current);
          card.position.copy(targetPosRef.current);
          snapRef.current = false;

          // 원위치 후 각도 상태 갱신
          const ee = new THREE.Euler().setFromQuaternion(
            card.quaternion,
            "YXZ"
          );
          yawRef.current = ee.y;
          pitchRef.current = ee.x;

          basePos.copy(card.position);
        }
      } else if (draggingRef.current) {
        // 드래그 중엔 둥둥 멈춤 (현재 y를 기준으로 유지)
        basePos.copy(card.position);
      } else {
        // 드래그 아닐 때:
        // 1) 관성 회전 적용
        if (
          Math.abs(velYawRef.current) > stopEps ||
          Math.abs(velPitchRef.current) > stopEps
        ) {
          yawRef.current += velYawRef.current * dt;
          pitchRef.current += velPitchRef.current * dt;

          velYawRef.current *= damping;
          velPitchRef.current *= damping;

          // 아주 작아지면 0으로 정리
          if (Math.abs(velYawRef.current) < stopEps) velYawRef.current = 0;
          if (Math.abs(velPitchRef.current) < stopEps) velPitchRef.current = 0;

          applyRotation();
        }

        // 2) 애니메이션
        card.position.y = basePos.y + Math.sin(t * floatSpeed) * floatAmp;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };

    animate();

    /* ======================
      Cleanup
    ====================== */
    return () => {
      cancelAnimationFrame(raf);

      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerup", endDrag);
      renderer.domElement.removeEventListener("pointercancel", endDrag);
      window.removeEventListener("pointerup", endDrag);

      window.removeEventListener("resize", handleResize);

      renderer.dispose();
      mount.removeChild(renderer.domElement);

      sideGeom.dispose();
      sideMat.dispose();
      faceGeom.dispose();
      frontMat.dispose();
      backMat.dispose();

      // ✅ placeholder/back 텍스처 정리
      placeholderFrontTex.dispose();
      backTex.dispose();

      // ✅ ref 정리
      frontMatRef.current = null;
      cardRef.current = null;
    };
  }, []);

  // ✅ cardId가 바뀔 때 텍스처만 교체
  useEffect(() => {
    const frontMat = frontMatRef.current;
    if (!frontMat) return;

    const url = getCardImg(cardId);
    if (!url) return;

    texLoaderRef.current.load(
      url,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.needsUpdate = true;

        // ✅ 로드 완료된 순간에만 교체
        // (placeholderFrontTex는 frontMat.map으로 들어가있어서 여기서 안전하게 dispose 가능)
        frontMat.map?.dispose();
        frontMat.map = tex;
        frontMat.needsUpdate = true;
      },
      undefined,
      (err) => {
        console.error("front texture load fail", url, err);
      }
    );
  }, [cardId]);

  const handleFaceFront = () => {
    if (!cardRef.current) return;
    // 드래그 중이면 끊고 스냅 시작
    draggingRef.current = false;
    snapRef.current = true;
  };

  return (
    <div className="Card3d">
      <div className="absolute z-0 left-1/2 -translate-x-1/2 top-4 ">
        <div className="select-none flex gap-1 justify-center items-center text-xs text-accent/50">
          <Info className="size-3" /> 카드를 움직이면 돌려볼 수 있어요
        </div>
      </div>
      <div
        ref={mountRef}
        className="card3d_wrap cursor-grab active:cursor-grabbing"
        style={{
          width: "100%",
          height: "300px",
          minHeight: "40vh",
          maxHeight: "50vh",
        }}
      />
      <div className="relative z-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <Button
          variant="outline"
          onClick={handleFaceFront}
        >
          <RotateCcw />
          카드 원위치
        </Button>
      </div>
    </div>
  );
}
