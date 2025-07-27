"use client";

import "./signup.css";
import React, { useActionState } from "react";
import { handleSubmit } from "./actions";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();
  const [state, action, pending] = useActionState(handleSubmit);

  return (
    <div className="form-container">
      <h2 className="form-title">Sign Up</h2>
      <form className="form" action={action}>
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-input"
            placeholder="Enter your full name"
          />
          {state?.errors?.name && (
            <span className="error-message">{state.errors.name}</span>
          )}
        </div>

        <div className="form-group">
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
          {pending ? "Creating Account..." : "Create Account"}
        </button>

        <p>
          Already registered?{" "}
          <a
            style={{
              cursor: "pointer",
              textDecoration: "underline",
              color: "lightgreen",
            }}
            onClick={() => router.push("/signin")}
          >
            Sign In
          </a>
        </p>
      </form>
    </div>
  );
}
