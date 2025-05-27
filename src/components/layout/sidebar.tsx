import {
  Sidebar as ShadcnSidebar,
  SidebarContent as ShadcnSidebarContent,
  SidebarHeader as ShadcnSidebarHeader,
  SidebarMenu as ShadcnSidebarMenu,
  SidebarMenuButton as ShadcnSidebarMenuButton,
  SidebarMenuItem as ShadcnSidebarMenuItem,
} from "@/components/ui/sidebar.tsx"

import imageUrl from "@/assets/logo.png"
import type { Route } from "@/constants/routes.ts"
import type { LucideIcon } from "lucide-react"

export type SidebarMenuProps = {
  title: string
  icon: LucideIcon
  route: Route
  isActive?: boolean
}

export default function Sidebar({
  menuItems,
}: {
  menuItems: SidebarMenuProps[]
}) {
  return (
    <ShadcnSidebar className="w-[280px]">
      <ShadcnSidebarHeader className="h-[94px] items-center justify-center border-b-1">
        <img className="h-[42px] w-[120px]" src={imageUrl} alt="logo" />
      </ShadcnSidebarHeader>
      <ShadcnSidebarContent>
        <ShadcnSidebarMenu className="items-center">
          {menuItems.map(item => (
            <ShadcnSidebarMenuItem key={item.title} className="w-full px-3 pt-[15px] ">
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
  )
}
