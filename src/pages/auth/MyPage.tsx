// src/pages/user/MyPage.tsx
import useAuthStore from "@/stores/useAuthStore";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import appIcon from "../../assets/app-icon.png";

import { Bookmark, BookOpen, ChevronRight, Heart, Mail } from "lucide-react";

export default function MyPage() {
  const navigate = useNavigate();
  const { user, forceLogout } = useAuthStore();

  const providerLabel = useMemo(() => {
    const p = (user as sting)?.provider?.toLowerCase?.();
    if (!p) return "LOCAL";
    if (p === "kakao") return "KAKAO";
    if (p === "naver") return "NAVER";
    return p.toUpperCase();
  }, [user]);

  if (!user) return null;

  return (
    <div className="MyPage">
      <section className="px-4 py-6 sm:py-8 space-y-6">
        <Card className="rounded-3xl">
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="size-16 rounded-3xl border border-violet-100 bg-violet-50 flex items-center justify-center">
                <img src={appIcon} className="w-10 h-10" />
              </div>
              <div className="grow">
                <div className="text-2xl ff_kyobo leading-tight">
                  {user.name}
                </div>
                <div className="flex items-center gap-2 mt-1 text-base text-muted-foreground min-w-0">
                  <Mail className="size-4 shrink-0" />
                  <span className="truncate">{user.username}</span>
                  {providerLabel === "KAKAO" && (
                    <Badge
                      variant="outline"
                      className="rounded-full bg-yellow-400 border-0"
                    >
                      {providerLabel}
                    </Badge>
                  )}
                  {providerLabel === "NAVER" && (
                    <Badge
                      variant="outline"
                      className="rounded-full bg-green-500 border-0"
                    >
                      {providerLabel}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl gap-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-base ">회원 메뉴</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <QuickTile
                title="보관함"
                desc="내가 본 운세 모아보기"
                icon={<BookOpen className="size-5" />}
                onClick={() => navigate("/archive")}
              />
              <QuickTile
                title="북마크"
                desc="찜한 리딩만 보기"
                icon={<Bookmark className="size-5" />}
                onClick={() => navigate("/archive?filter=bookmarked")}
              />
              <QuickTile
                title="좋아요"
                desc="하트한 기록 모아보기"
                icon={<Heart className="size-5" />}
                onClick={() => navigate("/archive?filter=liked")}
              />
              <QuickTile
                title="가이드"
                desc="타로 정보 보러가기"
                icon={<ChevronRight className="size-5" />}
                onClick={() => navigate("/guide")}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-3xl gap-0 pb-4">
          <CardHeader className="pb-2">
            <CardTitle className="text-base ">계정설정</CardTitle>
          </CardHeader>
          <CardContent className="px-5 space-y-2">
            <MenuRow
              title="프로필 설정"
              desc="이름/닉네임 등"
              onClick={() => navigate("/mypage/profile")}
            />
            <Separator />
            <MenuRow
              title="이용약관"
              desc="약관/개인정보 처리방침"
              onClick={() => navigate("/guide/term")}
            />
          </CardContent>
        </Card>
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-neutral-500"
            onClick={() => {
              forceLogout("");
              navigate("/login", { replace: true });
            }}
          >
            로그아웃
          </Button>
        </div>
      </section>
    </div>
  );
}

function QuickTile({
  title,
  desc,
  icon,
  onClick,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-2xl border bg-card hover:bg-muted/40 transition-colors p-4 flex items-start gap-3 cursor-pointer"
      type="button"
    >
      <div className="mt-0.5 size-10 rounded-2xl bg-muted flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="font-medium leading-tight">{title}</div>
        <div className="text-sm text-muted-foreground mt-1 truncate">
          {desc}
        </div>
      </div>
    </button>
  );
}

function MenuRow({
  title,
  desc,
  onClick,
}: {
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="w-full py-2 px-2 flex items-center justify-between gap-3 hover:bg-muted/40 transition-colors rounded-lg cursor-pointer"
    >
      <div className="text-left">
        <div className="font-medium leading-tight">{title}</div>
        <div className="text-sm text-muted-foreground mt-1">{desc}</div>
      </div>
      <ChevronRight className="size-5 text-muted-foreground shrink-0" />
    </button>
  );
}
