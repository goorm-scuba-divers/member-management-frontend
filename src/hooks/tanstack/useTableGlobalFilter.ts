import { useState } from "react"
import { useDebounce } from "../useDebounce.ts"

export function useTableGlobalFilter(delay = 350) {
  const [globalFilter, setGlobalFilter] = useState("")
  const debouncedGlobalFilter = useDebounce(globalFilter, delay)

  return {
    globalFilter,
    setGlobalFilter,
    debouncedGlobalFilter,
  }
}
