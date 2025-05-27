import type { Route } from "@/constants/routes.ts"
import type { HTMLInputTypeAttribute } from "react"

type Link = {
  route: Route
  text: string
}

type SignFormFooter = {
  description: string
  actionLink?: Link
}

type SignFormField = {
  label: string
  helperText?: string
  type: HTMLInputTypeAttribute
  placeholder: string
  required?: boolean
  subLink?: Link
}

export type SignFormProps = {
  title: string
  description: string
  fields: SignFormField[]
  footer: SignFormFooter
}
