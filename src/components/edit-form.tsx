import { Button } from "@/components/shadcn-ui/button"
import { Input } from "@/components/shadcn-ui/input"
import { Separator } from "@/components/shadcn-ui/separator"
import { Label } from "@radix-ui/react-label"

export default function EditForm() {
  return (
    <>
      <div className="flex min-h-[calc(100vh-188px)] w-full max-w-3xl flex-col justify-center">
        <div className="flex flex-col gap-2">
          <div className="font-bold text-xl">Profile</div>
          <p className="text-muted-foreground text-sm">
            This is how others will see you on the site.
          </p>
        </div>

        <Separator className="my-8" />

        <form>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <Label htmlFor="nickname" className="capitalize">
                nickname
              </Label>
              <Input
                id="nickname"
                type="text"
                placeholder="jaeyeopme"
                className="py-5"
                required={true}
              />
              <p className="text-muted-foreground text-sm">
                This is your public display name. It can be your real name or a pseudonym.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="current-password" className="capitalize">
                password
              </Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Current Password"
                className="py-5"
              />
              <Input
                id="new-password"
                type="password"
                placeholder="New Password"
                className="py-5"
              />
              <p className="text-muted-foreground text-sm">
                The new password must be at least 8 characters long, including both letters and
                numbers.
              </p>
            </div>
            <div className="flex justify-end">
              <Button type="submit" className="cursor-pointer">
                Update Profile
              </Button>
            </div>
          </div>
        </form>

        <Separator className="my-8" />

        <div className="flex flex-col gap-2">
          <div className="font-bold text-destructive text-xl">Delete Account</div>
          <p className="text-muted-foreground text-sm">
            Once deleted, the data cannot be recovered.
          </p>
          <div className="flex justify-end">
            <Button type="submit" className="cursor-pointer" variant="destructive">
              Delete Your Account
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
