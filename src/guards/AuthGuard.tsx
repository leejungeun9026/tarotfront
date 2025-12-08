import useAuthStore from "@/stores/useAuthStore";
import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
  roles?: string[];
}

const AuthGuard = ({ children, roles }: AuthGuardProps) => {
  const currentUser = useAuthStore((state) => state.user);

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