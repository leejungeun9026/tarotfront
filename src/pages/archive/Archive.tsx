import { archiveDateRequest, archiveListRequest } from "@/apis";
import { handleApiError } from "@/apis/error-handler";
import type { ArchiveResponseDTO } from "@/apis/response/archive";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Spinner } from "@/components/ui/spinner";
import { ResponseCode } from "@/types/enums";
import { monthRangeYMD, toYMD } from "@/utils/date";
import { getCardImg } from "@/utils/imageMapper";
import { ArchiveX, Heart, MessageCircle } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

function Archive() {
  const navigate = useNavigate();

  const PAGE_SIZE = 10;

  const toStartOfDay = (d: Date) => {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    toStartOfDay(new Date())
  );
  const [month, setMonth] = useState<Date>(() => toStartOfDay(new Date()));

  const [dateSet, setDateSet] = useState<Set<string>>(new Set());
  const [items, setItems] = useState<ArchiveResponseDTO[]>([]);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [loadingMonth, setLoadingMonth] = useState(false);
  const [loadingList, setLoadingList] = useState(false);

  const today = useMemo(() => toStartOfDay(new Date()), []);

  // "YYYY-MM-DD" → 로컬 Date(자정) 파싱 (new Date("YYYY-MM-DD") 이슈 방지)
  const parseYMDToDate = (ymd: string) => {
    const [y, m, d] = ymd.split("-").map(Number);
    return new Date(y, m - 1, d);
  };

  // 월별 도트 데이터
  useEffect(() => {
    let cancelled = false;
    const { from, to } = monthRangeYMD(month);

    (async () => {
      setLoadingMonth(true);
      try {
        const res = await archiveDateRequest(from, to); // res.data: string[]
        if (cancelled) return;

        setDateSet(new Set(res.data ?? []));
      } finally {
        if (!cancelled) setLoadingMonth(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [month]);

  const readingDates = useMemo(
    () => Array.from(dateSet).map(parseYMDToDate),
    [dateSet]
  );

  // 선택 날짜 바뀌면 0페이지부터 로드
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const ymd = toYMD(selectedDate);

      setItems([]);
      setPage(0);
      setTotalPages(0);

      setLoadingList(true);
      try {
        const body = await archiveListRequest(ymd, 0, PAGE_SIZE);
        if (cancelled) return;

        if (body.code !== ResponseCode.SUCCESS || !body.data) {
          handleApiError(body);
          return;
        }

        setItems(sortByBookmarkFirst(body.data.content));
        setTotalPages(body.data.totalPages);
        setPage(body.data.number);
      } finally {
        if (!cancelled) setLoadingList(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [selectedDate]);

  const fetchPage = async (nextPage: number) => {
    const ymd = toYMD(selectedDate);

    setLoadingList(true);
    try {
      const body = await archiveListRequest(ymd, nextPage, PAGE_SIZE);

      if (body.code !== ResponseCode.SUCCESS || !body.data) {
        handleApiError(body);
        return;
      }

      setItems(sortByBookmarkFirst(body.data.content));
      setTotalPages(body.data.totalPages);
      setPage(body.data.number);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setLoadingList(false);
    }
  };

  // 북마크 정렬
  const sortByBookmarkFirst = (list: ArchiveResponseDTO[]) => {
    return [...list].sort((a, b) => {
      if (a.bookmarked === b.bookmarked) return 0;
      return a.bookmarked ? -1 : 1;
    });
  };

  return (
    <div className="Archive relative">
      <section className="px-4 pt-6 sm:pt-8 pb-2">
        <Calendar
          mode="single"
          buttonVariant="ghost"
          selected={selectedDate}
          onSelect={(date) => {
            if (!date) return;
            setSelectedDate(toStartOfDay(date));
          }}
          month={month}
          onMonthChange={(m) => setMonth(toStartOfDay(m))}
          modifiers={{ hasReading: readingDates }}
          disabled={{ after: today }}
          className="w-full max-w-xl mx-auto p-0"
        />

        <div className="w-full text-center mt-4">
          <Button
            variant="outline"
            onClick={() => {
              const d = toStartOfDay(new Date());
              setSelectedDate(d);
              setMonth(d);
            }}
            className="mx-auto"
          >
            오늘
          </Button>

          {loadingMonth && (
            <p className="mt-2 text-xs text-muted-foreground">
              달력 불러오는 중...
            </p>
          )}
        </div>
      </section>
      <section className="px-4 py-6">
        {loadingList ? (
          <div className="p-8 bg-muted rounded-3xl w-full text-center">
            <Spinner className="mx-auto mb-2 size-6" />
            <p className="text-muted-foreground text-center">
              목록 불러오는 중...
            </p>
          </div>
        ) : !items.length ? (
          <div className="p-8 bg-muted rounded-3xl w-full text-center">
            <ArchiveX className="mx-auto mb-2" />
            <p className="text-muted-foreground text-center">
              운세 결과가 없어요
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
            {items.map((it: ArchiveResponseDTO) => (
              <li
                key={it.uuid}
                className="border rounded-3xl p-6 cursor-pointer hover:bg-muted/40 transition"
                onClick={() => navigate(`/reading/result/${it.uuid}`)}
              >
                <div className="flex items-center gap-5">
                  <div className="w-11/12 content_wrap flex flex-col gap-3">
                    <ul className="badge_wrap inline-flex flex-wrap gap-2">
                      <li>
                        <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium border-transparent bg-violet-100 text-violet-500">
                          {it.categoryType
                            ? `${it.categoryType} / ${it.categoryName}`
                            : "오늘의 운세"}
                        </span>
                      </li>
                      <li>
                        <span className="inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium border-transparent bg-violet-100 text-violet-500">
                          {it.spreadType}
                        </span>
                      </li>
                      <li>
                        <Badge variant="secondary">
                          {toYMD(new Date(it.createdAt))}
                        </Badge>
                      </li>
                    </ul>
                    <div className="text_wrap">
                      <h5 className="text-lg font-semibold mb-2">
                        {it.resultTitle}
                      </h5>
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {it.resultSummary}
                      </p>
                    </div>
                    <div className="icon_wrap flex items-center gap-2">
                      <Heart
                        size="18"
                        className={
                          it.bookmarked
                            ? "fill-red-500 stroke-red-500"
                            : "current"
                        }
                      />
                      <MessageCircle
                        size="16"
                        className={
                          it.commented
                            ? "fill-violet-600 stroke-violet-600"
                            : "current"
                        }
                      />
                    </div>
                  </div>
                  <div className="w-2/12 img_wrap ">
                    <div className="rounded-xs overflow-hidden border">
                      <img src={getCardImg(it.cardId) ?? undefined} />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="px-4 pb-6 sm:pb-8">
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 0 && fetchPage(page - 1)}
                  className={page === 0 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i)
                .filter((p) => p >= page - 2 && p <= page + 2)
                .map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      isActive={p === page}
                      onClick={() => fetchPage(p)}
                    >
                      {p + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages - 1 && fetchPage(page + 1)}
                  className={
                    page >= totalPages - 1
                      ? "pointer-events-none opacity-50"
                      : ""
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </section>

      <Outlet />
    </div>
  );
}

export default Archive;
