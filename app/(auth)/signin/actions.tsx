"use client";
import { SignInFormData } from "@/app/lib/definitions";
import { signIn } from "next-auth/react";

export async function handleSubmit(state, formData) {
  const result = SignInFormData.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  await signIn("credentials", {
    ...result.data,
    redirect: true,
    callbackUrl: "/",
  });
}
