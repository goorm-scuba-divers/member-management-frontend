import type { ColumnFiltersState } from "@tanstack/react-table"
import { useCallback, useState } from "react"

export function useTableFilter() {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const getSingleFilterValue = useCallback(
    <T = unknown>(filterId: string): T | undefined => {
      const filter = columnFilters.find(f => f.id === filterId)
      const values = filter?.value as T[]
      
      // !FIXME: Role 추가 시 서버 및 클라이언트 필터링 로직 수정 필요
      if (values?.length === 1) return values[0]

      return undefined
    },
    [columnFilters]
  )

  return {
    columnFilter: getSingleFilterValue,
    columnFilters,
    setColumnFilters,
  }
}
