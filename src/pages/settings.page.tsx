import EditForm from "@/components/edit-form.component"
import SideBar from "@/layouts/side-bar.layout"

export default function SettingsPage() {
  return (
    <SideBar>
      <EditForm className="w-4/6" />
    </SideBar>
  )
}
