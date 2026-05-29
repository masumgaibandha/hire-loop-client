import Link from "next/link";

import {
  Briefcase,
  LogoFacebook,
  LogoGithub,
  LogoLinkedin,

} from "@gravity-ui/icons";

const footerLinks = {
  platform: [
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
    {
      label: "Dashboard",
      href: "/dashboard",
    },
  ],

  resources: [
    {
      label: "Resume Builder",
      href: "/resume-builder",
    },
    {
      label: "Career Tips",
      href: "/career-tips",
    },
    {
      label: "Interview Prep",
      href: "/interview-prep",
    },
    {
      label: "Salary Guide",
      href: "/salary-guide",
    },
  ],

  company: [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms & Conditions",
      href: "/terms",
    },
  ],
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        {/* TOP SECTION */}
        <div className="grid gap-12 lg:grid-cols-5">
          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500">
                <Briefcase className="h-5 w-5 text-white" />
              </div>

              <div>
                <h2 className="text-xl font-bold">Hire Loop</h2>

                <p className="text-sm text-gray-400">
                  Modern hiring platform for recruiters and job seekers.
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-7 text-gray-400">
              Everything you need to build your career, discover opportunities,
              and hire top talent — all in one platform.
            </p>

            {/* SOCIAL ICONS */}
            <div className="mt-6 flex items-center gap-4">
              <Link
                href="#"
                className="rounded-xl border border-white/10 p-3 text-gray-400 transition hover:border-violet-500 hover:text-white"
              >
                <LogoFacebook className="h-5 w-5" />
              </Link>


              <Link
                href="#"
                className="rounded-xl border border-white/10 p-3 text-gray-400 transition hover:border-violet-500 hover:text-white"
              >
                <LogoLinkedin className="h-5 w-5" />
              </Link>

              <Link
                href="#"
                className="rounded-xl border border-white/10 p-3 text-gray-400 transition hover:border-violet-500 hover:text-white"
              >
                <LogoGithub className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* PLATFORM */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>

            <ul className="space-y-4">
              {footerLinks.platform.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Resources
            </h3>

            <ul className="space-y-4">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h3>

            <ul className="space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-10 h-px bg-white/10" />

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} HireFlow. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Privacy
            </Link>

            <Link
              href="/terms"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Terms
            </Link>

            <Link
              href="/cookies"
              className="text-sm text-gray-500 transition hover:text-white"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
