import { Checkbox } from "@/components/shadcn-ui/checkbox"
import type { ColumnDef } from "@tanstack/react-table"

import { type Member, ROLES } from "@/lib/schemas"
import { createFilterableColumn, createSortableColumn, createTextColumn } from "@/lib/table-columns"

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
  createSortableColumn({ accessorKey: "username", header: "Username" }),
  createTextColumn({ accessorKey: "nickname", header: "Nickname" }),
  createFilterableColumn({
    accessorKey: "role",
    header: "Role",
    options: ROLES,
  }),
  createSortableColumn({
    accessorKey: "createdAt",
    header: "Create Date",
  }),
  createSortableColumn({
    accessorKey: "modifiedAt",
    header: "Modified Date",
  }),
] as const
