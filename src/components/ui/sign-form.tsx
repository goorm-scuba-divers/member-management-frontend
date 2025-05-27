import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import type { SignFormProps } from "@/types/sign.ts"

export default function SignForm({ title, description, fields, footer }: SignFormProps) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-balance txt-sm text-muted-foreground">{description}</p>
        </div>

        <Separator className="my-8" />

        <div className="w-[410px]">
          <div className={cn("flex flex-col gap-6")}>
            <form>
              <div className="flex flex-col gap-6">
                {fields.map(field => (
                  <div key={field.label} className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor={field.label} className="capitalize">
                        {field.label}
                      </Label>
                      {field.subLink && (
                        <a
                          href={field.subLink.route}
                          className="text-xs text-muted-foreground underline-offset-4 hover:underline"
                        >
                          {field.subLink.text}
                        </a>
                      )}
                    </div>
                    {field.helperText && (
                      <p className="text-xs text-muted-foreground">{field.helperText}</p>
                    )}
                    <Input
                      id={field.label}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="py-6"
                      required={field.required}
                    />
                  </div>
                ))}
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

            {/* footer section */}
            <div className="mt-1 text-center text-sm text-muted-foreground capitalize">
              {footer.description}{" "}
              {footer.actionLink && (
                <a href={footer.actionLink.route} className="hover:underline underline-offset-4">
                  {footer.actionLink.text}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
