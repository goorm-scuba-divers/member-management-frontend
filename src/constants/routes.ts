export type Route = (typeof routes)[keyof typeof routes]

export const routes = {
  home: "/",
  signup: "/signup",
  signin: "/signin",
  members: "/members",
  settings: "/settings",
} as const
