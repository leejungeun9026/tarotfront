import useAuthStore from "@/stores/useAuthStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";

interface AuthGuardProps {
  children: ReactNode;
  roles?: string[];
}

export default function AuthGuard({ children, roles }: AuthGuardProps) {
  const user = useAuthStore((s) => s.user);
  const bootstrapping = useAuthStore((s) => s.bootstrapping);

  // 깜빡임/튕김 방지: bootstrap 끝나기 전엔 대기
  if (bootstrapping) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) return <Navigate replace to="/login" />;

  if (roles && !roles.includes(user.role)) {
    return <Navigate replace to="/401" />;
  }

  return <>{children}</>;
}
