"use client";

import { motion } from "motion/react";
import { TextEffect } from "@/components/ui/text-effect";

export function AnimatedHero() {
  return (
    <div className="mb-14 relative">
      {/* Gradient accent blob */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-gradient-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative"
      >
        <motion.p
          className="text-sm font-medium text-muted-foreground/60 uppercase tracking-widest mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          Welcome to
        </motion.p>
        <motion.h1
          className="text-4xl sm:text-5xl font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
        >
          Learn React{" "}
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Hooks
          </span>
        </motion.h1>
        <TextEffect
          preset="fade-in-blur"
          per="word"
          delay={0.3}
          className="text-lg text-muted-foreground max-w-2xl"
        >
          Not another docs site. Every hook is wrapped in a story — spy
          networks, space launches, DJ booths — so the concepts stick, not just
          the syntax.
        </TextEffect>
      </motion.div>

      {/* Stats bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-6 text-sm text-muted-foreground"
      >
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-green-500" />
          <span>5 Fundamentals</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-blue-500" />
          <span>14 React Hooks</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-2 rounded-full bg-purple-500" />
          <span>2 TanStack Hooks</span>
        </div>
      </motion.div>
    </div>
  );
}
