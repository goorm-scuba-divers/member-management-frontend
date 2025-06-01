import { Button } from "@/components/shadcn-ui/button"
import { Separator } from "@/components/shadcn-ui/separator"
import type { ActionLink } from "@/constants/routes"
import type { ReactNode } from "react"
import { Link } from "react-router-dom"

interface SignFormFooter {
  description: string
  actionLink?: ActionLink
}

export interface SignFormProps {
  title: string
  description: string
  footer: SignFormFooter
  children?: ReactNode
}

export default function SignForm({ title, description, footer, children }: SignFormProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          <h1 className="font-bold text-2xl">{title}</h1>
          <p className="txt-sm text-balance text-muted-foreground">{description}</p>
        </div>

        <Separator className="my-8" />

        <div className="w-[410px]">
          <div className={"flex flex-col gap-6"}>
            <form>
              <div className="flex flex-col gap-6">
                {children}
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full cursor-pointer py-6"
                >
                  {title}
                </Button>
              </div>
            </form>

            <div className="mt-1 text-center text-muted-foreground text-sm capitalize">
              {footer.description}{" "}
              {footer.actionLink && (
                <Link
                  to={footer.actionLink.href}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  {footer.actionLink.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
