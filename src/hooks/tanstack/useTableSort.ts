import type { OnChangeFn, SortingState } from "@tanstack/react-table"
import { useCallback, useMemo, useState } from "react"

const SORT_FIELD_MAP: Record<string, "CREATED_AT" | "MODIFIED_AT" | "USERNAME"> = {
  createdAt: "CREATED_AT",
  modifiedAt: "MODIFIED_AT",
  username: "USERNAME",
} as const

export function useTableSort() {
  const [sorting, setSorting] = useState<SortingState>([])

  const sortConfig = useMemo(() => {
    if (sorting.length === 0) return null
    const sortBy = SORT_FIELD_MAP[sorting[0].id] || "CREATED_AT"
    const sortDirection = sorting[0].desc ? "DESC" : "ASC"
    return { sortBy, sortDirection }
  }, [sorting])

  const handleSortingChange: OnChangeFn<SortingState> = useCallback(value => {
    setSorting(value)
  }, [])

  return {
    sorting,
    sortConfig,
    handleSortingChange,
  }
}
