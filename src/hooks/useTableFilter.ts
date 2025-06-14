import type { ColumnFiltersState } from "@tanstack/react-table"
import { useCallback, useState } from "react"

export function useTableFilter() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const getSingleFilterValue = useCallback(
    <T = unknown>(filterId: string): T | undefined => {
      const filter = columnFilters.find(f => f.id === filterId)
      const values = filter?.value
      if (Array.isArray(values)) {
        return values.length > 0 ? values[0] : undefined
      }
      return values as T | undefined
    },
    [columnFilters]
  )

  return {
    columnFilter: getSingleFilterValue,
    columnFilters,
    setColumnFilters,
  }
}
