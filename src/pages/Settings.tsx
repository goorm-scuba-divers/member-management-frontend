import EditForm from "@/components/edit-form"
import Header from "@/components/layout/header"
import Sidebar, { type SidebarMenuItems } from "@/components/layout/sidebar.tsx"
import { routes } from "@/constants/routes.ts"
import { Settings } from "lucide-react"

const menuItems: SidebarMenuItems[] = [
  {
    title: "settings",
    icon: Settings,
    route: routes.settings,
    isActive: true,
  },
]

export default () => {
  return (
    <Sidebar menuItems={menuItems}>
      <Header title={"Settings"} />
      <EditForm />
    </Sidebar>
  )
}
