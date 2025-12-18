import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useMemo, useState } from "react";

type Term = {
  term: string;
  desc: string;
  tags?: string[];
};

const TERMS: Term[] = [
  {
    term: "스프레드(Spread)",
    desc: "카드를 펼치는 배치 방식이에요. 각 자리(포지션)에 의미가 있어요.",
    tags: ["기본"],
  },
  {
    term: "포지션(Position)",
    desc: "스프레드에서 카드가 놓인 자리의 역할(예: 과거/현재/미래).",
    tags: ["기본"],
  },
  {
    term: "정방향(Upright)",
    desc: "카드가 정상 방향으로 나온 상태. 에너지가 비교적 ‘직접적으로’ 표현돼요.",
    tags: ["카드"],
  },
  {
    term: "역방향(Reversed)",
    desc: "카드가 뒤집혀 나온 상태. 막힘/지연/과함/내면화 등 다른 방식으로 해석돼요.",
    tags: ["카드"],
  },
  {
    term: "메이저 아르카나(Major Arcana)",
    desc: "큰 흐름/전환점/삶의 테마를 상징하는 22장.",
    tags: ["아르카나"],
  },
  {
    term: "마이너 아르카나(Minor Arcana)",
    desc: "일상/관계/감정/사건 등 구체적인 디테일을 보여주는 56장.",
    tags: ["아르카나"],
  },
  {
    term: "수트(Suit)",
    desc: "마이너 아르카나의 4가지 계열: 완드/컵/소드/펜타클.",
    tags: ["마이너"],
  },
  {
    term: "키워드(Keyword)",
    desc: "카드의 핵심 의미를 짧게 요약한 단어/문장.",
    tags: ["기본"],
  },
];

export default function GuideTerm() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return TERMS;
    return TERMS.filter(
      (t) =>
        t.term.toLowerCase().includes(query) ||
        t.desc.toLowerCase().includes(query) ||
        (t.tags ?? []).some((tag) => tag.toLowerCase().includes(query))
    );
  }, [q]);

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-6">
      <div className="mb-5">
        <h1 className="ff_kyobo text-2xl font-semibold tracking-tight">
          타로 용어 소개
        </h1>
        <p className="text-muted-foreground mt-2 leading-relaxed">
          낯선 단어가 보여도 괜찮아요. 자주 쓰는 용어만 가볍게 정리했어요.
        </p>
      </div>

      <Card className="rounded-2xl mb-4">
        <CardHeader>
          <CardTitle className="text-lg">검색</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="예: 스프레드, 역방향, 메이저..."
            className="rounded-xl"
          />
          <p className="text-xs text-muted-foreground">
            {filtered.length}개 용어가 보여요
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-3">
        {filtered.map((t) => (
          <Card key={t.term} className="rounded-2xl">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between gap-2">
                <CardTitle className="text-base">{t.term}</CardTitle>
                <div className="flex flex-wrap gap-1 justify-end">
                  {(t.tags ?? []).map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t.desc}
              </p>
              <Separator className="mt-4" />
              <p className="text-xs text-muted-foreground mt-3">
                팁: 용어는 외우기보다, 리딩 결과에서 “이 단어가 쓰인 문장”을 한
                번 더 읽어보면 금방 익숙해져요.
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
