"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";

export const LoginButton = () => {
  return <Link href="/signin">Sign In</Link>;
};

export const LogoutButton = () => {
  return (
    <button onClick={() => signOut({ callbackUrl: "/signin" })}>
      Sign Out
    </button>
  );
};
