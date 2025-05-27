import Header from "@/components/layout/header"
import Sidebar, { type SidebarMenuProps } from "@/components/layout/sidebar.tsx"
import { SidebarProvider } from "@/components/shadcn-ui/sidebar"
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
    <>
      <div className="flex">
        <SidebarProvider className="w-auto">
          <Sidebar menuItems={menus} />
        </SidebarProvider>
        <div className="w-full mx-7.5">
          <Header title={"Settings"} />
        </div>
      </div>
    </>
  )
}
