import { Checkbox } from "@/components/shadcn-ui/checkbox"
import type { ColumnDef } from "@tanstack/react-table"

import { createTextColumn, createFilterableColumn, createSortableColumn } from "@/lib/table"
import { ROLES, type Member } from "@/lib/schemas"

const selectColumn: ColumnDef<Member> = {
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={value => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
} as const

export const columns: ColumnDef<Member>[] = [
  selectColumn,
  createTextColumn({ accessorKey: "id", header: "Id" }),
  createSortableColumn({ accessorKey: "userName", header: "Username" }),
  createTextColumn({ accessorKey: "nickName", header: "Nickname" }),
  createFilterableColumn({
    accessorKey: "role",
    header: "Role",
    options: ROLES,
  }),
  createSortableColumn({
    accessorKey: "createDate",
    header: "Create Date",
  }),
  createSortableColumn({
    accessorKey: "modifiedDate",
    header: "Modified Date",
  }),
] as const
