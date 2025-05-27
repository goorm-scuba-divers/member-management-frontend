import EditForm from "@/components/edit-form"
import Header from "@/components/layout/header"
import Sidebar, { type SidebarMenuItems } from "@/components/layout/sidebar.tsx"
import { routes } from "@/constants/routes.ts"
import { Settings as SettingsIcon } from "lucide-react"

const menuItems: SidebarMenuItems[] = [
  {
    title: "settings",
    icon: SettingsIcon,
    route: routes.settings,
    isActive: true,
  },
]

export default function Settings() {
  return (
    <Sidebar menuItems={menuItems}>
      <main className="flex w-full flex-col items-center lg:justify-center">
        <Header title={"Settings"} />
        <EditForm />
      </main>
    </Sidebar>
  )
}
