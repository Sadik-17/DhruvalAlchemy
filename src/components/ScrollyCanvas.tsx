"use client";

import { useEffect, useRef, useState, RefObject } from "react";
import { useScroll, useMotionValueEvent, useSpring } from "framer-motion";

const FRAME_COUNT = 192;

const currentFrame = (index: number) =>
  `/sequence/frame_${index.toString().padStart(3, "0")}_delay-0.041s.png`;

export default function ScrollyCanvas({
  containerRef,
}: {
  containerRef: RefObject<HTMLDivElement | null>;
}) {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 90,
  });

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        setImagesLoaded(loadedCount);
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  const drawImage = (index: number) => {
    if (images.length === 0 || !images[index]) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const img = images[index];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const isMobile = window.innerWidth < 768;

    const scaleByWidth = canvas.width / img.width;
    const scaleByHeight = canvas.height / img.height;

    // Start with cover size logic
    let scale = Math.max(scaleByWidth, scaleByHeight);

    if (isMobile) {
      // Zoom out significantly on mobile so the sides of the video aren't cropped out,
      // revealing the dancer's horizontal movements.
      scale *= 0.65;
    } else {
      // Apply the 10% zoom on desktop to crop out edge watermarks (like Veo)
      scale *= 1.1;
    }

    const drawWidth = img.width * scale;
    const drawHeight = img.height * scale;

    // Recalculate offsets so the image stays perfectly centered
    const offsetX = (canvas.width - drawWidth) / 2;
    const offsetY = (canvas.height - drawHeight) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useEffect(() => {
    if (images.length > 0 && imagesLoaded > 0) {
      drawImage(Math.round(smoothProgress.get() * (FRAME_COUNT - 1)));
    }

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && imagesLoaded > 0) {
        drawImage(Math.round(smoothProgress.get() * (FRAME_COUNT - 1)));
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, images, smoothProgress]);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const maxFrameIndex = FRAME_COUNT - 1;
    const frameIndex = Math.min(
      maxFrameIndex,
      Math.max(0, Math.floor(latest * maxFrameIndex))
    );
    requestAnimationFrame(() => drawImage(frameIndex));
  });

  return (
    <div className="absolute inset-0 z-0">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#121212]">
        {imagesLoaded < FRAME_COUNT && (
          <div className="absolute inset-0 flex items-center justify-center z-50 bg-[#121212] text-white/50 text-sm font-light tracking-widest uppercase">
            Loading Sequence {Math.round((imagesLoaded / FRAME_COUNT) * 100)}%
          </div>
        )}
        <canvas className="w-full h-full object-cover" ref={canvasRef} />
      </div>
    </div>
  );
}
