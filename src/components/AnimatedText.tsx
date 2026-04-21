"use client";
import { motion } from "framer-motion";

export default function AnimatedText({
  text,
  highlights = [],
}: {
  text: string;
  highlights?: string[];
}) {
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { type: "spring" as const, damping: 14, stiffness: 100 },
    },
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(4px)",
      transition: { type: "spring" as const, damping: 14, stiffness: 100 },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="text-base md:text-lg text-gray-300 leading-relaxed font-sans"
    >
      {words.map((word, index) => {
        const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
        const isHighlight = highlights.some((h) =>
          cleanWord.toLowerCase() === h.toLowerCase()
        );

        return (
          <motion.span
            variants={child}
            key={index}
            className="inline-block mr-1.5 mb-1"
          >
            {isHighlight ? (
              <span
                className="inline-block font-bold text-orange-400 italic"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {word}
              </span>
            ) : (
              word
            )}
          </motion.span>
        );
      })}
    </motion.div>
  );
}
