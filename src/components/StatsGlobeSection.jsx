"use client";

import { Card } from "@heroui/react";
import { Briefcase, Persons, Magnifier, Star } from "@gravity-ui/icons";
import { motion } from "motion/react";

const stats = [
  { label: "Active Jobs", value: "50K", icon: Briefcase },
  { label: "Companies", value: "12K", icon: Persons },
  { label: "Job Seekers", value: "2M", icon: Magnifier },
  { label: "Satisfaction Rate", value: "97%", icon: Star },
];

export default function StatsGlobeSection() {
  return (
    <section className="relative overflow-hidden bg-[#020208] text-white">
      {/* Globe */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 bg-no-repeat"
        style={{
          backgroundImage: "url('/images/globe.png')",
          backgroundSize: "min(1100px, 100%) auto",
          backgroundPosition: "center bottom 100px",
        }}
        animate={{ y: [0, -15, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple glow */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-0 z-[1] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-700/20 blur-[120px]"
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.65, 0.35],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-36 bg-gradient-to-b from-[#020208] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-48 bg-gradient-to-t from-[#020208] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-1/6 bg-gradient-to-r from-[#020208] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-1/6 bg-gradient-to-l from-[#020208] to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-24 pt-52 sm:px-6 sm:pt-60 lg:px-8 lg:pt-72">
        {/* Headline */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-semibold leading-snug tracking-tight text-white/70 sm:text-4xl lg:text-5xl">
            Assisting over{" "}
            <span className="font-bold text-white">15,000 job seekers</span>{" "}
            find their dream positions.
          </h2>

          <motion.p
            className="mt-4 text-sm text-white/50 sm:text-base"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            Remote or on-site, we connect talent with opportunity worldwide.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {stats.map(({ label, value, icon: Icon }, index) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.55,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
                scale: 1.02,
              }}
            >
              <Card
                shadow="none"
                className="group rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl transition-colors duration-300 hover:border-white/20 hover:bg-black/70"
              >
                <div className="flex min-h-[160px] flex-col justify-between p-5 sm:min-h-[190px] sm:p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition-colors duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                    <Icon className="h-[18px] w-[18px] text-white/60" />
                  </div>

                  <div>
                    <p className="text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
                      {value}
                    </p>
                    <p className="mt-2 text-sm text-white/40">{label}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
