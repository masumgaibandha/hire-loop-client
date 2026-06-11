"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bars, Briefcase, LayoutList, Person, Xmark } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

import { signOut, useSession } from "@/lib/auth-client";

const navLinks = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Companies", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();
  const user = session?.user;

  const closeMenu = () => setIsMenuOpen(false);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          closeMenu();
          router.push("/auth/signin");
          router.refresh();
        },
      },
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#070707]/80 backdrop-blur-xl">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" onClick={closeMenu} className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
            <Briefcase className="h-5 w-5 text-white" />
          </div>

          <div>
            <h2 className="text-lg font-bold tracking-wide text-white">
              Hire Loop
            </h2>
            <p className="text-xs text-gray-400">Find your dream career</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-6 lg:flex">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-gray-300 transition hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="h-6 w-px bg-white/10" />

          {isPending ? null : user ? (
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard/recruiter"
                className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
              >
                <LayoutList className="h-4 w-4" />
                Dashboard
              </Link>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white">
                {user?.name || user?.email}
              </div>

              <Button color="danger" variant="flat" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                href="/auth/signin"
                className="text-sm font-medium text-violet-400 transition hover:text-violet-300"
              >
                Sign In
              </Link>

              <Link
                href="/auth/signup"
                className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-gray-200"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white lg:hidden"
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <Xmark className="h-5 w-5" />
          ) : (
            <Bars className="h-5 w-5" />
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 lg:hidden">
          <div className="space-y-5 px-4 py-6">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={closeMenu}
                    className="block text-sm font-medium text-gray-300 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-px bg-white/10" />

            {isPending ? null : user ? (
              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="font-medium text-white">
                    {user?.name || "User"}
                  </p>
                  <p className="text-sm text-gray-400">{user?.email}</p>
                </div>

                <Link
                  href="/dashboard"
                  onClick={closeMenu}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <Person className="h-4 w-4" />
                  Dashboard
                </Link>

                 <Button onClick={handleSignOut} className="w-full justify-start" variant="danger">Sign Out</Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/signin"
                  onClick={closeMenu}
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/5"
                >
                  Sign In
                </Link>

                <Link
                  href="/auth/signup"
                  onClick={closeMenu}
                  className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
