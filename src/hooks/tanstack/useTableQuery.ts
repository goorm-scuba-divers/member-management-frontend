import { useToast } from "@/contexts/toast.context"
import type { FindMemberRequest, MemberPageResponse } from "@/lib/schemas"
import { handleError } from "@/utils/errors"
import { useCallback, useEffect, useState } from "react"

interface DataTableError {
  message: string
  code?: string
}

interface ServerState<TData> {
  data: TData[]
  loading: boolean
  error: DataTableError | null
  totalRowCount: number
}

interface UseTableQueryProps {
  fetchFn: (params: Partial<FindMemberRequest>) => Promise<MemberPageResponse>
  params: Partial<FindMemberRequest>
}

export function useTableQuery<TData>({ fetchFn, params }: UseTableQueryProps) {
  const [serverState, setServerState] = useState<ServerState<TData>>({
    data: [],
    loading: false,
    error: null,
    totalRowCount: 0,
  })
  const { toast } = useToast()

  const fetchData = useCallback(async () => {
    setServerState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await fetchFn(params)

      setServerState({
        data: response.content as TData[],
        loading: false,
        error: null,
        totalRowCount: response.total,
      })
    } catch (error) {
      const message = handleError(error)
      toast.error({ message })

      setServerState(prev => ({
        ...prev,
        data: [],
        loading: false,
        error: { message },
      }))
    }
  }, [fetchFn, params, toast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return {
    ...serverState,
    refetch: fetchData,
  }
}
