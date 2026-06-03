"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

const SignInPage = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const onSubmit = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());

    try {
      setLoading(true);

      const { data, error } = await authClient.signIn.email({
        email: user.email,
        password: user.password,
        callbackURL: "/",
      });

      if (error) {
        setErrorMessage(error.message || "Invalid email or password.");
        return;
      }

      if (data) {
        setSuccessMessage("Sign-in successful. Redirecting...");

        setTimeout(() => {
          router.push("/");
        }, 700);
      }
    } catch (error) {
      setErrorMessage(error?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#1e1e1e] to-[#2c2c2c] px-4">
      <Form
        className="flex w-full max-w-md flex-col gap-4 rounded-md border border-white/20 bg-white/5 p-6 backdrop-blur-md"
        onSubmit={onSubmit}
      >
        <div>
          <h2 className="text-4xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-sm text-white/60">
            Sign in to continue to Hire Loop.
          </p>
        </div>

        {errorMessage && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
            {successMessage}
          </div>
        )}

        <TextField
          isRequired
          name="email"
          type="email"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }

            return null;
          }}
        >
          <Label className="text-white">Email</Label>
          <Input placeholder="john@example.com" />
          <FieldError className="text-sm text-red-400" />
        </TextField>

        <TextField
          isRequired
          name="password"
          type={isVisible ? "text" : "password"}
          validate={(value) => {
            if (!value) {
              return "Please enter your password";
            }

            return null;
          }}
        >
          <div className="mb-1 flex items-center justify-between">
            <Label className="text-white">Password</Label>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-white/70 hover:text-[#5C53FE]"
            >
              Forgot password?
            </Link>
          </div>

          <div className="flex items-center rounded-lg bg-white">
            <Input placeholder="Enter your password" className="flex-1" />

            <button
              type="button"
              onClick={toggleVisibility}
              className="px-3 text-black/60 hover:text-black"
              aria-label={isVisible ? "Hide password" : "Show password"}
            >
              {isVisible ? (
                <EyeSlash className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <FieldError className="text-sm text-red-400" />
        </TextField>

        <Button
          type="submit"
          isLoading={loading}
          disabled={loading}
          variant="outline"
          className="w-full rounded-lg border-none bg-white text-black hover:bg-transparent hover:text-[#5C53FE]"
        >
          Sign In
        </Button>

        <p className="text-center text-sm text-white/60">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-[#5C53FE] hover:underline">
            Create account
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignInPage;
