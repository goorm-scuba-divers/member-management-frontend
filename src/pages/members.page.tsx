import DataTable from "@/components/data-table.component"
import { columns } from "@/constants/columns.constant"
import SideBar from "@/layouts/side-bar.layout"
import { memberService } from "@/services"

export default function MembersPage() {
  return (
    <SideBar>
      <DataTable
        columns={columns}
        fetchFn={memberService.findMembers}
        className="flex h-full w-full flex-col justify-center"
      />
    </SideBar>
  )
}
