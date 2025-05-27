import imageUrl from "@/assets/logo.png"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenu as ShadcnSidebarMenu,
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
  SidebarProvider,
} from "@/components/shadcn-ui/sidebar"
import type { Route } from "@/constants/routes"
import type { LucideIcon } from "lucide-react"
import * as React from "react"

export type SidebarMenuItems = {
  title: string
  icon: LucideIcon
  route: Route
  isActive?: boolean
}

export default function Sidebar({
  menuItems,
  children,
}: {
  menuItems: SidebarMenuItems[]
  children: React.ReactNode
}) {
  return (
    <>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "23rem",
          } as React.CSSProperties
        }
      >
        <ShadcnSidebar>
          <ShadcnSidebarHeader className="items-center justify-center h-[94px] border-b-1">
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
        </ShadcnSidebar>
        <main className="flex w-full flex-col items-center">{children}</main>
      </SidebarProvider>
    </>
  )
}
