import SignForm from "@/components/SignForm"
import { routes } from "@/constants/routes"
import type { SignFormProps } from "@/types/sign"

const signinForm: SignFormProps = {
  title: "Sign In",
  description: "Enter your information to sign in!",
  fields: [
    {
      label: "username",
      type: "text",
      placeholder: "Enter your username",
      required: true,
    },
    {
      label: "password",
      type: "password",
      placeholder: "Enter your password",
      required: true,
      subLink: {
        route: routes.home,
        text: "Forgot your password?",
      },
    },
  ],
  footer: {
    description: "Don't have an account?",
    actionLink: {
      route: routes.signup,
      text: "Sign up",
    },
  },
}

export default function Signin() {
  return <SignForm {...signinForm} />
}
