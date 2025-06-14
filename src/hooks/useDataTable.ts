import type { FindMemberRequest, MemberPageResponse, Role } from "@/lib/schemas"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type RowSelectionState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useCallback, useMemo, useState } from "react"
import { useTableFilter } from "./useTableFilter.ts"
import { useTableGlobalFilter } from "./useTableGlobalFilter.ts"
import { useTablePagination } from "./useTablePagination.ts"
import { useTableQuery } from "./useTableQuery.ts"
import { useTableSort } from "./useTableSort.ts"

interface ServerSideDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  fetchFn: (params: Partial<FindMemberRequest>) => Promise<MemberPageResponse>
}

export function useDataTable<TData, TValue>({
  columns,
  fetchFn,
}: ServerSideDataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})

  const { sorting, sortConfig, handleSortingChange } = useTableSort()
  const { pagination, resetToFirstPage, handlePaginationChange } = useTablePagination()
  const { columnFilter, columnFilters, setColumnFilters } = useTableFilter()
  const { globalFilter, setGlobalFilter, debouncedGlobalFilter } = useTableGlobalFilter(350)

  const params = useMemo(
    (): Partial<FindMemberRequest> => ({
      page: pagination.pageIndex,
      size: pagination.pageSize,
      searchValue: debouncedGlobalFilter.trim() !== "" ? debouncedGlobalFilter : undefined,
      role: columnFilter<Role>("role"),
      sortBy: sortConfig?.sortBy,
      sortDirection: sortConfig?.sortDirection as "ASC" | "DESC" | undefined,
    }),
    [pagination, columnFilter, debouncedGlobalFilter, sortConfig]
  )

  const { data, loading, error, totalRowCount } = useTableQuery<TData>({
    fetchFn,
    params,
  })

  const pageCount = Math.ceil(totalRowCount / pagination.pageSize)

  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      setGlobalFilter(value)
      resetToFirstPage()
    },
    [setGlobalFilter, resetToFirstPage]
  )

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    value => {
      setColumnFilters(value)
      resetToFirstPage()
    },
    [setColumnFilters, resetToFirstPage]
  )

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(value => {
    setRowSelection(value)
  }, [])

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
      globalFilter,
      columnFilters,
      rowSelection,
    },
    onPaginationChange: handlePaginationChange,
    onSortingChange: handleSortingChange,
    onGlobalFilterChange: handleGlobalFilterChange,
    onColumnFiltersChange: handleColumnFiltersChange,
    onRowSelectionChange: handleRowSelectionChange,
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    pageCount,
    rowCount: totalRowCount,
    getCoreRowModel: getCoreRowModel(),
  })

  return {
    table,
    loading,
    error,
    totalRowCount,
  }
}
