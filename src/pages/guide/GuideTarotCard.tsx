import type { TarotCardResponseDTO } from "@/apis/response/tarotcard";
import PageTitle from "@/components/common/PageTitle";
import ViewCardDetail from "@/components/tarotcard/ViewCardDetail";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTarotCardStore } from "@/stores/useTarotCardStore";
import { getCardImg } from "@/utils/imageMapper";

export default function GuideTarotCard() {
  const { cards, loadingCards, getMajorArcana, getMinorArcana } =
    useTarotCardStore();

  const all = cards;
  const major = getMajorArcana();
  const minor = getMinorArcana();

  const card: TarotCardResponseDTO = {
    id: 1,
    nameEn: "The Fool",
    nameKr: "바보",
    arcanaType: "MAJOR",
    cardNumber: 12,
    description: "test",
    keyword: "test",
    reverseKeyword: "Test",
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
        <Tabs defaultValue="all">
          <TabsList className="">
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
          {loadingCards || cards.length === 0 ? (
            <div className="py-10 text-center text-sm text-muted-foreground">
              카드 불러오는 중...
            </div>
          ) : (
            <>
              <TabsContent value="all" className="mt-4">
                <TarotCardGrid list={all} />
              </TabsContent>
              <TabsContent value="major" className="mt-4">
                <TarotCardGrid list={major} />
              </TabsContent>
              <TabsContent value="minor" className="mt-4">
                <TarotCardGrid list={minor} />
              </TabsContent>
            </>
          )}
        </Tabs>
      </section>

      <ViewCardDetail display={true} card={card} />
    </div>
  );
}

function TarotCardGrid({ list }: { list: TarotCardResponseDTO[] }) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4">
      {list.map((card) => (
        <div key={card.id} className="text-center space-y-1.5">
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
        </div>
      ))}
    </div>
  );
}
