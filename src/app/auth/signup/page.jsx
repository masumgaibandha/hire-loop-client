"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

const SignUpPage = () => {
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

      const { data, error } = await authClient.signUp.email({
        name: user.name,
        email: user.email,
        password: user.password,
        image: user.image,
        callbackURL: "/auth/signin",
      });

      if (error) {
        setErrorMessage(error.message || "Sign-up failed.");
        return;
      }

      if (data) {
        setSuccessMessage("Sign-up successful. Redirecting...");

        setTimeout(() => {
          router.push("/auth/signin");
        }, 1000);
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
          <h2 className="text-4xl font-bold text-white">Create Your Account</h2>
          <p className="mt-2 text-sm text-white/60">
            Join Hire Loop and start your career journey.
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

        <TextField isRequired name="name">
          <Label className="text-white">Name</Label>
          <Input placeholder="John Doe" />
          <FieldError className="text-sm text-red-400" />
        </TextField>

        <TextField name="image" type="url">
          <Label className="text-white">Profile Image URL</Label>
          <Input placeholder="https://example.com/avatar.png" />
          <FieldError className="text-sm text-red-400" />
        </TextField>

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
          minLength={8}
          name="password"
          type={isVisible ? "text" : "password"}
          validate={(value) => {
            if (value.length < 8) {
              return "Password must be at least 8 characters";
            }
            if (!/[A-Z]/.test(value)) {
              return "Password must contain at least one uppercase letter";
            }
            if (!/[0-9]/.test(value)) {
              return "Password must contain at least one number";
            }
            return null;
          }}
        >
          <Label className="text-white">Password</Label>

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

          <Description className="text-white/80">
            Must be at least 8 characters with 1 uppercase and 1 number.
          </Description>
          <FieldError className="text-sm text-red-400" />
        </TextField>

        <Button
          type="submit"
          isLoading={loading}
          disabled={loading}
          variant="outline"
          className="w-full rounded-lg border-none bg-white text-black hover:bg-transparent hover:text-[#5C53FE]"
        >
          Sign Up
        </Button>

        <p className="text-center text-sm text-white/60">
          Already have an account?{" "}
          <Link href="/auth/signin" className="text-[#5C53FE] hover:underline">
            Sign in
          </Link>
        </p>
      </Form>
    </div>
  );
};

export default SignUpPage;
