import { routes } from "@/constants/routes"
import { useAuthStore } from "@/stores/authStore"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export function GuestRoute() {
  const { isAuthenticated } = useAuthStore()

  // 이미 로그인한 사용자가 로그인/회원가입 페이지에 접근 시
  // → settings 페이지로 리다이렉트 (replace: 히스토리에서 현재 페이지 제거)
  if (isAuthenticated) return <Navigate to={routes.settings} replace />

  return <Outlet />
}

export function AuthenticatedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  // 비로그인 사용자가 보호된 페이지 접근 시
  // → 로그인 페이지로 리다이렉트 (state: 로그인 후 원래 페이지로 복귀용, replace: 무한 루프 방지)
  if (!isAuthenticated) return <Navigate to={routes.signin} state={{ from: location }} replace />

  return <Outlet />
}

export function AdminRoute() {
  const { isAuthenticated, role } = useAuthStore()
  const location = useLocation()

  // 비로그인 사용자가 관리자 페이지 접근 시
  // → 로그인 페이지로 리다이렉트 (state: 로그인 후 원래 페이지로 복귀용, replace: 무한 루프 방지)
  if (!isAuthenticated) return <Navigate to={routes.signin} state={{ from: location }} replace />
  
  // 로그인했지만 관리자가 아닌 사용자가 관리자 페이지 접근 시
  // → 403 Forbidden 페이지로 리다이렉트 (replace: 에러 페이지를 히스토리에서 제거)
  if (role !== "ADMIN") return <Navigate to={routes.forbidden} replace />

  return <Outlet />
}
