"use client";

import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

interface NavigationMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const links = [
    { label: "Home", href: "#", index: "01" },
    { label: "Skills", href: "#skills", index: "02" },
    { label: "Projects", href: "#projects", index: "03" },
    { label: "Contact", href: "#contact", index: "04" },
];

export function NavigationMenu({ isOpen, onClose }: NavigationMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[99] bg-transparent"
                    />

                    {/* Popover */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed top-12 right-4 md:right-6 z-[100] w-[calc(100vw-2rem)] max-w-xs min-h-[320px] flex flex-col justify-end items-start rounded-[2px] bg-[#aa532e] text-white shadow-[8px_8px_0_0_rgba(0,0,0,1)] p-6 border border-black origin-top-right"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 flex items-center gap-2 text-sm font-mono font-bold tracking-widest text-white hover:text-black transition-colors cursor-pointer"
                        >
                            <X size={20} strokeWidth={3} />
                            <span>CLOSE</span>
                        </button>

                        {/* Links Container */}
                        <div className="flex flex-col gap-0">
                            {links.map((link, i) => (
                                <motion.a
                                    key={i}
                                    href={link.href}
                                    onClick={onClose}
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: 0.1 + i * 0.05,
                                    }}
                                    className="group flex items-baseline text-4xl font-medium tracking-tight transition-all cursor-pointer leading-none"
                                >
                                    <span className="text-white group-hover:text-black transition-colors">
                                        {link.label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
