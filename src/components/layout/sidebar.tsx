import imageUrl from "@/assets/logo.png"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenu as ShadcnSidebarMenu,
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarFooter,
  SidebarProvider,
} from "@/components/shadcn-ui/sidebar"
import { FOOTER_HEIGHT_PX, HEADER_HEIGHT_PX, SIDEBAR_WIDTH_REM } from "@/constants/styles"
import { LogOut, type LucideIcon } from "lucide-react"
import type { Route } from "@/constants/routes"
import type { CSSProperties, ReactNode } from "react"

export type SideBarMenuItems = {
  title: string
  icon: LucideIcon
  route: Route
  isActive?: boolean
}

export default function SideBar({
  menuItems,
  children,
}: {
  menuItems: SideBarMenuItems[]
  children: ReactNode
}) {
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": `${SIDEBAR_WIDTH_REM}`,
          } as CSSProperties
        }
      >
        <ShadcnSidebar>
          <ShadcnSidebarHeader
            className={`min-h-[${HEADER_HEIGHT_PX}] items-center justify-center border-b-1`}
          >
            <img className="h-[42px] w-[120px]" src={imageUrl} alt="logo" />
          </ShadcnSidebarHeader>
          <ShadcnSidebarContent>
            <ShadcnSidebarMenu className="items-center">
              {menuItems.map(item => (
                <ShadcnSidebarMenuItem key={item.title} className="w-full px-3 pt-[15px]">
                  <ShadcnSidebarMenuButton asChild isActive={item.isActive}>
                    <a href={item.route}>
                      <item.icon className="mr-3" />
                      <span className="capitalize">{item.title}</span>
                    </a>
                  </ShadcnSidebarMenuButton>
                </ShadcnSidebarMenuItem>
              ))}
            </ShadcnSidebarMenu>
          </ShadcnSidebarContent>
          <SidebarFooter
            className={`min-h-[${FOOTER_HEIGHT_PX}] items-center justify-center border-t-1`}
          >
            <ShadcnSidebarMenu className="mb-5 items-center">
              <ShadcnSidebarMenuItem className="w-full px-3 pt-[15px]">
                <ShadcnSidebarMenuButton asChild isActive={false}>
                  <a href={"/signout"}>
                    <LogOut className="mr-3" />
                    <span className="capitalize">{"signout"}</span>
                  </a>
                </ShadcnSidebarMenuButton>
              </ShadcnSidebarMenuItem>
            </ShadcnSidebarMenu>
          </SidebarFooter>
        </ShadcnSidebar>
        <main className="flex flex-1 items-center justify-center px-15">{children}</main>
      </SidebarProvider>
    </>
  )
}
