"use server";

import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export async function getUserToken() {
  const cookieStore = await cookies();
  const encodedToken = cookieStore.get("next-auth.session-token")?.value;

  if (!encodedToken) return null;

  const decoded = await decode({
    token: encodedToken,
    secret: process.env.AUTH_SECRET!,
  });

  return decoded!.token;
}
