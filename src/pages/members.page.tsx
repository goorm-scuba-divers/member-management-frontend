import DataTable from "@/components/data-table.component"
import { columns } from "@/constants/columns.constant"
import SideBar from "@/layouts/side-bar.layout"
import { memberService } from "@/services"
import { useEffect } from "react"

export default function MembersPage() {
  useEffect(() => {
    const handleFetchMembers = async () => {
      const members = await memberService.findMembers({})
      console.log(members)
    }

    handleFetchMembers()
  }, [])

  return (
    <SideBar>
      <DataTable
        columns={columns}
        fetchFn={async () => {
          const result = await memberService.findMembers({})
          return result.content
        }}
        className="flex h-full w-full flex-col justify-center"
      />
    </SideBar>
  )
}
