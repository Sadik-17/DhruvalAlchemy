"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RefObject } from "react";

export default function Overlay({ containerRef }: { containerRef: RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Section 1: 0% to 20%
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

  // Section 2: 30% to 50%
  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45, 0.55], [0, 1, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.55], [100, -100]);

  // Section 3: 60% to 80%
  const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.75, 0.85], [0, 1, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.85], [100, -100]);

  // Section 4: 85% to 100% (Transition to next section)
  const opacity4 = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const y4 = useTransform(scrollYProgress, [0.8, 1], [100, 0]);

  return (
    <div className="pointer-events-none absolute left-0 top-0 w-full h-full z-10">
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        
        {/* Section 1 */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-6 text-center"
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-white mb-4">
            Dhruval Solanki.
          </h1>
          <p className="text-lg md:text-2xl text-white/80 font-light">
            Kalaripayattu Practitioner • Contemporary Dance & Movement Explorer.
          </p>
        </motion.div>

        {/* Section 2 */}
       <motion.div 
  style={{ opacity: opacity2, y: y2 }}
  className="absolute inset-0 flex flex-col items-start justify-center px-6 md:px-24"
>
  <h2 className="text-3xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-white via-purple-400 to-pink-400 bg-clip-text text-transparent max-w-2xl">
    I explore movement through Kalaripayattu and Contemporary Dance.
  </h2>
</motion.div>

        {/* Section 3 */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center px-6 md:px-24 text-right"
        >
          <h2 className="text-3xl md:text-6xl font-bold tracking-tight bg-linear-to-r from-white via-purple-400 to-pink-400 bg-clip-text text-transparent max-w-2xl">
  My style blends classical grace, martial arts energy, and dynamic stage presence.
</h2>
        </motion.div>

        {/* Section 4 */}
        <motion.div 
          style={{ opacity: opacity4, y: y4 }}
          className="absolute inset-x-0 bottom-24 flex flex-col items-center justify-center px-4"
        >
          <p className="text-lg text-white/60 uppercase tracking-[0.2em]">
            Keep Scrolling
          </p>
          <div className="w-px h-12 bg-white/30 mt-4 mx-auto" />
        </motion.div>

      </div>
    </div>
  );
}
