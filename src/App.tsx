import { Toaster } from "@/components/shadcn-ui/sonner"
import { routes } from "@/constants/routes"
import { ToastProvider } from "@/context/ToastContext"
import { Forbidden, NotFound, Unauthorized } from "@/pages/ErrorPage"
import MembersPage from "@/pages/MembersPage"
import Settings from "@/pages/SettingsPage"
import SigninPage from "@/pages/SigninPage"
import SignupPage from "@/pages/SignupPage"
import { AdminRoute, AuthenticatedRoute, GuestRoute } from "@/routes/ProtectedRoutes"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={routes.signin} replace />} />

          <Route element={<GuestRoute />}>
            <Route path={routes.signup} element={<SignupPage />} />
            <Route path={routes.signin} element={<SigninPage />} />
          </Route>

          <Route element={<AuthenticatedRoute />}>
            <Route path={routes.settings} element={<Settings />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path={routes.members} element={<MembersPage />} />
          </Route>

          <Route path={routes.forbidden} element={<Forbidden />} />
          <Route path={routes.unauthorized} element={<Unauthorized />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ToastProvider>
  )
}

export default App
