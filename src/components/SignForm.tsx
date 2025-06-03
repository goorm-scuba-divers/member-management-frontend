import { Button } from "@/components/shadcn-ui/button"
import { Form } from "@/components/shadcn-ui/form"
import { Separator } from "@/components/shadcn-ui/separator"
import { Toaster } from "@/components/shadcn-ui/sonner"
import type { FormEvent, ReactNode } from "react"
import type { UseFormReturn, FieldValues } from "react-hook-form"
import { Link } from "react-router-dom"
interface SignFormHeaderProps {
  title: string
  description: string
}

interface SignFormFooterProps {
  description: string
  actionLink?: {
    text: string
    href: string
  }
}

interface SignFormProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit?: (e: FormEvent) => void
  header: SignFormHeaderProps
  footer: SignFormFooterProps
  children?: ReactNode
}

export default function SignForm<T extends FieldValues>({
  form,
  onSubmit,
  header,
  footer,
  children,
}: SignFormProps<T>) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {/* TOASTER */}
      <Toaster />

      <div className="flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col gap-6">
          <h1 className="font-bold text-2xl">{header.title}</h1>
          <p className="txt-sm text-balance text-muted-foreground">{header.description}</p>
        </div>

        {/* SEPARATOR */}
        <Separator />

        {/* CONTENT */}
        <Form {...form}>
          <form onSubmit={onSubmit}>
            <div className="flex w-[410px] flex-col gap-6">
              {children}
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="w-full cursor-pointer py-6"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Submitting..." : header.title}
              </Button>
            </div>
          </form>
        </Form>

        {/* FOOTER */}
        <div className="text-center text-muted-foreground text-xs">
          {footer.description}{" "}
          {footer.actionLink && (
            <Link to={footer.actionLink.href} className="text-primary underline-offset-4 hover:underline">
              {footer.actionLink.text}
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
