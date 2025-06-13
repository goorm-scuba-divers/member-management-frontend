import { Button } from "@/components/shadcn-ui/button"
import { Checkbox } from "@/components/shadcn-ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn-ui/dropdown-menu"
import type { CellContext, ColumnDef } from "@tanstack/react-table"
import { ArrowDownUp, ChevronsUpDown } from "lucide-react"
import type { ReactNode } from "react"

type StringKeys<T> = Extract<keyof T, string>

const createDefaultCell = <TData, TValue>(accessorKey: string) => {
  return ({ row }: CellContext<TData, TValue>) => {
    const value = row.getValue<TValue>(accessorKey)
    if (value instanceof Date) return value.toISOString().slice(0, 10) // "YYYY-MM-DD"
    return String(value)
  }
}

export const HeaderText = ({ children }: { children: ReactNode }) => (
  <span className="font-normal text-muted-foreground">{children}</span>
)

interface BaseColumnProps<TData> {
  accessorKey: StringKeys<TData>
  header: string
}

export const createTextColumn = <TData,>({ accessorKey, header }: BaseColumnProps<TData>) => {
  return { accessorKey, header: () => <HeaderText>{header}</HeaderText> }
}

interface SortableColumnProps<TData, TValue> extends BaseColumnProps<TData> {
  cell?: (context: CellContext<TData, TValue | unknown>) => string
  sortable?: boolean
}

export const createSortableColumn = <TData, TValue>({
  accessorKey,
  header,
  cell,
  sortable = true,
}: SortableColumnProps<TData, TValue>): ColumnDef<TData> => {
  return {
    accessorKey: accessorKey,
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
    cell: cell || createDefaultCell<TData, TValue | unknown>(accessorKey),
    enableSorting: sortable,
  }
}

interface FilterableColumnProps<TData, TValue> extends BaseColumnProps<TData> {
  options: readonly TValue[]
  cell?: (context: CellContext<TData, TValue | unknown>) => string
}
export const createFilterableColumn = <TData, TValue extends string>({
  accessorKey,
  header,
  cell,
  options,
}: FilterableColumnProps<TData, TValue>): ColumnDef<TData> => {
  return {
    accessorKey,
    header: ({ column }) => {
      const selected = column.getFilterValue() as TValue[]

      return (
        <div className="flex items-center gap-[0.5px]">
          <HeaderText>{header}</HeaderText>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-6 w-6 p-0">
                <ChevronsUpDown className="h-[10px] w-[10px] text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="min-w-[6rem] p-1.5 text-sm">
              {options.map((option, index) => (
                <div key={option}>
                  <button
                    type="button"
                    onClick={() => {
                      column.setFilterValue(
                        selected?.includes(option)
                          ? (selected?.filter(r => r !== option) ?? [])
                          : [...(selected ?? []), option]
                      )
                    }}
                    className="flex w-full cursor-pointer items-center gap-2 px-2 py-1.5 text-left"
                  >
                    <Checkbox className="size-3" checked={selected?.includes(option)} />
                    <span className="text-muted-foreground text-xs">{option}</span>
                  </button>
                  {index < options.length - 1 && (
                    <DropdownMenuSeparator className="my-1 h-[0.5px] bg-muted" />
                  )}
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
    cell: cell || createDefaultCell<TData, TValue | unknown>(accessorKey),
  }
}
