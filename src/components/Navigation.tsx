"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", target: "top" },
  { name: "About The Artist", target: "about" },
  { name: "Enchanting Performances", target: "story", offset: 0 },
  { name: "Production Experience", target: "story", offset: 1 },
  { name: "The Journey", target: "story", offset: 3 },
  { name: "Festivals & Stages", target: "story", offset: 5 },
  { name: "Connect", target: "story", offset: 6 },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (targetId: string, indexOffset?: number) => {
    setIsOpen(false);

    // Wait for the exit animation to fire before aggressively jumping the scroll bounds
    setTimeout(() => {
      const lenis = (window as any).lenis;

      if (targetId === "top") {
        lenis?.scrollTo(0, { duration: 2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        return;
      }

      const el = document.getElementById(targetId);
      if (el && lenis) {
        if (indexOffset !== undefined) {
          // Multiply offset by window height to mathematically sync with the 700vh OverlaySection bounds perfectly!
          const offset = el.offsetTop + (indexOffset * window.innerHeight);
          lenis.scrollTo(offset, { duration: 2.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        } else {
          lenis.scrollTo(el, { duration: 2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
        }
      }
    }, 600);
  };

  return (
    <>
      {/* Menu Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 right-8 z-50 mix-blend-difference text-white w-14 h-14 flex flex-col justify-center items-center gap-2 group hover:scale-110 transition-all duration-300"
      >
        <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "rotate-45 translate-y-[10px]" : "group-hover:w-10"}`} />
        <div className={`h-[2px] bg-white transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-6 group-hover:w-8"}`} />
        <div className={`w-8 h-[2px] bg-white transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-[10px]" : "group-hover:w-10"}`} />
      </button>

      {/* Fullscreen Backdrop Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { delay: 0.6 } }}
            className="fixed inset-0 z-40 bg-black/80 flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full max-w-4xl px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 60, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -40, filter: "blur(4px)" }}
                  transition={{
                    duration: 0.8,
                    delay: isOpen ? i * 0.1 : (navLinks.length - 1 - i) * 0.05,
                    ease: [0.16, 1, 0.3, 1]
                  }}
                  className="w-full text-center"
                >
                  <button
                    onClick={() => handleNav(link.target, link.offset)}
                    className="group relative text-2xl md:text-4xl lg:text-5xl font-bold tracking-tighter uppercase text-white/50 hover:text-white transition-all duration-500"
                  >
                    {/* Hover Italics Interaction */}
                    <span className="group-hover:italic group-hover:text-orange-400 group-hover:tracking-normal transition-all duration-500" style={{ fontFamily: "var(--font-playfair)" }}>
                      {link.name}
                    </span>

                    {/* Strikethrough Accent Line */}
                    <span className="absolute top-1/2 left-0 w-0 h-1 bg-orange-500 -translate-y-1/2 group-hover:w-full transition-all duration-700 ease-out" />
                  </button>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 font-mono text-[10px] tracking-[0.5em] text-white/30 uppercase"
            >
              Dhruval Solanki • Exploration
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
