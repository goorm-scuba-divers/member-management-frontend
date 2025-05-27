import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"
import { Separator } from "@/components/shadcn-ui/separator"
import type { SignFormProps } from "@/types/sign.ts"
import { Label } from "@radix-ui/react-label"

export default function SignForm({ title, description, fields, footer }: SignFormProps) {
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
                {fields.map(field => (
                  <div key={field.label} className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor={field.label} className="capitalize">
                        {field.label}
                      </Label>
                      {field.subLink && (
                        <a
                          href={field.subLink.route}
                          className="text-muted-foreground text-xs underline-offset-4 hover:underline"
                        >
                          {field.subLink.text}
                        </a>
                      )}
                    </div>
                    {field.helperText && (
                      <p className="text-muted-foreground text-xs">{field.helperText}</p>
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
            <div className="mt-1 text-center text-muted-foreground text-sm capitalize">
              {footer.description}{" "}
              {footer.actionLink && (
                <a href={footer.actionLink.route} className="underline-offset-4 hover:underline">
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
