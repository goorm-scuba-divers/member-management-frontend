import { Button } from "@/components/shadcn-ui/button"
import type { CellContext, ColumnDef } from "@tanstack/react-table"
import { ArrowDownUp } from "lucide-react"
import type { ReactNode } from "react"

export const HeaderText = ({ children }: { children: ReactNode }) => (
  <span className="font-normal text-muted-foreground">{children}</span>
)

export const defaultColumn = <T,>({
  accessorKey,
  header,
}: { accessorKey: string; header: string }): ColumnDef<T> => {
  return { accessorKey, header: () => <HeaderText>{header}</HeaderText> }
}

type SortableColumnProps = {
  accessorKey: string
  header: string
  cell?: (context: CellContext<unknown, unknown>) => string
}

export const sortableColumn = ({
  accessorKey,
  header,
  cell,
}: SortableColumnProps): ColumnDef<unknown> => {
  return {
    accessorKey,
    header: ({ column }) => {
      return (
        <div className="flex items-center gap-[0.5px]">
          <HeaderText>{header}</HeaderText>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Sort by ${header}`}
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <ArrowDownUp className="h-[14px] w-[14px] text-muted-foreground" />
          </Button>
        </div>
      )
    },
    ...(cell && { cell }),
  }
}
