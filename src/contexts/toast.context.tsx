import { createContext, useContext, useMemo, type ReactNode } from "react"

import { toast } from "sonner"

export type ToastType = "success" | "error" | "warning" | "info" | "default"

export interface ToastOptions {
  description?: string
  closeButton?: boolean
  richColors?: boolean
  duration?: number
}

export interface ToastProps {
  message: string
  options?: ToastOptions
}

interface ToastContextType {
  toast: {
    success: (props: ToastProps) => void
    error: (props: ToastProps) => void
    warning: (props: ToastProps) => void
    info: (props: ToastProps) => void
    default: (props: ToastProps) => void
  }
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) throw new Error("useToast must be used within a ToastProvider")
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

const createToastFunction = (type: ToastType) => {
  return ({ message, options = {} }: ToastProps) => {
    if (type !== "default") {
      toast[type](message, { ...options, richColors: true })
      return
    }
    toast(message, { ...options, richColors: true })
  }
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const value: ToastContextType = useMemo(() => {
    return {
      toast: {
        success: createToastFunction("success"),
        error: createToastFunction("error"),
        warning: createToastFunction("warning"),
        info: createToastFunction("info"),
        default: createToastFunction("default"),
      },
    }
  }, [])

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}
