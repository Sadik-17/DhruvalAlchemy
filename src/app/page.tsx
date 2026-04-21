"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import OverlaySections from "@/components/OverlaySections";
import AnimatedText from "@/components/AnimatedText";

export default function Home() {

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <main>

      {/* SCROLL HERO */}
      <div ref={containerRef} className="relative w-full h-[300vh]">
        <ScrollyCanvas containerRef={containerRef} />
        <Overlay containerRef={containerRef} />
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="py-20 md:py-32 w-full px-6 md:px-10 grid md:grid-cols-2 gap-10 md:gap-20 items-center">

        <div className="relative w-full aspect-square md:h-[500px] overflow-hidden rounded-2xl shadow-2xl shadow-orange-500/20">
          <img
            src="IMG_9989.PNG"
            alt="Dhruval Solanki"
            loading="lazy"
            className="w-full h-full object-cover transition-all duration-700 hover:scale-110"
          />
        </div>

        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6">About the Artist</h2>

          <AnimatedText
            text="I am a dance artist and teacher specializing in Kalaripayattu and Indian Contemporary Dance, with foundational training in Bharatanatyam. Under the guidance of D. Padmakumar and Guru Smt. Maheshwari Nagarajan (NKK), My practice explores the connection between traditional martial arts and contemporary movement expression. I aim to continue learning and contributing to professional dance environments that explore the connection between traditional forms and contemporary movement. My goal is to grow as both an artist and educator while adding value to the company's creative vision and productions."
            highlights={[
              "Kalaripayattu",
              "Contemporary",
              "Bharatanatyam",
              "dance",
              "D",
              "Padmakumar",
              "Guru",
              "Smt",
              "Maheshwari",
              "Nagarajan",
              "NKK",
              "martial",
              "arts",
              "creative",
              "vision"
            ]}
          />
        </div>

      </section>

      {/* STORY SECTION */}
      <div id="story" className="w-full bg-[#121212]">
        <OverlaySections />
      </div>

    </main>
  );
}