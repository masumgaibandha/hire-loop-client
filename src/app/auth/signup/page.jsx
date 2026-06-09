"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  Button,
  Link,
  TextField,
  Label,
  InputGroup,
  Input,
  Radio,
  RadioGroup,
} from "@heroui/react";
import { Eye, EyeSlash, Person, At, ShieldKeyhole } from "@gravity-ui/icons";

import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("seeker");

  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const { data, error: authError } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/auth/signin",
      });
     

      if (authError) {
        setError(authError.message || "Something went wrong during signup.");
        return;
      }

      setSuccess("Account created successfully! Redirecting...");

      setName("");
      setEmail("");
      setPassword("");
      setRole("seeker");

      router.push("/auth/signin");
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err?.message || "An unexpected network error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 py-10 dark:bg-zinc-950">
      <Card className="w-full max-w-md border border-zinc-200 p-6 shadow-sm dark:border-zinc-800">
        <div className="mb-6 border-b border-zinc-100 pb-6 text-center dark:border-zinc-800">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Create an account
          </h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Join Hire Loop and start your journey
          </p>
        </div>

        <form onSubmit={handleSignup} className="flex flex-col gap-5">
          <TextField required name="name" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Name
            </Label>
            <InputGroup className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 transition-colors focus-within:border-primary dark:border-zinc-800 dark:bg-zinc-900">
              <Person size={16} className="text-zinc-400" />
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full border-none bg-transparent py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100"
              />
            </InputGroup>
          </TextField>

          <TextField required name="email" className="flex flex-col gap-1.5">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email Address
            </Label>
            <InputGroup className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 transition-colors focus-within:border-primary dark:border-zinc-800 dark:bg-zinc-900">
              <At size={16} className="text-zinc-400" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border-none bg-transparent py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100"
              />
            </InputGroup>
          </TextField>

          <TextField
            required
            name="password"
            className="flex flex-col gap-1.5"
          >
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </Label>
            <InputGroup className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 transition-colors focus-within:border-primary dark:border-zinc-800 dark:bg-zinc-900">
              <ShieldKeyhole size={16} className="text-zinc-400" />
              <Input
                type={isVisible ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Choose a password"
                className="w-full border-none bg-transparent py-2 text-sm text-zinc-900 outline-none dark:text-zinc-100"
              />

              <button
                type="button"
                onClick={toggleVisibility}
                aria-label={isVisible ? "Hide password" : "Show password"}
                className="text-zinc-400 transition hover:text-zinc-600 focus:outline-none dark:hover:text-zinc-200"
              >
                {isVisible ? <EyeSlash size={18} /> : <Eye size={18} />}
              </button>
            </InputGroup>
          </TextField>

          <div className="flex flex-col gap-3">
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Account Type
            </Label>

            <RadioGroup
              value={role}
              name="role"
              onChange={(value) => setRole(value)}
              orientation="horizontal"
            >
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>
                </Radio.Content>
              </Radio>

              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>
                </Radio.Content>
              </Radio>
            </RadioGroup>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-100/60 p-3.5 text-xs font-medium text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
              <span className="font-semibold">Error:</span> {error}
            </div>
          )}

          {success && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-100/60 p-3.5 text-xs font-medium text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-400">
              <span className="font-semibold">Success:</span> {success}
            </div>
          )}

          <Button
            type="submit"
            color="primary"
            isPending={isLoading}
            isDisabled={isLoading}
            className="h-12 w-full rounded-xl text-sm font-semibold"
          >
            Sign Up
          </Button>

          <div className="mt-2 border-t border-zinc-100 pt-4 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="cursor-pointer text-sm font-medium text-blue-600 dark:text-blue-400"
            >
              Sign in instead
            </Link>
          </div>
        </form>
      </Card>
    </main>
  );
}
