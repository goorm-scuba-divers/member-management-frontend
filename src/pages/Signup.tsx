import FormField from "@/components/FormField"
import SignForm from "@/components/SignForm"
import { routes } from "@/constants/routes"

export default function Signup() {
  return (
    <SignForm
      title="Sign Up"
      description="Enter your information to sign up!"
      footer={{
        description: "Already have an account?",
        actionLink: {
          text: "Sign in",
          href: routes.signin,
        },
      }}
    >
      <FormField label="username" placeholder="Enter your username" />
      <FormField
        label="password"
        type="password"
        placeholder="Enter your password"
        helperText="Must be at least 8 characters long, including both letters and numbers."
      />
      <FormField label="nickname" placeholder="Enter your nickname" />
    </SignForm>
  )
}
