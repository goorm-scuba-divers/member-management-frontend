import { routes } from "@/constants/routes.constant"
import { useAuthStore } from "@/store/auth.store"
import { Navigate, Outlet, useLocation } from "react-router-dom"

export function GuestRoute() {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to={routes.settings} replace />
  }

  return <Outlet />
}

export function AuthenticatedRoute() {
  const { isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={routes.signin} state={{ from: location }} replace />
  }

  return <Outlet />
}

export function AdminRoute() {
  const { isAuthenticated, role } = useAuthStore()
  const location = useLocation()

  if (!isAuthenticated) {
    return <Navigate to={routes.signin} state={{ from: location }} replace />
  }

  if (role !== "ADMIN") {
    return <Navigate to={routes.forbidden} replace />
  }

  return <Outlet />
}
