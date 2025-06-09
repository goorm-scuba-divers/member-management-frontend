import { Toaster } from "@/components/shadcn-ui/sonner"
import { routes } from "@/constants/routes.constant"
import { ToastProvider } from "@/contexts/toast.context"
import { Forbidden, NotFound, Unauthorized } from "@/pages/error.page"
import MembersPage from "@/pages/members.page"
import Settings from "@/pages/settings.page"
import SigninPage from "@/pages/signin.page"
import SignupPage from "@/pages/signup.page"
import { AuthenticatedRoute, GuestRoute } from "@/routes/protected-routes.route"
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

          <Route element={<AuthenticatedRoute />}>
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
