import FormField from "@/components/FormField"
import SignForm from "@/components/SignForm"
import { routes } from "@/constants/routes"

export default function Signin() {
  return (
    <SignForm
      title="Sign In"
      description="Enter your username and password to sign in!"
      footer={{
        description: "Don't have an account?",
        actionLink: {
          text: "Sign up",
          href: routes.signup,
        },
      }}
    >
      <FormField label="username" placeholder="Enter your username" />
      <FormField
        label="password"
        type="password"
        placeholder="Enter your password"
        actionLink={{ text: "Forgot your password?", href: routes.home }}
      />
    </SignForm>
  )
}
