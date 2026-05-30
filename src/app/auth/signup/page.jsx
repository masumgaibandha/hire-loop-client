"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Envelope, Eye, EyeSlash, Lock, Person } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateName = (value) => {
    if (!value.trim()) return "Please enter your name.";
    return null;
  };

  const validateEmail = (value) => {
    if (!value.trim()) return "Please enter your email address.";
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const validatePassword = (value) => {
    if (!value) return "Please enter your password.";
    if (value.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(value))
      return "Password must contain at least one uppercase letter.";
    if (!/[a-z]/.test(value))
      return "Password must contain at least one lowercase letter.";
    if (!/[0-9]/.test(value))
      return "Password must contain at least one number.";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value))
      return "Password must contain at least one special character.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const name = formData.get("name") || "";
    const email = formData.get("email") || "";
    const password = formData.get("password") || "";

    if (
      validateName(name) ||
      validateEmail(email) ||
      validatePassword(password)
    ) {
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        callbackURL: "/auth/signin",
      });

      if (error) {
        setErrorMessage(error.message || "Failed to create account.");
        return;
      }

      setSuccessMessage("Account created successfully.");

      setTimeout(() => {
        router.push("/auth/signin");
      }, 1000);
    } catch (err) {
      setErrorMessage(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020208] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.25),_transparent_42%)]" />

      <Card className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-sm text-white/50">
            Join Hire Loop and start your career journey.
          </p>
        </div>

        {errorMessage && (
          <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="mb-4 rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {successMessage}
          </div>
        )}

        <Form
          onSubmit={handleSubmit}
          validationBehavior="aria"
          className="space-y-4"
        >
          <TextField isRequired name="name" validate={validateName}>
            <Label className="mb-2 block text-sm font-medium text-white/70">
              Name
            </Label>
            <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 transition focus-within:border-violet-500/60">
              <Person className="h-4 w-4 text-white/40" />
              <Input
                placeholder="Enter your name"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>
            <FieldError className="mt-2 text-xs text-red-400" />
          </TextField>

          <TextField
            isRequired
            name="email"
            type="email"
            validate={validateEmail}
          >
            <Label className="mb-2 block text-sm font-medium text-white/70">
              Email
            </Label>
            <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 transition focus-within:border-violet-500/60">
              <Envelope className="h-4 w-4 text-white/40" />
              <Input
                placeholder="Enter your email"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>
            <FieldError className="mt-2 text-xs text-red-400" />
          </TextField>

          <TextField
            isRequired
            name="password"
            type={showPassword ? "text" : "password"}
            validate={validatePassword}
          >
            <Label className="mb-2 block text-sm font-medium text-white/70">
              Password
            </Label>
            <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 transition focus-within:border-violet-500/60">
              <Lock className="h-4 w-4 text-white/40" />
              <Input
                placeholder="Enter your password"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/40 transition hover:text-white"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeSlash className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>
            <Description className="mt-2 text-xs text-white/35">
              Use 8+ characters with uppercase, lowercase, number, and symbol.
            </Description>
            <FieldError className="mt-2 text-xs text-red-400" />
          </TextField>

          <Button
            type="submit"
            isLoading={loading}
            disabled={loading}
            className="h-12 w-full rounded-xl bg-white font-semibold text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Create Account
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Sign in
          </Link>
        </p>

        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-white/40 hover:text-white">
            ← Back to home
          </Link>
        </div>
      </Card>
    </main>
  );
}
