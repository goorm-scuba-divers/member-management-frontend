export type Route = (typeof routes)[keyof typeof routes]

export const routes = {
  signup: "/signup",
  signin: "/signin",
  members: "/members",
  settings: "/settings",
} as const

export interface ActionLink {
  text: string
  href: Route
}
