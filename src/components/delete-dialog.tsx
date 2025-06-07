import ConfirmDialog from "@/components/confirm-dialog"
import { Button } from "@/components/shadcn-ui/button"

export default function DeleteAccountSection() {
  return (
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
      onConfirm={() => {
        console.log("삭제 처리 실행")
      }}
    />
  )
}
