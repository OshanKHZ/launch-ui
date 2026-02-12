"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";

const socialLinks = [
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/your-profile",
        icon: "/icons/linkedin.svg",
    },
    {
        name: "Email",
        href: "mailto:your.email@example.com",
        icon: "/icons/email.svg",
    },
    {
        name: "GitHub",
        href: "https://github.com/OshanKHZ",
        icon: "/icons/github.svg",
    },
];

export default function Hero() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section className="relative bg-background min-h-screen flex items-start justify-center pt-24 md:pt-32" id="hero">
            {/* Social Links - Bottom Left */}
            <motion.div
                className="fixed bottom-8 left-8 z-50 flex flex-col gap-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ opacity }}
            >
                {socialLinks.map((link, index) => (
                    <motion.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-center transition-all duration-300"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative size-8 group-hover:scale-110 transition-transform duration-300 opacity-60" style={{ filter: 'brightness(0) saturate(100%)' }}>
                            <Image
                                src={link.icon}
                                alt={link.name}
                                fill
                                className="object-contain text-foreground"
                                style={{ color: 'var(--foreground)' }}
                            />
                        </div>

                        {/* Tooltip */}
                        <span className="absolute left-full ml-4 px-3 py-1 bg-[#1E1C1B] text-primary text-sm font-mono uppercase tracking-wider rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 whitespace-nowrap">
                            {link.name}
                        </span>
                    </motion.a>
                ))}

                {/* Decorative Line with Circles */}
                <motion.div
                    className="flex flex-col items-center mt-4"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Top Circle */}
                    <div className="w-2 h-2 rounded-full bg-foreground opacity-60" />

                    {/* Vertical Line */}
                    <div className="w-px h-50 bg-foreground opacity-60" />

                    {/* Bottom Circle */}
                    <div className="w-2 h-2 rounded-full bg-foreground opacity-60" />
                </motion.div>
            </motion.div>

            <div className="max-w-container mx-auto px-6 w-full">
                <div className="grid grid-cols-12 gap-4">
                    <motion.div
                        className="col-span-12 md:col-start-2 md:col-span-5 flex flex-col justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <p className="text-2xl md:text-4xl lg:text-5xl font-semibold tracking-tight leading-[1.1] indent-12 md:indent-24 text-foreground">
                            Hello, my name is Lucas Oshan. I&apos;m a <span className="relative inline px-2 overflow-hidden">
                                <motion.span
                                    className="absolute inset-0 bg-primary/80"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 1,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    style={{ transformOrigin: 'left' }}
                                />
                                <span className="relative">Full Stack Developer</span>
                            </span> based in Rio de Janeiro, Brazil.
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
