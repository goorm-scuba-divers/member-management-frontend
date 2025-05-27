import SignForm from "@/components/sign-form"
import { routes } from "@/constants/routes.ts"
import type { SignFormProps } from "@/types/sign.ts"

const signupForm: SignFormProps = {
  title: "Sign Up",
  description: "Enter your information to sign up!",
  fields: [
    {
      label: "username",
      type: "text",
      placeholder: "Enter your username",
      required: true,
    },
    {
      label: "password",
      helperText: "Must be at least 8 characters long, including both letters and numbers.",
      type: "password",
      placeholder: "Enter your password",
      required: true,
    },
    {
      label: "nickname",
      type: "text",
      placeholder: "Enter your nickname",
      required: true,
    },
  ],
  footer: {
    description: "Already have an account?",
    actionLink: {
      route: routes.signin,
      text: "Sign in",
    },
  },
}

export default function Signup() {
  return <SignForm {...signupForm} />
}
