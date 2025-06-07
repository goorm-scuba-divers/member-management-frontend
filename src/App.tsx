import Members from "@/pages/Members"
import Settings from "@/pages/Settings"
import Signin from "@/pages/Signin"
import Signup from "@/pages/Signup"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import "./App.css"
import { Toaster } from "@/components/shadcn-ui/sonner"
import { routes } from "@/constants/routes"
import { ToastProvider } from "@/context/ToastContext"
import { Forbidden, NotFound, Unauthorized } from "@/pages/ErrorPage"
import { AdminRoute, AuthenticatedRoute, GuestRoute } from "@/routes/ProtectedRoutes"

function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={routes.signin} replace />} />

          <Route element={<GuestRoute />}>
            <Route path={routes.signup} element={<Signup />} />
            <Route path={routes.signin} element={<Signin />} />
          </Route>

          <Route element={<AuthenticatedRoute />}>
            <Route path={routes.settings} element={<Settings />} />
          </Route>

          <Route element={<AdminRoute />}>
            <Route path={routes.members} element={<Members />} />
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
