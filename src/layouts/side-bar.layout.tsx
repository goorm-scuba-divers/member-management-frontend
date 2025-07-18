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
import { routes } from "@/constants/routes.constant"
import { SIDEBAR_SECTION_MIN_HEIGHT_PX, SIDEBAR_WIDTH_REM } from "@/constants/styles.constant"
import { useToast } from "@/contexts/toast.context"
import { authService } from "@/services/auth.service"
import { useAuthStore } from "@/store/auth.store"
import { handleError } from "@/utils/errors"
import { LogOut, SettingsIcon, UserIcon } from "lucide-react"
import type { CSSProperties, ReactNode } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function SideBar({
  children,
}: {
  children: ReactNode
}) {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { role, signout } = useAuthStore()

  const handleSignout = async () => {
    try {
      await authService.signout()
      signout()
      navigate(routes.signin, { replace: true })
    } catch (error) {
      const message = handleError(error)
      toast.error({ message })
    }
  }

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
            className={`${SIDEBAR_SECTION_MIN_HEIGHT_PX} items-center justify-center border-b-1`}
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
            className={`${SIDEBAR_SECTION_MIN_HEIGHT_PX} items-center justify-center border-t-1`}
          >
            <ShadcnSidebarMenu className="items-center">
              <ShadcnSidebarMenuItem className="w-full p-4">
                <ShadcnSidebarMenuButton
                  isActive={false}
                  onClick={handleSignout}
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
