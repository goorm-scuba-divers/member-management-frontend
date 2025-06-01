import { Input } from "@/components/shadcn-ui/input"
import type { ActionLink } from "@/constants/routes"
import { Label } from "@radix-ui/react-label"
import type { ChangeEvent, HTMLInputTypeAttribute } from "react"

interface FormFieldProps {
  label: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  required?: boolean
  helperText?: string
  actionLink?: ActionLink
  value?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function FormField({
  label,
  type = "text",
  placeholder,
  required = true,
  helperText,
  actionLink,
  value = "",
  onChange,
}: FormFieldProps) {
  return (
    <div className="grid gap-2">
      <div className="flex justify-between">
        <Label htmlFor={label} className="capitalize">
          {label}
        </Label>
        {actionLink && (
          <a
            href={actionLink.href}
            className="text-muted-foreground text-xs underline-offset-4 hover:underline"
          >
            {actionLink.text}
          </a>
        )}
      </div>
      {helperText && <p className="text-muted-foreground text-xs">{helperText}</p>}
      <Input
        id={label}
        type={type}
        placeholder={placeholder}
        className="py-6"
        required={required}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}
