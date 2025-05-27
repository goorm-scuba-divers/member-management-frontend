import Sidebar, { type SidebarMenuProps } from "@/components/layout/sidebar.tsx"
import { SidebarProvider } from "@/components/ui/sidebar.tsx"
import { routes } from "@/constants/routes.ts"
import { Settings } from "lucide-react"

const menus: SidebarMenuProps[] = [
  {
    title: "settings",
    icon: Settings,
    route: routes.settings,
    isActive: true,
  },
]

export default () => {
  return (
    <SidebarProvider>
      <Sidebar menuItems={menus} />
    </SidebarProvider>
  )
}
