import EditForm from "@/components/EditForm"
import SideBar, { type SideBarMenuItems } from "@/components/layout/SideBar"
import { routes } from "@/constants/routes"
import { Settings as SettingsIcon, UserIcon } from "lucide-react"

const menuItems: SideBarMenuItems[] = [
  {
    title: "settings",
    icon: SettingsIcon,
    route: routes.settings,
    isActive: true,
  },
  {
    title: "members",
    icon: UserIcon,
    route: routes.members,
    isActive: false,
  },
]

export default function Settings() {
  return (
    <SideBar menuItems={menuItems}>
      <EditForm className="flex h-full w-4/6 flex-col justify-center" />
    </SideBar>
  )
}
