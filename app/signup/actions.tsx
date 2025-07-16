"use server";
import { SignUpFormData } from "../lib/definitions";
import bcrypt from "bcrypt";
import { prisma } from "@/app/prisma/prisma";
import { redirect } from "next/navigation";

export async function handleSubmit(state, formData) {
  const result = SignUpFormData.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  const { name, email, password } = result.data;

  const emailExists = await prisma.user.findUnique({
    where: { email },
  });
  if (emailExists) {
    return { errors: { email: `Email ${email} already exists` } };
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  const data = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  redirect("/api/auth/signin");
}
