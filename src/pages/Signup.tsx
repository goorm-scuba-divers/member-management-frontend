import SignForm from "@/components/SignForm"
import { routes } from "@/constants/routes"
import { authService } from "@/services/authService"
import { SignupRequestSchema, type SignupRequest, type SignupResponse } from "@/lib/schemas"
import { useAuthStore } from "@/stores/authStore"
import { ServiceError } from "@/types/errors"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Input } from "@/components/shadcn-ui/input"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/shadcn-ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormErrorToast } from "@/hooks/useFormErrorToast"
export default function Signup() {
  const form = useForm<SignupRequest>({
    resolver: zodResolver(SignupRequestSchema),
    defaultValues: {
      username: "",
      nickname: "",
      password: "",
    },
  })

  const { signin } = useAuthStore()
  const { toast } = useFormErrorToast(form.formState.errors)
  const navigate = useNavigate()

  const onSubmit = async (request: SignupRequest) => {
    try {
      const signupResponse: SignupResponse = await authService.signup(request)

      // TODO: fetch member info after signup and add Role to the response
      signin({ ...signupResponse })
      navigate(routes.settings)
    } catch (error) {
      console.error("[SIGNUP ERROR]: ", error)
      if (error instanceof ServiceError) toast.error({ message: error.message })
    }
  }

  return (
    <SignForm
      form={form}
      onSubmit={form.handleSubmit(onSubmit)}
      header={{
        title: "Sign Up",
        description: "Enter your information to sign up!",
      }}
      footer={{
        description: "Already have an account?",
        actionLink: {
          text: "Sign in",
          href: routes.signin,
        },
      }}
    >
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="grid gap-2">
            <div className="flex justify-between">
              <FormLabel htmlFor="username" className="capitalize">
                {"username"}
              </FormLabel>
            </div>
            <FormControl>
              <Input placeholder="Enter your username" className="py-6" {...field} />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem className="grid gap-2">
            <div className="flex justify-between">
              <FormLabel htmlFor="password" className="capitalize">
                {"password"}
              </FormLabel>
            </div>
            <FormDescription className="text-xs">
              Must be at least 8 characters long, including both letters and numbers.
            </FormDescription>
            <FormControl>
              <Input
                type="password"
                placeholder="Enter your password"
                className="py-6"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="nickname"
        render={({ field }) => (
          <FormItem className="grid gap-2">
            <div className="flex justify-between">
              <FormLabel htmlFor="nickname" className="capitalize">
                {"nickname"}
              </FormLabel>
            </div>
            <FormControl>
              <Input placeholder="Enter your nickname" className="py-6" {...field} />
            </FormControl>
          </FormItem>
        )}
      />
    </SignForm>
  )
}
