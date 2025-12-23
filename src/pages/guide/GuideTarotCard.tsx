import type { TarotCardResponseDTO } from "@/apis/response/tarotcard";
import PageTitle from "@/components/common/PageTitle";
import ViewCardDetail from "@/components/tarotcard/ViewCardDetail";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTarotCardStore } from "@/stores/useTarotCardStore";
import { getCardImg } from "@/utils/imageMapper";
import { useMemo, useState } from "react";

type TabKey = "all" | "major" | "minor";

export default function GuideTarotCard() {
  const { cards, loadingCards, getMajorArcana, getMinorArcana } =
    useTarotCardStore();

  const all = cards;
  const major = getMajorArcana();
  const minor = getMinorArcana();

  const [tab, setTab] = useState<TabKey>("all");
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedCard, setSelectedCard] = useState<TarotCardResponseDTO | null>(
    null
  );

  const activeList = useMemo(() => {
    if (tab === "major") return major;
    if (tab === "minor") return minor;
    return all;
  }, [tab, all, major, minor]);

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
      <section className="px-4 py-6 sm:py-8">
        <PageTitle
          title={
            <>
              <span className="tossface me-1">🪄</span>
              타로카드
            </>
          }
        />
      </section>

      <section className="px-4 py-6 sm:py-8">
        <Tabs
          value={tab}
          onValueChange={(v) => {
            const nextTab = v as TabKey;

            // 다음 탭의 리스트
            const nextList =
              nextTab === "major" ? major : nextTab === "minor" ? minor : all;

            setTab(nextTab);

            // 상세가 열려있을 때만: 현재 선택 카드가 다음 리스트에 없으면 첫 카드로 교체
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

          <TabsContent value="all" className="mt-4">
            <TarotCardGrid list={all} onSelect={openByCard} />
          </TabsContent>

          <TabsContent value="major" className="mt-4">
            <TarotCardGrid list={major} onSelect={openByCard} />
          </TabsContent>

          <TabsContent value="minor" className="mt-4">
            <TarotCardGrid list={minor} onSelect={openByCard} />
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

function TarotCardGrid({
  list,
  onSelect,
}: {
  list: TarotCardResponseDTO[];
  onSelect: (card: TarotCardResponseDTO) => void;
}) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4">
      {list.map((card) => (
        <button
          key={card.id}
          type="button"
          onClick={() => onSelect(card)}
          className="text-center space-y-1.5 cursor-pointer focus:outline-none"
        >
          <Badge variant="outline" className="text-[10px]">
            {card.arcanaType === "MAJOR" ? "메이저" : "마이너"}
          </Badge>

          <div className="w-fit mx-auto rounded-md shadow-sm border overflow-hidden">
            <img
              src={getCardImg(card.id) ?? ""}
              alt={card.nameKr}
              className="w-24 h-auto"
              loading="lazy"
            />
          </div>

          <div>
            <p className="text-sm font-semibold">{card.nameKr}</p>
            <p className="text-xs text-muted-foreground">{card.nameEn}</p>
          </div>
        </button>
      ))}
    </div>
  );
}
