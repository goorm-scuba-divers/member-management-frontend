import { Button } from "@/components/shadcn-ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form"
import { Input } from "@/components/shadcn-ui/input"
import { Separator } from "@/components/shadcn-ui/separator"
import { useToast } from "@/context/ToastContext"
import { UpdateMemberFormSchema, type UpdateMemberRequest } from "@/lib/schemas/member"
import { cn } from "@/lib/utils"
import { memberService } from "@/services/memberService"
import { useAuthStore } from "@/stores/authStore"
import { handleError } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function EditForm({ className }: { className?: string }) {
  const { member, signout, updateMember } = useAuthStore()
  const { toast } = useToast()

  const form = useForm<UpdateMemberRequest>({
    resolver: zodResolver(UpdateMemberFormSchema),
    defaultValues: {
      nickname: member?.nickname || "",
      currentPassword: "",
      newPassword: "",
    },
  })

  const extractChangedData = (data: UpdateMemberRequest) => {
    const changes: Partial<UpdateMemberRequest> = {}

    // TODO: Waiting for the backend to support nickname updates
    // if (form.formState.dirtyFields.nickname) {
    //   changes.nickname = data.nickname
    // }
    changes.nickname = data.nickname

    if (form.formState.dirtyFields.currentPassword) {
      changes.currentPassword = data.currentPassword
    }

    if (form.formState.dirtyFields.newPassword) {
      changes.newPassword = data.newPassword
    }

    // Check if there are any actual changes
    if (Object.keys(changes).length === 0) {
      throw new Error("At least nickname or password must be updated")
    }

    return changes
  }

  const onSubmit = async (data: UpdateMemberRequest) => {
    try {
      const changedData = extractChangedData(data)

      await memberService.update(changedData)

      if (form.formState.dirtyFields.newPassword) {
        toast.success({
          message: "Password updated successfully!",
          options: { description: "Please sign in again." },
        })
        signout()
        return
      }

      if (form.formState.dirtyFields.nickname) {
        updateMember({ nickname: changedData.nickname })
        toast.success({ message: "Profile updated successfully!" })

        form.reset({
          nickname: changedData.nickname || member?.nickname || "",
          currentPassword: "",
          newPassword: "",
        })
      }
    } catch (error) {
      const message = handleError(error)
      toast.error({ message })
    }
  }

  return (
    <div className={cn("flex h-full flex-col justify-center gap-8", className)}>
      <div className="flex flex-col gap-2">
        <div className="font-bold text-xl">Profile</div>
        <p className="text-muted-foreground text-sm">
          This is how others will see you on the site.
        </p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-7">
            <FormField
              control={form.control}
              name="nickname"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-3">
                  <FormLabel htmlFor="nickname" className="capitalize">
                    nickname
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="nickname"
                      type="text"
                      placeholder={member?.nickname || "Set your nickname"}
                      className="py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name. It can be your real name or a pseudonym.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="currentPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="current-password" className="capitalize">
                      password
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="current-password"
                        type="password"
                        placeholder="Current Password"
                        className="py-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="New Password"
                        className="py-5"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      The new password must be at least 8 characters long, including both letters
                      and numbers.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Updating..." : "Update Profile"}
              </Button>
            </div>
          </div>
        </form>
      </Form>

      <Separator />

      <div className="flex flex-col gap-2">
        <div className="font-bold text-destructive text-xl">Delete Account</div>
        <p className="text-muted-foreground text-sm">Once deleted, the data cannot be recovered.</p>
        <div className="flex justify-end">
          <Button type="button" className="cursor-pointer" variant="destructive">
            Delete Your Account
          </Button>
        </div>
      </div>
    </div>
  )
}
