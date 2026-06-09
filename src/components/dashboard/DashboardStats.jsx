"use client";

import { Card } from "@heroui/react";

export default function DashboardStats({ stats = [] }) {
  return (
    <section
      aria-label="Dashboard statistics"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.label}
            role="article"
            aria-labelledby={`${stat.label}-title`}
            variant="default"
            className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-0 shadow-sm transition hover:border-zinc-700"
          >
            <Card.Content className="p-5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 text-zinc-300">
                {Icon && <Icon size={18} aria-hidden="true" />}
              </div>

              <Card.Header className="mt-6 flex flex-col items-start gap-3 p-0">
                <Card.Description className="text-xs font-medium text-zinc-400">
                  {stat.label}
                </Card.Description>

                <Card.Title
                  id={`${stat.label}-title`}
                  className="text-2xl font-semibold tracking-tight text-white"
                >
                  {stat.value}
                </Card.Title>
              </Card.Header>
            </Card.Content>
          </Card>
        );
      })}
    </section>
  );
}
