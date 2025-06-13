import type { FindMemberRequest, MemberPageResponse } from "@/lib/schemas"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { useCallback, useEffect, useMemo, useState } from "react"

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE_INDEX = 0

interface DataTableError {
  message: string
  code?: string
}

interface ServerSideDataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  fetchFn: (params: Partial<FindMemberRequest>) => Promise<MemberPageResponse>
}

interface ServerState<TData> {
  data: TData[]
  loading: boolean
  error: DataTableError | null
  totalRowCount: number
}

const SORT_FIELD_MAP: Record<string, "CREATED_AT" | "MODIFIED_AT" | "USERNAME"> = {
  createdAt: "CREATED_AT",
  modifiedAt: "MODIFIED_AT",
  username: "USERNAME",
} as const

export function useDataTable<TData, TValue>({
  columns,
  fetchFn,
}: ServerSideDataTableProps<TData, TValue>) {
  const [serverState, setServerState] = useState<ServerState<TData>>({
    data: [],
    loading: false,
    error: null,
    totalRowCount: 0,
  })
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  })
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = useState({})

  const roleFilter = useMemo(() => {
    const filter = columnFilters.find(f => f.id === "role")
    return filter?.value && Array.isArray(filter.value) ? filter.value : []
  }, [columnFilters])

  const sortConfig = useMemo(() => {
    if (sorting.length === 0) return null
    const sortBy = SORT_FIELD_MAP[sorting[0].id] || "CREATED_AT"
    const sortDirection = sorting[0].desc ? "DESC" : "ASC"
    return { sortBy, sortDirection }
  }, [sorting])

  const createServerParams = useCallback((): Partial<FindMemberRequest> => {
    return {
      page: pagination.pageIndex,
      size: pagination.pageSize,
      searchValue: globalFilter.trim() !== "" ? globalFilter : undefined,
      role: roleFilter.length > 0 ? roleFilter[0] : undefined,
      sortBy: sortConfig?.sortBy,
      sortDirection: sortConfig?.sortDirection as "ASC" | "DESC" | undefined,
    }
  }, [pagination, globalFilter, roleFilter, sortConfig])

  const resetToFirstPage = useCallback(() => {
    if (pagination.pageIndex === DEFAULT_PAGE_INDEX) return
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
  }, [pagination.pageIndex])

  const clearError = useCallback(() => {
    setServerState(prev => ({ ...prev, error: null }))
  }, [])

  const fetchData = useCallback(async () => {
    setServerState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const params = createServerParams()
      const response = await fetchFn(params)

      setServerState({
        data: response.content as TData[],
        loading: false,
        error: null,
        totalRowCount: response.total,
      })
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to fetch data"

      setServerState(prev => ({
        ...prev,
        data: [],
        loading: false,
        error: { message: errorMessage },
      }))

      console.error("Data fetch error:", error)
    }
  }, [createServerParams, fetchFn])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const pageCount = useMemo(() => {
    return Math.ceil(serverState.totalRowCount / pagination.pageSize)
  }, [serverState.totalRowCount, pagination.pageSize])

  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(value => {
    setPagination(value)
  }, [])

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(value => {
    setSorting(value)
  }, [])

  const handleGlobalFilterChange = useCallback(
    (value: string) => {
      setGlobalFilter(value)
      resetToFirstPage()
    },
    [resetToFirstPage]
  )

  const handleColumnFiltersChange: OnChangeFn<ColumnFiltersState> = useCallback(
    value => {
      setColumnFilters(value)
      resetToFirstPage()
    },
    [resetToFirstPage]
  )

  const handleRowSelectionChange: OnChangeFn<RowSelectionState> = useCallback(value => {
    setRowSelection(value)
  }, [])

  const table = useReactTable({
    data: serverState.data,
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
    rowCount: serverState.totalRowCount,
    getCoreRowModel: getCoreRowModel(),
  })

  const refetch = useCallback(() => {
    fetchData()
  }, [fetchData])

  return {
    table,
    loading: serverState.loading,
    error: serverState.error,
    totalRowCount: serverState.totalRowCount,
    refetch,
    clearError,
    resetToFirstPage,
  }
}
