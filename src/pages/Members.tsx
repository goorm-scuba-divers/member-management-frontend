import { DataTable } from "@/components/data-table"
import { columns } from "@/constants/columns"
import type { Member } from "@/models/Member"
import { fetchMockMembers } from "@/utils/mockData"
import { useEffect, useState } from "react"

export default function DemoPage() {
  const [data, setData] = useState<Member[]>([])

  useEffect(() => {
    fetchMockMembers().then(setData)
  }, [])

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
