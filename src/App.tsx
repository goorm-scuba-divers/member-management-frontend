import Home from "@/pages/Home"
import Members from "@/pages/Members"
import Settings from "@/pages/Settings"
import Signin from "@/pages/Signin"
import Signup from "@/pages/Signup"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "./App.css"
import { routes } from "@/constants/routes.ts"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.home} element={<Home />} />
          <Route path={routes.signup} element={<Signup />} />
          <Route path={routes.signin} element={<Signin />} />
          <Route path={routes.members} element={<Members />} />
          <Route path={routes.settings} element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
