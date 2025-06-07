import { Button } from "@/components/shadcn-ui/button"
import { Link } from "react-router-dom"

interface ErrorPageProps {
  code: string
  message: string
  buttonText?: string
  buttonTo?: string
}

function ErrorPage({
  code,
  message,
  buttonText = "Return to Home",
  buttonTo = "/",
}: ErrorPageProps) {
  return (
    <div className="flex min-h-screen items-center px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full space-y-6 text-center">
        <div className="space-y-3">
          <h1 className="animate-bounce font-bold text-4xl tracking-tighter sm:text-5xl">{code}</h1>
          <p className="text-gray-500">{message}</p>
        </div>
        <Button asChild type="button" variant="default" size="lg" className="cursor-pointer">
          <Link to={buttonTo} replace>{buttonText}</Link>
        </Button>
      </div>
    </div>
  )
}

export function NotFound() {
  return <ErrorPage code="404" message="Sorry, the page you're looking for doesn't exist." />
}

export function Forbidden() {
  return <ErrorPage code="403" message="You don't have permission to access this page." />
}

export function Unauthorized() {
  return (
    <ErrorPage
      code="401"
      message="Authentication required. Please sign in to continue."
      buttonText="Sign In"
      buttonTo="/signin"
    />
  )
}
