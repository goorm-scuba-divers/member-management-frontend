import type { HTMLInputTypeAttribute } from "react"

type Link = {
  href: string
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
