import { useEffect } from "react"
import { useToast } from "@/context/ToastContext"
import type { FieldErrors, FieldValues } from "react-hook-form"

export function useFormErrorToast<T extends FieldValues>(errors: FieldErrors<T>) {
  const { toast } = useToast()

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors)
        .map(error => error?.message)
        .filter((message): message is string => Boolean(message))

      if (errorMessages.length > 0) {
        toast.error({
          message: errorMessages[0],
          options: { duration: 3000 },
        })
      }
    }
  }, [errors, toast])

  return { toast }
}
