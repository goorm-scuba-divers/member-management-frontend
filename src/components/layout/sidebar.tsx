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
import { LogOut, SettingsIcon, UserIcon } from "lucide-react"
import { routes } from "@/constants/routes"
import type { CSSProperties, ReactNode } from "react"
import { useAuthStore } from "@/stores/authStore"
import { Link } from "react-router-dom"

export default function SideBar({
  children,
}: {
  children: ReactNode
}) {
  const { role, signout } = useAuthStore()

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
              <ShadcnSidebarMenuItem className="flex w-full flex-col gap-5 p-4">
                <ShadcnSidebarMenuButton asChild isActive={false}>
                  <Link to={routes.settings}>
                    <SettingsIcon className="mr-3" />
                    <span className="capitalize">settings</span>
                  </Link>
                </ShadcnSidebarMenuButton>

                {role === "ADMIN" && (
                  <ShadcnSidebarMenuButton asChild isActive={false}>
                    <Link to={routes.members}>
                      <UserIcon className="mr-3" />
                      <span className="capitalize">members</span>
                    </Link>
                  </ShadcnSidebarMenuButton>
                )}
              </ShadcnSidebarMenuItem>
            </ShadcnSidebarMenu>
          </ShadcnSidebarContent>
          <SidebarFooter
            className={`min-h-[${FOOTER_HEIGHT_PX}] items-center justify-center border-t-1`}
          >
            <ShadcnSidebarMenu className="mb-5 items-center">
              <ShadcnSidebarMenuItem className="w-full p-4">
                <ShadcnSidebarMenuButton
                  isActive={false}
                  onClick={signout}
                  className="cursor-pointer"
                >
                  <LogOut className="mr-3" />
                  <span className="capitalize">signout</span>
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
