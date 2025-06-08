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
import { type SigninRequest, signinSchema } from "@/lib/schemas/auth"
import { authService } from "@/services/authService"
import { useAuthStore } from "@/stores/authStore"
import { handleError } from "@/utils/errors"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function SigninPage() {
  const navigate = useNavigate()
  const location = useLocation()

  const { signin } = useAuthStore()
  const { toast } = useToast()

  const form = useForm<SigninRequest>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (request: SigninRequest) => {
    try {
      const data = await authService.signin(request)
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
        title: "Sign In",
        description: "Enter your username and password to sign in!",
      }}
      footer={{
        description: "Don't have an account?",
        actionLink: {
          text: "Sign up",
          href: routes.signup,
        },
      }}
    >
      <FormField
        control={form.control}
        name="username"
        render={({ field }) => (
          <FormItem className="grid gap-2">
            <FormLabel htmlFor="username" className="capitalize">
              username
            </FormLabel>
            <FormControl>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="py-6"
                disabled={form.formState.isSubmitting}
                {...field}
              />
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
                password
              </FormLabel>
              <FormDescription className="text-xs">
                {/* TODO: Add forgot password functionality */}
                <Link
                  to={routes.settings}
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </Link>
              </FormDescription>
            </div>
            <FormControl>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="py-6"
                disabled={form.formState.isSubmitting}
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </SignForm>
  )
}
