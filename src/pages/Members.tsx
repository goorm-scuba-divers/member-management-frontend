import { DataTable } from "@/components/DataTable"
import SideBar, { type SideBarMenuItems } from "@/components/layout/SideBar"
import { columns } from "@/constants/columns"
import { routes } from "@/constants/routes"
import { useDataTable } from "@/hooks/data-table"
import { fetchMockMembers } from "@/utils/mockData"
import { SettingsIcon, UserIcon } from "lucide-react"

const menuItems: SideBarMenuItems[] = [
  {
    title: "settings",
    icon: SettingsIcon,
    route: routes.settings,
    isActive: false,
  },
  {
    title: "members",
    icon: UserIcon,
    route: routes.members,
    isActive: true,
  },
]

export default function Members() {
  const table = useDataTable({ columns, fetchFn: fetchMockMembers })

  return (
    <SideBar menuItems={menuItems}>
      <DataTable table={table} className="flex h-full w-full flex-col justify-center" />
    </SideBar>
  )
}
