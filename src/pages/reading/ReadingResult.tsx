import domtoimage from "dom-to-image-more";
import { useRef } from "react";

import {
  readingBookmarkToggleRequest,
  readingCommentRequest,
  readingUuidRequest,
} from "@/apis";
import { type ReadingResultResponseDTO } from "@/apis/response/reading";
import ChatBubble from "@/components/common/ChatBubble";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { Textarea } from "@/components/ui/textarea";
import { ResponseCode } from "@/types/enums";
import { toYMD } from "@/utils/date";
import { getCardImg } from "@/utils/imageMapper";
import { CircleAlert, Download, ExternalLink, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "sonner";

function ReadingResult() {
  const { uuid } = useParams<{ uuid: string }>();
  const location = useLocation();
  const captureRef = useRef<HTMLDivElement>(null);
  const [captureMode, setCaptureMode] = useState(false);

  // location으로 받아왔을 때
  const stateResult = location.state as ReadingResultResponseDTO | undefined;

  const [result, setResult] = useState<ReadingResultResponseDTO | null>(
    stateResult ?? null
  );

  // 입력용 코멘트
  const [commentInput, setCommentInput] = useState<string>(
    stateResult?.comment ?? ""
  );
  const [, setSaving] = useState(false);

  useEffect(() => {
    setCommentInput(result?.comment ?? "");
  }, [result?.comment]);

  useEffect(() => {
    if (!uuid) return;

    void (async () => {
      const res = await readingUuidRequest(uuid);
      if (res.code === ResponseCode.SUCCESS) {
        setResult(res.data); // 서버 데이터로 동기화 (comment 포함)
      } else {
        toast.error("조회에 실패했어요.");
      }
    })();
  }, [uuid]);

  if (!result) return <div>로딩중...</div>;

  const {
    isOwner,
    categoryType,
    categoryName,
    questionText,
    spreadType,
    resultTitle,
    resultSummary,
    positions,
    overallAdvice,
    createdAt,
  } = result;

  const todayFortune = questionText === "오늘의 운세";

  const replaceDotWithBr = (text: string): string => {
    return text.replace(/\. /g, ".\n");
  };

  const handleOnChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentInput(e.target.value);
  };

  // 코멘트 저장하기
  const handleSubmitComment = async () => {
    if (!commentInput) return;
    if (!uuid) return;
    if (!commentInput.trim()) {
      toast.error("코멘트를 입력해 주세요.");
      return;
    }

    try {
      setSaving(true);

      const res = await readingCommentRequest(uuid, {
        comment: commentInput,
      });

      if (res.code === ResponseCode.SUCCESS) {
        setResult((prev) =>
          prev ? { ...prev, comment: res.data?.comment ?? commentInput } : prev
        );
        toast.success("코멘트를 저장했어요!");
      } else {
        toast.error(`${res.message} (${res.code})`);
      }
    } catch (e) {
      console.error(e);
      toast.error("저장 중 오류가 발생했어요.");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleBookmark = async () => {
    if (!uuid) return;
    try {
      const res = await readingBookmarkToggleRequest(uuid);
      if (res.code === ResponseCode.SUCCESS && res.data) {
        setResult(res.data);
        toast.success(
          res.data.isBookmarked ? "북마크했어요!" : "북마크를 해제했어요!"
        );
      } else {
        toast.error(`${res.message} (${res.code})`);
      }
    } catch (e) {
      console.error(e);
      toast.error("북마크 처리 중 오류가 발생했어요.");
    }
  };

  // 이미지 저장 버튼
  const injectCaptureResetStyle = () => {
    const id = "capture-reset-style";
    let style = document.getElementById(id) as HTMLStyleElement | null;

    if (!style) {
      style = document.createElement("style");
      style.id = id;
      document.head.appendChild(style);
    }

    style.textContent = `
    /* 캡처할 때만 회색 박스(디버그 outline/border) 제거 */
    body.capture-reset, body.capture-reset * {
      outline: none !important;
      box-shadow: none !important;
    }

    /* ✅ 회색 “테두리”가 border로 찍히는 경우엔 아래 주석 해제 */
    body.capture-reset, body.capture-reset * {
      border-color: transparent !important;  /* 레이아웃 유지, 선만 숨김 */
    }
  `;

    return () => {
      style?.remove();
    };
  };

  const nextFrame = () =>
    new Promise<void>((r) => requestAnimationFrame(() => r()));

  const handleDownloadImage = async () => {
    const node = captureRef.current;
    if (!node) return;

    // ✅ 캡처 직전에 강제 덮어쓰기 (확장프로그램/전역 !important도 이걸로 이김)
    document.body.classList.add("capture-reset");
    const removeStyle = injectCaptureResetStyle();

    try {
      // 스타일 적용될 시간 1~2프레임 확보
      await nextFrame();
      await nextFrame();

      const blob = await domtoimage.toBlob(node, {
        bgcolor: "#ffffff",
        scale: 1, // 속도 우선
        filter: (n: Node) =>
          !(n instanceof HTMLElement) ? true : !n.dataset.ignoreDownload,
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `tarot-result-${uuid ?? "result"}.png`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      toast.error("이미지 저장에 실패했어요.");
    } finally {
      document.body.classList.remove("capture-reset");
      removeStyle();
    }
  };

  // 공유버튼
  const handleShare = async (): Promise<void> => {
    if (!uuid) return;

    const shareUrl = `${window.location.origin}/reading/result/${uuid}?from=archive`;

    // navigator.clipboard 미지원/권한 문제 대비
    const canUseClipboard =
      typeof navigator !== "undefined" &&
      !!navigator.clipboard &&
      typeof navigator.clipboard.writeText === "function";

    try {
      if (!canUseClipboard) throw new Error("Clipboard API not supported");

      await navigator.clipboard.writeText(shareUrl);
      toast.success("주소가 클립보드에 저장됐어요!");
    } catch (e: unknown) {
      console.log(e);
      // fallback: execCommand (구형/권한 제한 환경)
      try {
        const ta = document.createElement("textarea");
        ta.value = shareUrl;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        ta.style.top = "0";
        document.body.appendChild(ta);

        ta.focus();
        ta.select();

        const ok = document.execCommand("copy");
        document.body.removeChild(ta);

        if (!ok) throw new Error("execCommand copy failed");

        toast.success("주소가 클립보드에 저장됐어요!");
      } catch (err: unknown) {
        console.log(err);
        toast.error("클립보드 복사에 실패했어요. 주소를 직접 복사해 주세요.");
      }
    }
  };

  return (
    <div className="ReadingResult relative">
      <div
        ref={captureRef}
        className={`ReadingResult relative ${captureMode ? "capture-mode" : ""
          }`}
      >
        <section className="title_wrap px-4 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="grow">
              <div className="inline-flex gap-3 items-center flex-wrap mb-3">
                <ul className="inline-flex gap-2">
                  <li>
                    <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-violet-100/20 dark:aria-invalid:ring-violet-100/40 aria-invalid:border-violet-100 transition-[color,box-shadow] overflow-hidden border-transparent bg-violet-100 text-violet-500 [a&]:hover:bg-violet-100/90 focus-visible:ring-violet-100/20 dark:focus-visible:ring-violet-100/40 dark:bg-violet-100/60">
                      {todayFortune ? (
                        <>오늘의 운세</>
                      ) : (
                        <>
                          {categoryType} / {categoryName}
                        </>
                      )}
                    </span>
                  </li>
                  <li>
                    <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-[3px] aria-invalid:ring-violet-100/20 dark:aria-invalid:ring-violet-100/40 aria-invalid:border-violet-100 transition-[color,box-shadow] overflow-hidden border-transparent bg-violet-100 text-violet-500 [a&]:hover:bg-violet-100/90 focus-visible:ring-violet-100/20 dark:focus-visible:ring-violet-100/40 dark:bg-violet-100/60">
                      {spreadType}
                    </span>
                  </li>
                  <li>
                    <Badge variant="secondary">
                      {toYMD(new Date(createdAt))}
                    </Badge>
                  </li>
                </ul>
              </div>
              <h4 className="text-2xl font-bold">
                <span className="tossface">🔮</span> {resultTitle}
              </h4>
            </div>
            <div className="shrink-0 ms-auto" data-ignore-download>
              {isOwner && (
                <div className="flex gap-1">
                  <Button
                    onClick={handleToggleBookmark}
                    variant="outline"
                    size="icon-lg"
                  >
                    <Heart
                      className={
                        result.isBookmarked ? "fill-red-500 stroke-red-500" : ""
                      }
                    />
                  </Button>
                  <Button
                    onClick={handleDownloadImage}
                    variant="outline"
                    size="icon-lg"
                  >
                    <Download />
                  </Button>
                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="icon-lg"
                  >
                    <ExternalLink />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </section>
        <section className="resultCard_wrap px-4">
          <Card className="bg_gradient border-0 rounded-3xl">
            <CardContent>
              <ul className="relative z-5 flex gap-2 sm:gap-6 justify-center">
                {positions.map((position) => {
                  return (
                    <li key={position.tarotCardId}>
                      <div className="flex flex-col items-center gap-3">
                        <Badge variant="outline" className="bg-background">
                          {position.positionName}
                        </Badge>
                        <div className="w-auto max-w-40 rounded-md shadow-md border overflow-hidden">
                          <img
                            src={getCardImg(position.tarotCardId) ?? undefined}
                            alt={position.nameEn}
                            className={`${position.isReversed && "rotate-180"}`}
                          />
                        </div>
                        <div className="text-center">
                          {position.isReversed ? (
                            <span className="inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-red-100 text-red-500">
                              역방향
                            </span>
                          ) : (
                            <span className="inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-green-100 text-green-500">
                              정방향
                            </span>
                          )}
                          <div className="mt-2 text-sm">
                            <p>{position.nameEn}</p>
                            <p>({position.nameKr})</p>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </CardContent>
          </Card>
        </section>
        <section className="context_wrap px-4 py-12">
          <div className="flex flex-col items-stretch gap-10">
            <div className="px-2">
              <h6 className="ff_kyobo text-xl relative w-fit h-auto mb-4">
                <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
                <span className="relative z-1">
                  전체적인 해석은 이렇게 나왔어요!
                </span>
              </h6>
              <div className=" whitespace-pre-wrap leading-relaxed">
                {replaceDotWithBr(resultSummary)}
              </div>
            </div>
            <div className="px-2">
              <h6 className="ff_kyobo text-xl relative w-fit h-auto mb-4">
                <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
                <span className="relative z-1">카드를 자세히 해석해볼게요</span>
              </h6>
              <div className="whitespace-pre-wrap leading-relaxed">
                <ul>
                  {positions.map((position) => {
                    return (
                      <li key={position.position} className="not-last:pb-8">
                        <div className="inline-flex items-center gap-2">
                          <b>{position.positionName}</b>:
                          <div className="inline-flex items-center gap-1">
                            <Badge variant="outline">{position.nameEn}</Badge>
                            <Badge variant="outline">{position.nameKr}</Badge>
                            {position.isReversed ? (
                              <span className="inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-red-100 text-red-500">
                                역방향
                              </span>
                            ) : (
                              <span className="inline-flex justify-center items-center  shrink-0 gap-1 px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap bg-green-100 text-green-500">
                                정방향
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="my-2">
                          {replaceDotWithBr(position.positionResult)}
                        </p>
                        {!todayFortune && (
                          <p>
                            <span className="me-1.5 text-violet-900 text-sm font-bold">
                              TIP!
                            </span>
                            <span className="ff_kyobo text-neutral-600">
                              {position.positionAdvice}
                            </span>
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="px-2">
              <h6 className="ff_kyobo text-xl relative w-fit h-auto mb-4">
                <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
                <span className="relative z-1">종합적으로 정리해보자면..</span>
              </h6>
              <div className="whitespace-pre-wrap leading-relaxed">
                {replaceDotWithBr(resultSummary)}
              </div>
            </div>
            <div className="px-2">
              <h6 className="ff_kyobo text-xl relative w-fit h-auto mb-4">
                <span className="absolute z-0 bg-violet-200 w-full h-2 left-0 bottom-0.5 opacity-50"></span>
                <span className="relative z-1">마지막 버블 팁!</span>
              </h6>
              <div className="w-full">
                <ChatBubble
                  colorClass="text-violet-200"
                  tail="left-top"
                  className="max-w-4/5"
                  contentClassName="rounded-3xl px-4 py-3 bg_gradient whitespace-pre-wrap text-start text-white ff_kyobo text-lg leading-relaxed"
                >
                  <p className="relative z-5">
                    {replaceDotWithBr(overallAdvice)}
                  </p>
                </ChatBubble>
              </div>
            </div>
          </div>
        </section>
      </div>
      <section className="px-4">
        {isOwner && (
          <div className="w-full flex flex-col justify-end items-end gap-3">
            <ChatBubble
              colorClass="text-violet-100"
              tail="right-bottom"
              className="w-full xs:max-w-4/5 sm:max-w-4/6 p-1"
              contentClassName="whitespace-pre-wrap text-foreground ff_kyobo text-lg leading-relaxed w-full "
            >
              <Textarea
                id="comment"
                className="border-none rounded-[1.3rem] md:text-base min-h-20 px-4 py-3"
                placeholder="내 감정 기록하기.. (최대 200자 까지)"
                value={commentInput}
                maxLength={200}
                onChange={handleOnChangeComment}
              ></Textarea>
            </ChatBubble>
            <Button onClick={handleSubmitComment} variant="outline" size="lg">
              저장
            </Button>
          </div>
        )}
      </section>
      <section className="px-4 py-8 text-center">
        <div className="mx-auto text-sm text-neutral-600">
          {isOwner && (
            <div className="inline-flex items-start gap-1">
              <div>
                <CircleAlert className="mt-0.5 w-4 h-4 text-red-700" />
              </div>
              <p>
                운세 결과는 보관함에서 다시 볼 수 있어요. 다운로드 및 공유 시
                내가 작성한 코멘트는 보이지 않아요.
              </p>
            </div>
          )}
          {(categoryName === "금전" ||
            categoryName === "투자" ||
            categoryName === "계약" ||
            categoryName === "재물" ||
            categoryName === "쇼핑&지출") && (
              <div className="inline-flex items-start gap-1">
                <div>
                  <CircleAlert
                    size="16"
                    className="mt-0.5 w-4 h-4 text-red-700"
                  />
                </div>
                <p>
                  투자와 관련된 선택은 사용자 본인의 판단과 책임이 요구돼요.{" "}
                  제공되는 카드는 예측이나 보장을 의미하지 않으며, 참고 수준으로만
                  이용해 주세요.
                </p>
              </div>
            )}
        </div>
      </section>
      <Toaster position="top-center" />
    </div>
  );
}

export default ReadingResult;
