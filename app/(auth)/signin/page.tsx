"use client";

import "../signup/signup.css";
import { useRouter, useSearchParams } from "next/navigation";
import { handleSubmit } from "./actions";
import React, { Suspense, useActionState } from "react";
import { signIn } from "next-auth/react";

export default function Wrapper() {
  return (
    <Suspense>
      <SignIn />
    </Suspense>
  );
}

function SignIn() {
  const router = useRouter();
  const [state, action, pending] = useActionState(handleSubmit, {
    email: "",
    password: "",
  });
  const searchParams = useSearchParams();
  const error = searchParams.get("error") && "Password or email is not valid";

  return (
    <div className="form-container">
      <h2 className="form-title">Sign In</h2>
      <form className="form" action={action}>
        <div className="form-group">
          {error && <span className="error-message">{error}</span>}

          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
          />
          {state?.errors?.email && (
            <span className="error-message">{state.errors.email}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Create a password"
          />
          {state?.errors?.password && (
            <span className="error-message">{state.errors.password}</span>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={pending}>
          {pending ? "Submitting..." : "Login"}
        </button>
      </form>

      <button
        className="google-signin-btn google-signin-btn--dark"
        type="button"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <svg className="google-logo" viewBox="0 0 24 24">
          <path
            fill="#ffffff"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#ffffff"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#ffffff"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#ffffff"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Sign in with Google
      </button>

      <p>
        Don&apos;t have an account?{" "}
        <a
          style={{
            cursor: "pointer",
            textDecoration: "underline",
            color: "lightgreen",
          }}
          onClick={() => router.push("/signup")}
        >
          Sign Up
        </a>
      </p>
    </div>
  );
}
