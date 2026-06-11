"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Briefcase,
  Envelope,
  Gear,
  House,
  LayoutSideContent,
  Magnifier,
  Person,
} from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export function DashboardSidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: House, label: "Home", href: "/dashboard/recruiter" },
    { icon: Magnifier, label: "Jobs", href: "/dashboard/recruiter/jobs" },
    {
      icon: Bell,
      label: "Post A Job",
      href: "/dashboard/recruiter/jobs/new",
    },
    {
      icon: Briefcase,
      label: "Company Profile",
      href: "/dashboard/recruiter/company",
    },
    { icon: Envelope, label: "Messages", href: "/dashboard/messages" },
    { icon: Person, label: "Profile", href: "/dashboard/profile" },
    { icon: Gear, label: "Settings", href: "/dashboard/settings" },
  ];

  const navContent = (
    <nav className="flex flex-col gap-5 px-5 py-8">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-5 text-lg font-semibold transition-colors ${
              isActive ? "text-white" : "text-white/70 hover:text-white"
            }`}
          >
            <Icon
              className={`size-7 ${isActive ? "text-white" : "text-white/70"}`}
            />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <aside className="hidden min-h-screen w-[260px] shrink-0 border-r border-white/10 bg-[#111] lg:block">
        {navContent}
      </aside>

      <div className="fixed bottom-5 left-5 z-50 lg:hidden">
        <Drawer>
          <Button className="rounded-full bg-white text-black" type="button">
            <LayoutSideContent className="size-5" />
          </Button>

          <Drawer.Backdrop>
            <Drawer.Content placement="left">
              <Drawer.Dialog className="h-full w-72 border-r border-white/10 bg-[#111] text-white">
                <Drawer.CloseTrigger />

                <Drawer.Header className="border-b border-white/10">
                  <Drawer.Heading>Navigation</Drawer.Heading>
                </Drawer.Header>

                <Drawer.Body className="p-0">{navContent}</Drawer.Body>
              </Drawer.Dialog>
            </Drawer.Content>
          </Drawer.Backdrop>
        </Drawer>
      </div>
    </>
  );
}
