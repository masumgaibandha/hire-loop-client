"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Card,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Envelope, Lock } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const validateEmail = (value) => {
    if (!value.trim()) return "Please enter your email address.";

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
      return "Please enter a valid email address.";
    }

    return null;
  };

  const validatePassword = (value) => {
    if (!value) return "Please enter your password.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);

    const email = formData.get("email") || "";
    const password = formData.get("password") || "";

    if (validateEmail(email) || validatePassword(password)) {
      return;
    }

    try {
      setLoading(true);

      const { error } = await authClient.signIn.email({
        email,
        password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        return;
      }

      setSuccessMessage("Signed in successfully.");

      setTimeout(() => {
        router.push("/dashboard");
      }, 700);
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#020208] px-4 py-10 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.25),_transparent_42%)]" />

      <Card className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-black/70 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
          <p className="mt-2 text-sm text-white/50">
            Sign in to continue to Hire Loop.
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
          <TextField
            isRequired
            name="email"
            type="email"
            validate={validateEmail}
            className="w-full"
          >
            <Label className="mb-2 block text-sm font-medium text-white/70">
              Email
            </Label>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 focus-within:border-violet-500/60">
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
            type="password"
            validate={validatePassword}
            className="w-full"
          >
            <div className="mb-2 flex items-center justify-between">
              <Label className="block text-sm font-medium text-white/70">
                Password
              </Label>

              <Link
                href="/forgot-password"
                className="text-xs font-medium text-violet-400 hover:text-violet-300"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 focus-within:border-violet-500/60">
              <Lock className="h-4 w-4 text-white/40" />
              <Input
                placeholder="Enter your password"
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/35"
              />
            </div>

            <FieldError className="mt-2 text-xs text-red-400" />
          </TextField>

          <Button
            type="submit"
            isLoading={loading}
            disabled={loading}
            className="h-12 w-full rounded-xl bg-white font-semibold text-black hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Sign In
          </Button>
        </Form>

        <p className="mt-6 text-center text-sm text-white/50">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-violet-400 hover:text-violet-300"
          >
            Create account
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
