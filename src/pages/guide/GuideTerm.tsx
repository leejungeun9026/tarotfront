import PageTitle from "@/components/common/PageTitle";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { useMemo, useState } from "react";

type TarotTerm = {
  term: string;
  desc: string;
  tags?: string[];
};

const TAROT_TERMS: TarotTerm[] = [
  {
    term: "덱(Deck)",
    desc: "타로카드 78장으로 구성된 한 벌을 덱이라고 불러요.",
    tags: ["타로카드"],
  },
  {
    term: "아르카나(Arcana)",
    desc: "'비밀', '신비'라는 뜻으로, 타로카드는 메이저 아르카나와 마이너 아르카나로 나뉘어요.",
    tags: ["타로카드"],
  },
  {
    term: "메이저 아르카나(Major Arcana)",
    desc: "0번부터 21번까지 총 22장으로 이루어진 카드들이에요. 각 카드마다 고유한 이름이 있으며, 인생의 큰 흐름이나 중요한 전환점을 이야기해줘요.",
    tags: ["타로카드", "메이저 아르카나"],
  },
  {
    term: "마이너 아르카나(Minor Arcana)",
    desc: "총 56장으로 이루어진 일상적인 사건과 감정의 변화를 보여주는 카드들이에요. 4가지 슈트로 구성되어 있고, 각 슈트마다 숫자 카드 10장과 페이지(Page), 나이트(Knight), 퀸(Queen), 킹(King)으로 이루어진 코트 카드 4장이 포함돼요. ",
    tags: ["타로카드", "마이너 아르카나"],
  },
  {
    term: "슈트 카드(Suit Card)",
    desc: "나무(Wand), 컵(Cup), 칼(Sword), 동전(Pentacle) 이렇게 네 가지로 나뉘어요. 각각 불, 물, 공기, 흙의 4원소를 상징해요.",
    tags: ["타로카드", "마이너 아르카나"],
  },
  {
    term: "코트 카드(Court Card)",
    desc: "페이지(Page), 나이트(Knight), 퀸(Queen), 킹(King)으로 이루어진 인물 카드예요. 타로 덱에 따라 프린스(Prince), 프린세스(Princess)로 표현되기도 해요.",
    tags: ["타로카드", "마이너 아르카나"],
  },
  {
    term: "리더(Reader) / 텔러(Teller) / 마스터(Master)",
    desc: "타로카드를 읽고 해석해 주는 사람을 의미해요. 보통 상담자라고도 불러요.",
    tags: ["타로점"],
  },
  {
    term: "시커(Seeker)",
    desc: "타로를 보러 온 사람을 뜻해요. 질문자, 내담자라고도 해요.",
    tags: ["타로점"],
  },
  {
    term: "셔플(Shuffle)",
    desc: "타로카드를 섞는 과정을 말해요.",
    tags: ["타로점"],
  },
  {
    term: "커팅(Cutting)",
    desc: "섞은 카드를 몇 개의 묶음으로 나누는 과정을 의미해요.",
    tags: ["타로점"],
  },
  {
    term: "스프레드(Spread)",
    desc: "타로카드를 펼쳐서 정해진 위치에 놓고 해석하는 전체 방식을 말해요.",
    tags: ["타로점"],
  },
  {
    term: "리딩(Reading)",
    desc: "타로카드를 해석하는 과정을 말해요. 키워드 리딩은 카드에 담긴 기본 키워드를 중심으로 해석하는 방식이고, 이미지 리딩은 카드 속 인물의 표정, 색감, 상징물, 배경 등을 종합해 읽어내는 방식이에요.",
    tags: ["타로점"],
  },
];

export default function GuideTerm() {
  const [q, setQ] = useState("");
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return TAROT_TERMS;
    return TAROT_TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(query) ||
        t.desc.toLowerCase().includes(query) ||
        (t.tags ?? []).some((tag) => tag.toLowerCase().includes(query))
    );
  }, [q]);

  return (
    <div className="GuideTerm ">
      <section className="px-4 py-6 sm:py-8">
        <PageTitle
          title={
            <>
              <span className="tossface me-1">📖</span>
              용어 소개
            </>
          }
          subtitle={
            <>낯선 단어가 보여도 괜찮아요. <br />자주 사용하는 용어들을 정리해뒀어요.</>
          }
        />
      </section>
      <section className="px-4 py-6 sm:py-8 pt-0">
        <div className="search_input_wrap relative mb-3">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="예: 스프레드, 역방향, 메이저..."
            className="rounded-xl"
          />
          <div onClick={() => { setQ("") }} className={`absolute right-3 top-1/2 -translate-y-1/2 size-5 rounded-full bg-neutral-100 flex justify-center items-center cursor-pointer ${q == "" ? "hidden" : "block"}`}>
            <X className="size-3 stroke-3 stroke-neutral-600" />
          </div>
        </div>
        <p className="text-xs text-muted-foreground text-start mb-1">
          총 <b className="text-violet-700">{filtered.length}</b>개 용어가 보여요
        </p>
        <div className="grid gap-3">
          {filtered.map((t) => (
            <Card key={t.term} className="gap-3 py-4">
              <CardHeader className="block px-4">
                <CardTitle className="text-base">{t.term}</CardTitle>
                <div className="flex flex-wrap gap-1 pt-1">
                  {(t.tags ?? []).map((tag) => (
                    <span onClick={() => setQ(tag)} className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-violet-500/20 dark:aria-invalid:ring-violet-500/40 aria-invalid:border-violet-500 transition-[color,box-shadow] overflow-hidden border-transparent bg-violet-100 text-violet-500 [a&]:hover:bg-violet-100 /90 cursor-pointer">

                      {tag}
                    </span>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="px-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section >

    </div >
  );
}
