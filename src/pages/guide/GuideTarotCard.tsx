import type { TarotCardResponseDTO } from "@/apis/response/tarotcard";
import PageTitle from "@/components/common/PageTitle";
import ViewCardDetail from "@/components/tarotcard/ViewCardDetail";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTarotCardStore } from "@/stores/useTarotCardStore";
import { getCardImg } from "@/utils/imageMapper";
import { useState } from "react";

type TabKey = "all" | "major" | "minor";
type SectionKey = "major" | "minor" | "wands" | "cups" | "swords" | "pentacles";

const SECTION_TITLE: Record<SectionKey, { title: string; icon?: string }> = {
  major: { title: "메이저", icon: "🌞" },
  minor: { title: "마이너", icon: "🌜" },
  cups: { title: "컵", icon: "🏆" },
  wands: { title: "완즈", icon: "🪄" },
  swords: { title: "소드", icon: "⚔" },
  pentacles: { title: "펜타클", icon: "🪙" },
};

function TarotCardGrid({
  list,
  onSelect,
}: {
  list: TarotCardResponseDTO[];
  onSelect: (card: TarotCardResponseDTO) => void;
}) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4 gap-y-8">
      {list.map((card) => (
        <div
          key={card.id}
          onClick={() => onSelect(card)}
          className="text-center space-y-2 cursor-pointer focus:outline-none"
        >
          <Badge variant="outline" className="">
            {card.arcanaType === "MAJOR" ? "메이저" : "마이너"}
          </Badge>

          <div className="w-fit mx-auto rounded-md shadow-sm border overflow-hidden">
            <img
              src={getCardImg(card.id) ?? ""}
              alt={card.nameKr}
              className=""
              loading="lazy"
            />
          </div>

          <div>
            <p className="text-sm font-semibold">{card.nameKr}</p>
            <p className="text-xs text-muted-foreground">{card.nameEn}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GuideTarotCard() {
  const { cards, loadingCards, getMajorArcana, getMinorArcana } =
    useTarotCardStore();

  const all = cards;
  const major = getMajorArcana();
  const minor = getMinorArcana();
  const minor_cup = minor.filter((card) => card.nameEn.includes("Cups"));
  const minor_pentacle = minor.filter((card) =>
    card.nameEn.includes("Pentacles")
  );
  const minor_sword = minor.filter((card) => card.nameEn.includes("Swords"));
  const minor_wand = minor.filter((card) => card.nameEn.includes("Wands"));

  const [tab, setTab] = useState<TabKey>("all");
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TarotCardResponseDTO | null>(
    null
  );

  function tarotCardTitle(cardType: string, cardList: TarotCardResponseDTO[]) {
    switch (cardType) {
      case "major":
        return (
          <>
            <h2 className="text-lg font-semibold mb-2">
              <span className="tossface me-1">{SECTION_TITLE.major.icon}</span>
              {SECTION_TITLE.major.title}({cardList.length})
            </h2>
            <p className="text-sm text-neutral-600 mb-6">
              메이저 아르카나는 0번 바보(The Fool) 카드부터 21번 세계(The World)
              카드까지, <br />
              <b>인생의 흐름과 중요한 전환점을 상징</b>하는 카드들이에요.
            </p>
          </>
        );
      case "minor":
        return (
          <>
            <h2 className="text-lg font-semibold mb-2">
              <span className="tossface me-1">{SECTION_TITLE.minor.icon}</span>
              {SECTION_TITLE.minor.title}({cardList.length})
            </h2>
            <p className="text-sm text-neutral-600 mb-6">
              마이너 아르카나는 흙(동전 Pentacles)&middot;물(컵
              Cups)&middot;불(지팡이 Wands)&middot;공기(검 Swords), 네 가지
              원소를 바탕으로 <br />
              에이스부터 10까지의 숫자 카드와
              왕(King)&middot;여왕(Queen)&middot;기사(Knight)&middot;시종(Page)으로
              이루어진 코트 카드로 구성되어있어 <br />
              <b>일상 속 감정, 관계, 현실적인 상황</b>을 더 섬세하게 보여줘요.
            </p>
          </>
        );
      case "cups":
        return (
          <h3 className="text-base font-semibold mb-6">
            <span className="tossface me-1">{SECTION_TITLE.cups.icon}</span>
            {SECTION_TITLE.cups.title}({cardList.length})
          </h3>
        );
      case "wands":
        return (
          <h3 className="text-base font-semibold mb-6">
            <span className="tossface me-1">{SECTION_TITLE.wands.icon}</span>
            {SECTION_TITLE.wands.title}({cardList.length})
          </h3>
        );
      case "swords":
        return (
          <h3 className="text-base font-semibold mb-6">
            <span className="tossface me-1">{SECTION_TITLE.swords.icon}</span>
            {SECTION_TITLE.swords.title}({cardList.length})
          </h3>
        );
      case "pentacles":
        return (
          <h3 className="text-base font-semibold mb-6">
            <span className="tossface me-1">
              {SECTION_TITLE.pentacles.icon}
            </span>
            {SECTION_TITLE.pentacles.title}({cardList.length})
          </h3>
        );
    }
  }

  const activeList = tab === "major" ? major : tab === "minor" ? minor : all;

  const openByCard = (card: TarotCardResponseDTO) => {
    setSelectedCard(card);
    setOpenDetail(true);
  };

  const closeDetail = () => setOpenDetail(false);

  const goPrev = () => {
    if (!selectedCard || activeList.length === 0) return;
    const idx = activeList.findIndex((c) => c.id === selectedCard.id);

    const safeIdx = idx >= 0 ? idx : 0;
    const prevIdx = (safeIdx - 1 + activeList.length) % activeList.length;
    setSelectedCard(activeList[prevIdx]);
  };

  const goNext = () => {
    if (!selectedCard || activeList.length === 0) return;
    const idx = activeList.findIndex((c) => c.id === selectedCard.id);

    const safeIdx = idx >= 0 ? idx : 0;
    const nextIdx = (safeIdx + 1) % activeList.length;
    setSelectedCard(activeList[nextIdx]);
  };

  if (loadingCards || cards.length === 0) {
    return <div className="p-6">로딩중...</div>;
  }

  return (
    <div className="GuideTarotCard">
      <section className="px-4 pt-6 sm:pt-8 border-0">
        <PageTitle
          title={
            <>
              <span className="tossface me-1">🪄</span>
              타로카드
            </>
          }
          subtitle={<>카드를 누르면 자세한 정보를 볼 수 있어요.</>}
        />
      </section>
      <section className="px-4 py-6 sm:py-8 ">
        <Tabs
          value={tab}
          onValueChange={(v) => {
            const nextTab = v as TabKey;

            const nextList =
              nextTab === "major" ? major : nextTab === "minor" ? minor : all;

            setTab(nextTab);

            if (openDetail && selectedCard) {
              const exists = nextList.some((c) => c.id === selectedCard.id);
              if (!exists) setSelectedCard(nextList[0] ?? null);
            }
          }}
        >
          <TabsList>
            <TabsTrigger value="all" className="cursor-pointer">
              전체 <span className="text-xs opacity-70">({all.length})</span>
            </TabsTrigger>
            <TabsTrigger value="major" className="cursor-pointer">
              메이저{" "}
              <span className="text-xs opacity-70">({major.length})</span>
            </TabsTrigger>
            <TabsTrigger value="minor" className="cursor-pointer">
              마이너{" "}
              <span className="text-xs opacity-70">({minor.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4 space-y-10">
            <div>
              {tarotCardTitle("major", major)}
              <TarotCardGrid list={major} onSelect={openByCard} />
            </div>
            <div>
              {tarotCardTitle("minor", minor)}
              {tarotCardTitle("pentacles", minor_pentacle)}
              <TarotCardGrid list={minor_pentacle} onSelect={openByCard} />
            </div>
            <div>
              {tarotCardTitle("cups", minor_cup)}
              <TarotCardGrid list={minor_cup} onSelect={openByCard} />
            </div>
            <div>
              {tarotCardTitle("wands", minor_wand)}
              <TarotCardGrid list={minor_wand} onSelect={openByCard} />
            </div>
            <div>
              {tarotCardTitle("swords", minor_sword)}
              <TarotCardGrid list={minor_sword} onSelect={openByCard} />
            </div>
          </TabsContent>

          <TabsContent value="major" className="mt-4 space-y-10">
            {tarotCardTitle("major", major)}
            <TarotCardGrid list={major} onSelect={openByCard} />
          </TabsContent>

          <TabsContent value="minor" className="mt-4  space-y-10">
            <div>
              {tarotCardTitle("minor", minor)}
              {tarotCardTitle("cups", minor_cup)}
              <TarotCardGrid list={minor_cup} onSelect={openByCard} />
            </div>
            <div>
              {tarotCardTitle("pentacles", minor_pentacle)}
              <TarotCardGrid list={minor_pentacle} onSelect={openByCard} />
            </div>
            <div>
              {tarotCardTitle("swords", minor_sword)}
              <TarotCardGrid list={minor_sword} onSelect={openByCard} />
            </div>
            <div>
              {tarotCardTitle("wands", minor_wand)}
              <TarotCardGrid list={minor_wand} onSelect={openByCard} />
            </div>
          </TabsContent>
        </Tabs>
      </section>

      <ViewCardDetail
        open={openDetail}
        card={selectedCard}
        onClose={closeDetail}
        onPrev={goPrev}
        onNext={goNext}
      />
    </div>
  );
}
