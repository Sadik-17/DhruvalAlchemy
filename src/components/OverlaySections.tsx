"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState } from "react";

const YoutubeShortsPlayer = ({ videoId, className }: { videoId: string, className?: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [imgSrc, setImgSrc] = useState(`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`);

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&playsinline=1&rel=0`}
        title="YouTube Shorts"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className={`w-full h-full scale-[1.05] ${className || ""}`}
      ></iframe>
    );
  }

  return (
    <div
      className={`relative w-full h-full cursor-pointer group bg-black ${className || ""}`}
      onClick={() => setIsPlaying(true)}
    >
      <img
        src={imgSrc}
        alt="Play Video"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
        onError={() => {
          if (imgSrc.includes('maxresdefault')) {
            setImgSrc(`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`);
          } else if (imgSrc.includes('hqdefault')) {
            setImgSrc(`https://i.ytimg.com/vi/${videoId}/0.jpg`);
          }
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/30 transition-colors">
        <svg className="w-16 h-16 text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.615 10.422l-12.44-6.88A2 2 0 004.14 5.297v13.406a2 2 0 003.034 1.755l12.44-6.88a2 2 0 000-3.156z" />
        </svg>
      </div>
    </div>
  );
};

function FadeSection({
  children,
  index,
  total,
  progress,
}: {
  children: React.ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  // A gentle 5% fade point creates a perfect crossfade envelope without cutting off abruptly
  const fadePoint = 0.05;
  const isLast = index === total - 1;

  const opacity = useTransform(
    progress,
    [Math.max(0, start - fadePoint), start, end - fadePoint, end],
    [0, 1, 1, isLast ? 1 : 0]
  );

  const y = useTransform(
    progress,
    [Math.max(0, start - fadePoint), start, end - fadePoint, end],
    [30, 0, 0, isLast ? 0 : -30]
  );

  const pointerEvents = useTransform(opacity, (v) => v > 0.05 ? "auto" : "none");

  return (
    <motion.div
      style={{ opacity, y, pointerEvents, position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}

export default function OverlaySections() {
  const sectionCount = 7;
  const containerRef = useRef<HTMLDivElement>(null);

  // Track the scroll securely across the massive 700vh tall parent element
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="w-full relative" style={{ height: `${sectionCount * 100}vh` }}>
      {/* 
        This is the "sticky camera" that stays fixed onscreen 
        while you scroll through the 7 empty 100vh blocks behind it 
      */}
      <div className="sticky top-0 w-full h-screen overflow-hidden text-white flex flex-col bg-black">

        {/* Global Smoky Background for Seamless Experience */}
        <div className="absolute inset-0 pointer-events-none opacity-40 z-0">
          <img src="IMG_9892.png" loading="lazy" className="w-full h-full object-cover mix-blend-lighten" alt="Smoke" />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* SECTION 1: ENCHANTING PERFORMANCES */}
        <FadeSection index={0} total={sectionCount} progress={scrollYProgress}>
          <section className="relative w-full h-full flex items-start pt-20">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img src="IMG_9892.png" loading="lazy" className="w-full h-full object-cover" />
            </div>

            <div className="max-w-3xl relative z-10 ml-6 md:ml-16 mt-6 md:mt-10">
              <h2 className="text-4xl md:text-7xl font-serif font-bold whitespace-nowrap mb-8 uppercase tracking-tighter text-white">
                Enchanting <br /> Performances
              </h2>
              <ul className="space-y-2 border-l border-orange-500/50 pl-6">
                {["THEE", "MY WORLD", "MASK", "CELEBRATION", "ANVESHANAM", "MARKING THE SPACE", "STORM", "NADAI"].map((item) => (
                  <li key={item} className="text-sm md:text-base font-mono tracking-widest text-orange-400/90 uppercase hover:text-white transition-colors">
                    — {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </FadeSection>

        {/* SECTION 2: MAJOR PRODUCTION EXPERIENCE */}
        <FadeSection index={1} total={sectionCount} progress={scrollYProgress}>
          <section className="relative w-full h-full flex items-center px-6 md:px-16">
            <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center w-full">
              <div className="z-10 order-2 md:order-1 mt-4 md:mt-0">
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 md:mb-8 uppercase tracking-tighter text-white leading-none">
                  Major Production <br /> Experience
                </h2>
                <ul className="grid grid-cols-1 gap-y-3 border-l-2 border-orange-500 pl-6">
                  {["ANGAPRAVAH", "ADBHUTA", "MARU VAZHI", "SAMAY", "NADANAM", "YAATRA", "OH WOMANIYA", "A MOMENT IN STILLNESS"].map((item) => (
                    <li key={item} className="text-sm md:text-base font-mono tracking-widest text-orange-400/90 uppercase hover:text-white transition-all cursor-default">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative w-full h-64 md:h-150 overflow-hidden rounded-2xl shadow-2xl shadow-amber-400/60 order-1 md:order-2">
                <img
                  src="IMG_0130.PNG"
                  alt="Major Production"
                  loading="lazy"
                  className="w-full h-full bg-black object-cover transition-all z-1000 duration-700 hover:scale-110"
                />
              </div>
            </div>
          </section>
        </FadeSection>

        {/* SECTION 3: PROFESSIONAL ENTITLEMENTS */}
        <FadeSection index={2} total={sectionCount} progress={scrollYProgress}>
          <section className="relative w-full h-full flex items-start pt-20">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <img src="IMG_0128.png" loading="lazy" className="w-full h-full object-cover" />
            </div>

            <div className="max-w-4xl relative z-10 ml-6 md:ml-16 mt-6 md:mt-10">
              <h1 className="text-3xl md:text-6xl font-serif font-bold mb-6 md:mb-8 whitespace-nowrap uppercase tracking-tighter leading-none">
                Professional <br /> Entitlements
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div className="group">
                  <p className="text-black font-extrabold font-mono text-xs md:text-md tracking-[0.3em] mb-1">FACULTY & ARTIST</p>
                  <p className="text-lg md:text-2xl italic font-light text-gray-200 group-hover:text-white transition-all">
                    Pappan Dance Company – Performer Artist & Faculty
                  </p>
                </div>
                <div className="group">
                  <p className="text-black font-extrabold font-mono text-xs md:text-md tracking-[0.3em] mb-1">VISITING POSITION</p>
                  <p className="text-lg md:text-2xl italic font-light text-gray-200 group-hover:text-white transition-all">
                    Vijya Performing Arts – Visiting Faculty
                  </p>
                </div>
              </div>
            </div>
          </section>
        </FadeSection>

        {/* SECTION 4: THE JOURNEY */}
        <FadeSection index={3} total={sectionCount} progress={scrollYProgress}>
          <section className="relative w-full h-full flex items-start pt-24 md:pt-32">
            <div className="absolute inset-0 -z-10 overflow-hidden">
              <video src="IMG_9994.MP4" className="w-full h-full object-cover pointer-events-none" loop playsInline autoPlay muted preload="auto" />
            </div>
            <div className="max-w-2xl relative z-10 ml-6 md:ml-24 border-l-2 border-white pl-6 md:pl-8 mr-6">
              <h2 className="text-2xl md:text-3xl mb-4">THE JOURNEY</h2>
              <p className="text-base md:text-lg">
                With 9 years of experience as a performer and teacher,
                I have developed strong skills in choreography, creative production,
                and student training.
              </p>
            </div>
          </section>
        </FadeSection>

        {/* SECTION 5: FACULTY POSITIONS */}
        <FadeSection index={4} total={sectionCount} progress={scrollYProgress}>
          <section className="relative w-full h-full flex items-center px-6 md:px-20">
            <div className="grid md:grid-cols-2  md:gap-20 items-center w-full">
              {/* Text Area */}
              <div className="z-10 order-2 md:order-1 mt-4 md:mt-0">
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 md:mb-8 uppercase tracking-tighter text-white leading-none">
                  Faculty Positions
                </h2>
                <ul className="grid grid-cols-1 gap-y-3 border-l-2 border-orange-500 pl-6">
                  {["PAPPAN DANCE COMPANY", "VIJYA PERFORMING ARTS", "ANTYODAYA YOGA", "BHAVKUNJ SCHOOL (SVKM)", "PARAMPARA ACADEMY OF PERFORMING ARTS"].map((item) => (
                    <li key={item} className="text-sm md:text-base font-mono tracking-widest text-orange-400/90 uppercase hover:text-white transition-all cursor-default">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* YouTube Shorts Area */}
              <div className="flex justify-center md:justify-start md:ml-7 md:pl-20 lg:pl-20 w-full z-10 order-1 md:order-2">
                <div className="relative w-[280px] md:w-[350px] lg:w-[350px] aspect-9/16 overflow-hidden rounded-2xl shadow-2xl shadow-amber-400/60">
                  <YoutubeShortsPlayer videoId="ZxdqjeJQgog" />
                </div>
              </div>
            </div>
          </section>
        </FadeSection>

        {/* SECTION 6: FESTIVALS & STAGES */}
        <FadeSection index={5} total={sectionCount} progress={scrollYProgress}>
          <section className="relative w-full h-full flex items-center px-6 md:px-20">
            <div className="grid md:grid-cols-2 md:gap-20 items-center w-full">
              {/* New YouTube Shorts Area (Left Side) */}
              <div className="flex justify-center md:justify-end w-full z-10 order-1 relative md:pr-10">
                {/* Decorative off-axis background card */}
                <div className="absolute w-[280px] md:w-[350px] aspect-9/16 bg-linear-to-br from-orange-500/30 to-purple-600/30 rounded-2xl -rotate-6 blur-lg translate-x-4 translate-y-4"></div>
                <div className="relative w-[280px] md:w-[350px] aspect-9/16 overflow-hidden rounded-2xl shadow-xl border border-white/10 rotate-3 hover:rotate-0 transition-transform duration-500 z-10 bg-black">
                  <YoutubeShortsPlayer videoId="m_dFI8MyEec" />
                </div>
              </div>

              {/* Text Area (Right Side) */}
              <div className="z-10 order-2 mt-12 md:mt-0">
                <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 md:mb-8 uppercase tracking-tighter text-white leading-none">
                  Festivals & Stages <br /> Performed At
                </h2>
                <ul className="grid grid-cols-1 gap-y-3 border-l-2 border-orange-500 pl-6">
                  {[
                    "PAPPAN DANCE COMPANY (AHMEDABAD)",
                    "NID (AHMEDABAD)",
                    "PARAMPARA ACADEMY OF PERFORMING ARTS (AHMEDABAD)",
                    "IIM (AHMEDABAD)",
                    "NMACC INDIA (MUMBAI)",
                    "SAHYADRI SCHOOL KFI (PUNE)",
                    "ABHIVYAKTI CITY ARTS (AHMEDABAD)",
                    "BHAVKUNJ SCHOOL SVKM (KADI)",
                    "LDRP COLLEGE KADI (KSV)"
                  ].map((item) => (
                    <li key={item} className="text-sm md:text-base font-mono tracking-widest text-orange-400/90 uppercase hover:text-white transition-all cursor-default">
                      — {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </FadeSection>

        {/* SECTION 7: CONTACT / THE FINAL BOW */}
        <FadeSection index={6} total={sectionCount} progress={scrollYProgress}>
          <section className="relative w-full h-full flex items-center justify-center px-6 md:px-16 mx-auto">

            <div className="relative z-10 text-center max-w-4xl mt-12 md:mt-0 mx-auto w-full">
              <p className="text-orange-500 font-mono text-xs tracking-[0.5em] mb-4 uppercase">
                Available for Collaborations
              </p>

              <h2 className="text-5xl md:text-9xl font-serif font-bold mb-8 md:mb-12 uppercase tracking-tighter leading-none">
                Let's <br /> <span className="text-transparent stroke-text">Connect</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mx-auto w-full max-w-3xl justify-center">
                <a href="mailto:solankidhruval818@gmail.com" className="group relative p-6 md:p-8 border border-white/10 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-orange-500/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <p className="font-mono text-[10px] tracking-widest text-orange-500 mb-2 uppercase">Inquiry</p>
                  <p className="text-base md:text-lg font-serif">Email Me</p>
                </a>
                <a href="https://instagram.com/dhruval_solanki_official" target="_blank" className="group relative p-6 md:p-8 border border-white/10 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-orange-500/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <p className="font-mono text-[10px] tracking-widest text-orange-500 mb-2 uppercase">Updates</p>
                  <p className="text-base md:text-lg font-serif">Instagram</p>
                </a>
                <a href="https://youtube.com/@dhruvalsolanki2109" target="_blank" className="group relative p-6 md:p-8 border border-white/10 rounded-xl overflow-hidden hover:border-red-500/50 transition-all duration-500">
                  <div className="absolute inset-0 bg-red-500/5 -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                  <p className="font-mono text-[10px] tracking-widest text-red-500 mb-2 uppercase">Videos</p>
                  <p className="text-base md:text-lg font-serif">YouTube</p>
                </a>
              </div>

              <div className="mt-12 md:mt-20 flex flex-col items-center justify-center gap-8">
                <button
                  onClick={() => {
                    const lenis = (window as any).lenis;
                    lenis?.scrollTo(0, { duration: 2.5, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
                  }}
                  className="group flex flex-col items-center gap-3 overflow-hidden cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-orange-500 bg-black/50 group-hover:bg-orange-500 text-white/50 group-hover:text-white transition-all duration-500 backdrop-blur-sm">
                    <span className="transform group-hover:-translate-y-1 transition-transform duration-500 font-serif text-lg">↑</span>
                  </div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 group-hover:text-orange-400 transition-colors duration-500 uppercase">
                    Back to Top
                  </span>
                </button>

                <p className="align-bottom font-mono text-[8px] md:text-[10px] tracking-[0.3em] opacity-30 uppercase">
                  © 2026 Dhruval Solanki — Movement Artist
                </p>
              </div>
            </div>

            <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
              <div className="absolute inset-0 bg-black"></div>
              <motion.div
                animate={{ scale: [1, 1.2, 1], x: [0, 50, 0], opacity: [0.1, 0.4, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] left-[-10%] w-[60%] h-[80%] rounded-full bg-orange-600 blur-[120px] mix-blend-screen"
              />
              <motion.div
                animate={{ scale: [1, 1.5, 1], x: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-[-10%] right-[-10%] w-[70%] h-[70%] rounded-full bg-amber-500 blur-[150px] mix-blend-screen"
              />
              <motion.div
                animate={{ scale: [1, 1.3, 1], y: [0, 60, 0], opacity: [0.1, 0.35, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[30%] w-[50%] h-[60%] rounded-full bg-purple-600 blur-[130px] mix-blend-screen"
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[40px_40px]"></div>
              <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
              <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
            </div>

          </section>
        </FadeSection>

        <style jsx>{`
            .stroke-text {
              -webkit-text-stroke: 1px white;
            }
        `}</style>
      </div>
    </div>
  );
}