"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import {
  Bars,
  Briefcase,
  ChevronDown,
  LayoutListHorizontal,
  Person,
  Xmark,
} from "@gravity-ui/icons";

// Replace with Better Auth session
const user = null;

// const user = {
//   name: "Masum",
//   image: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//   role: "recruiter",
// };

const navLinks = [
  {
    label: "Browse Jobs",
    href: "/jobs",
  },
  {
    label: "Companies",
    href: "/companies",
  },
  {
    label: "Pricing",
    href: "/pricing",
  },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-3">
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

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-6">
          {/* DESKTOP NAVIGATION */}
          <ul className="hidden items-center gap-8 lg:flex">
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

          {/* VERTICAL DIVIDER */}
          <div className="hidden h-6 w-px bg-white/10 lg:block" />

          {/* AUTH SECTION */}
          <div className="hidden items-center gap-4 lg:flex">
            {!user ? (
              <>
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
              </>
            ) : (
              <>
                {/* DASHBOARD */}
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
                >
                  <LayoutListHorizontal className="h-4 w-4" />
                  Dashboard
                </Link>

                {/* USER */}
                <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-2 py-1">
                  <Image
                    src={user?.image || "/default-avatar.png"}
                    alt={user?.name || "User"}
                    width={36}
                    height={36}
                    className="rounded-full object-cover"
                  />

                  <div className="pr-2">
                    <p className="text-sm font-medium text-white">
                      {user?.name}
                    </p>

                    <p className="text-xs capitalize text-gray-400">
                      {user?.role}
                    </p>
                  </div>

                  <ChevronDown className="h-4 w-4 text-gray-400" />
                </div>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center rounded-xl border border-white/10 bg-white/5 p-2 text-white lg:hidden"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <Xmark className="h-5 w-5" />
            ) : (
              <Bars className="h-5 w-5" />
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 lg:hidden">
          <div className="space-y-5 px-4 py-6">
            {/* MOBILE LINKS */}
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm font-medium text-gray-300 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="h-px bg-white/10" />

            {/* MOBILE AUTH */}
            {!user ? (
              <div className="flex flex-col gap-3">
                <Link
                  href="/sign-in"
                  className="rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium text-white transition hover:bg-white/5"
                >
                  Sign In
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-gray-200"
                >
                  Get Started
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {/* USER */}
                <div className="flex items-center gap-3">
                  <Image
                    src={user?.image || "/default-avatar.png"}
                    alt={user?.name || "User"}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />

                  <div>
                    <p className="font-medium text-white">{user?.name}</p>

                    <p className="text-sm capitalize text-gray-400">
                      {user?.role}
                    </p>
                  </div>
                </div>

                {/* MOBILE ACTIONS */}
                <div className="flex flex-col gap-4">
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <Person className="h-4 w-4" />
                    Dashboard
                  </Link>

                  <button className="flex items-center gap-2 text-red-400">
                    <Xmark className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
