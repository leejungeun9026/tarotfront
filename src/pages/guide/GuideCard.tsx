import PageTitle from "@/components/common/PageTitle";

export default function GuideCard() {
  return (
    <div className="GuideCard">
      <section className="px-4 py-6 sm:py-8 border-0">
        <PageTitle
          title={
            <>
              <span className="tossface me-1">🪄</span>
              타로카드
            </>
          }
          subtitle={
            <>
              전문 타로 리더의 리딩 경험을 기반으로 한 <br />AI 개인 맞춤형 타로 해석 서비스
            </>}
        />
      </section>

    </div>
  );
}
