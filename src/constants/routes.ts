export type Route = (typeof routes)[keyof typeof routes]

export const routes = {
  signup: "/signup",
  signin: "/signin",
  members: "/members",
  settings: "/settings",
  forbidden: "/forbidden",
  unauthorized: "/unauthorized",
} as const
