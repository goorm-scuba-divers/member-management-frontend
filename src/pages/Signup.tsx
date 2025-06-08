import SignForm from "@/components/SignForm"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shadcn-ui/form"
import { Input } from "@/components/shadcn-ui/input"
import { routes } from "@/constants/routes"
import { useToast } from "@/context/ToastContext"
import { type SignupRequest, SignupRequestSchema } from "@/lib/schemas/auth"
import { authService } from "@/services/authService"
import { useAuthStore } from "@/stores/authStore"
import { handleError } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"

export default function Signup() {
  const navigate = useNavigate()
  const location = useLocation()

  const { signin } = useAuthStore()
  const { toast } = useToast()

  const form = useForm<SignupRequest>({
    resolver: zodResolver(SignupRequestSchema),
    defaultValues: {
      username: "",
      nickname: "",
      password: "",
    },
  })

  const onSubmit = async (request: SignupRequest) => {
    try {
      const data = await authService.signup(request)
      signin({ ...data })

      const from = location.state?.from?.pathname || routes.settings
      const redirectTo = [routes.signin, routes.signup].includes(from) ? routes.settings : from

      navigate(redirectTo, { replace: true })
    } catch (error) {
      const message = handleError(error)
      toast.error({ message })
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
                username
              </FormLabel>
            </div>
            <FormControl>
              <Input placeholder="Enter your username" className="py-6" {...field} />
            </FormControl>
            <FormMessage />
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
            <FormMessage />
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
            <FormMessage />
          </FormItem>
        )}
      />
    </SignForm>
  )
}
