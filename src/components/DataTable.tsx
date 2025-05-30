import SearchBar from "@/components/layout/SearchBar"
import { Button } from "@/components/shadcn-ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/shadcn-ui/table"
import type { useDataTable } from "@/hooks/data-table"
import { cn } from "@/lib/utils"
import { flexRender } from "@tanstack/react-table"

interface DataTableProps<TData, TValue> {
  table: ReturnType<typeof useDataTable<TData, TValue>>
  className?: string
}

export function DataTable<TData, TValue>({ table, className }: DataTableProps<TData, TValue>) {
  return (
    <div className={cn(className)}>
      <div className="mb-5 flex items-center justify-end">
        <SearchBar
          placeholder="Search id or username..."
          value={(table.getColumn("userName")?.getFilterValue() as string) ?? ""}
          onChange={event => table.getColumn("userName")?.setFilterValue(event.target.value)}
        />
      </div>

      <div className="mb-5 rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id} className="h-[50px]">
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="h-[65px]"
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getAllColumns().length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
