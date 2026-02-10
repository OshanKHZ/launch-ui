"use client";

import { motion } from "motion/react";
import { LayoutLines } from "@/components/ui/layout-lines";
import Navbar from "@/components/sections/navbar/default";
import BlurText from "@/components/ui/blur-text";
import { ActionButton } from "@/components/ui/action-button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="bg-background text-foreground min-h-screen w-full relative overflow-hidden">
      <LayoutLines />
      <Navbar />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div
          className="text-center space-y-6 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* 404 Number */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="text-[100px] md:text-[160px] lg:text-[200px] font-mono font-bold leading-none tracking-tighter text-primary">
              404
            </h1>
          </motion.div>

          {/* Title with Blur Animation */}
          <div className="space-y-3">
            <BlurText
              text="Page Not Found"
              className="text-2xl md:text-4xl lg:text-5xl font-mono font-bold uppercase tracking-tighter"
              delay={50}
              animateBy="letters"
              direction="bottom"
            />

            <BlurText
              text="The page you're looking for doesn't exist or has been moved."
              className="text-sm md:text-base text-muted-foreground max-w-md mx-auto"
              delay={30}
              animateBy="words"
              direction="bottom"
            />
          </div>

          {/* Back to Home Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="pt-4 flex justify-center"
          >
            <ActionButton
              href="/"
              label="Back to Home"
              Icon={ArrowLeft}
              variant="solid"
              target="_self"
            />
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="pt-8 flex items-center justify-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="h-[2px] w-12 bg-border" />
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Error_404
            </span>
            <div className="h-[2px] w-12 bg-border" />
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
