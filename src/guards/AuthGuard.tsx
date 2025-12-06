import { Navigate } from "react-router-dom";
import useUserStore from "@/stores/useUserStore";
import type { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  roles?: string[];
}

const AuthGuard = ({ children, roles }: AuthGuardProps) => {
  const currentUser = useUserStore((state) => state.user);
  const authorize = () => {
    if (!currentUser) {
      return <Navigate replace to="/login" />
    }
    if (roles && !roles.includes(currentUser.role)) {
      return <Navigate replace to="/401" />
    }
    return children;
  }
  return authorize();
}

export default AuthGuard;