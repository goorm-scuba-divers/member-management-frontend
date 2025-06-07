import { DataTable } from "@/components/DataTable"
import SideBar from "@/components/layout/SideBar"
import { columns } from "@/constants/columns"
import { fetchMockMembers } from "@/utils/mockUtils"

export default function Members() {
  return (
    <SideBar>
      <DataTable
        columns={columns}
        fetchFn={fetchMockMembers}
        className="flex h-full w-full flex-col justify-center"
      />
    </SideBar>
  )
}
