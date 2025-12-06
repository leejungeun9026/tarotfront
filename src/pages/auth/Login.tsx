import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link, useNavigate } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="Login">
      <div className="inner px-4 py-6 md:py-10">
        <div className="max-w-80 mx-auto">
          <section>
            <div className="grid w-full items-center gap-3 mb-4">
              <Label htmlFor="username">이메일 주소</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="example@xxx.com"
              />
            </div>
            <div className="grid w-full items-center gap-3 mb-8">
              <Label htmlFor="password">비밀번호</Label>
              <Input
                type="password"
                name="password"
                className="tracking-widest placeholder:tracking-normal"
                id="password"
                placeholder="비밀번호를 입력해주세요"
              />
            </div>
            <div className="flex flex-col gap-3">
              <Button size="xl" className="w-full cursor-pointer">
                로그인
              </Button>
              <Button
                onClick={() => navigate("/join")}
                variant="outline"
                size="xl"
                className="w-full cursor-pointer"
              >
                회원가입
              </Button>
              <div className="mt-2 flex justify-center items-center h-5 space-x-6 text-sm">
                <Link to="/" className="text-neutral-500">
                  아이디 찾기
                </Link>
                <Separator orientation="vertical" />
                <Link to="/" className="text-neutral-500">
                  비밀번호 찾기
                </Link>
              </div>
            </div>
          </section>
          <div className="flex justify-between items-center gap-2 max-w-80 my-10">
            <Separator className="" />
            <p className="text-sm text-neutral-400 text-nowrap">
              다른 방법으로 로그인
            </p>
            <Separator className="" />
          </div>

          <section className=""></section>
        </div>
      </div>
    </div>
  );
}

export default Login;
