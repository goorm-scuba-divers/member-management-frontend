import type { OnChangeFn, PaginationState } from "@tanstack/react-table"
import { useCallback, useState } from "react"

const DEFAULT_PAGE_SIZE = 10
const DEFAULT_PAGE_INDEX = 0

export function useTablePagination() {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: DEFAULT_PAGE_SIZE,
  })

  const resetToFirstPage = useCallback(() => {
    if (pagination.pageIndex === DEFAULT_PAGE_INDEX) return
    setPagination(prev => ({ ...prev, pageIndex: DEFAULT_PAGE_INDEX }))
  }, [pagination.pageIndex])

  const handlePaginationChange: OnChangeFn<PaginationState> = useCallback(value => {
    setPagination(value)
  }, [])

  return {
    pagination,
    resetToFirstPage,
    handlePaginationChange,
  }
}
