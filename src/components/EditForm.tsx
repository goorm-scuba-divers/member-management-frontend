import ConfirmDialog from "@/components/ConfirmDialog"
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
import { type EditUserRequest, editUserSchema } from "@/lib/schemas/member"
import { cn } from "@/lib/utils"
import { userService } from "@/services/userService"
import { useAuthStore } from "@/stores/authStore"
import { handleError } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function EditForm({ className }: { className?: string }) {
  const { user, signout, updateUser } = useAuthStore()
  const { toast } = useToast()

  const form = useForm<EditUserRequest>({
    resolver: zodResolver(editUserSchema),
    defaultValues: {
      nickname: user?.nickname || "",
      currentPassword: "",
      newPassword: "",
    },
  })

  const extractChangedData = (user: EditUserRequest) => {
    const changes: Partial<EditUserRequest> = {}

    // TODO: Waiting for the backend to support nickname updates
    // if (form.formState.dirtyFields.nickname) {
    //   changes.nickname = data.nickname
    // }
    changes.nickname = user.nickname

    if (form.formState.dirtyFields.currentPassword) {
      changes.currentPassword = user.currentPassword
    }

    if (form.formState.dirtyFields.newPassword) {
      changes.newPassword = user.newPassword
    }

    // Check if there are any actual changes
    if (Object.keys(changes).length === 0) {
      throw new Error("At least nickname or password must be updated")
    }

    return changes
  }

  const onUpdate = async (user: EditUser) => {
    try {
      const changedData = extractChangedData(user)

      await userService.update(changedData)

      if (form.formState.dirtyFields.newPassword) {
        toast.success({
          message: "Password updated successfully!",
          options: { description: "Please sign in again." },
        })
        signout()
        return
      }

      if (form.formState.dirtyFields.nickname) {
        updateUser({ nickname: changedData.nickname })
        toast.success({ message: "Profile updated successfully!" })

        form.reset({
          nickname: changedData.nickname || user?.nickname || "",
          currentPassword: "",
          newPassword: "",
        })
      }
    } catch (error) {
      const message = handleError(error)
      toast.error({ message })
    }
  }

  const onDelete = async () => {
    try {
      await userService.delete()
      toast.success({ message: "Account deleted successfully!" })
      signout()
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
        <form onSubmit={form.handleSubmit(onUpdate)}>
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
                      placeholder={user?.nickname || "Set your nickname"}
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
          {/* TODO: 비밀번호 검증 이후 탈퇴 처리가 자연스러워보임 */}
          <ConfirmDialog
            trigger={
              <Button type="submit" className="cursor-pointer" variant="destructive">
                Delete Your Account
              </Button>
            }
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
            confirmLabel="Delete"
            cancelLabel="Cancel"
            variant="destructive"
            onConfirm={onDelete}
          />
        </div>
      </div>
    </div>
  )
}
