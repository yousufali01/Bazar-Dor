
import { createAuthClient } from "better-auth/react";

const authBaseURL =
  process.env.NEXT_PUBLIC_BETTER_AUTH_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://bazardordaily.vercel.app"
    : "http://localhost:3000");

export const authClient = createAuthClient({
  baseURL: authBaseURL,
});