"use client";

import {
  motion as m,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sleeveRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  // 0 = card seated, 0.15 = peek, 1 = fully out
  const pullProgress = useMotionValue(0);

  const smoothProgress = useSpring(pullProgress, {
    stiffness: 200,
    damping: 25,
  });

  // ── Card transforms ──
  // Peek at 0.15, then full travel until the card clears the pocket top edge
  const cardY = useTransform(smoothProgress, [0, 0.15, 1], [0, -30, -290]);
  const cardRotate = useTransform(smoothProgress, [0, 1], [0, -1]);
  const cardScale = useTransform(smoothProgress, [0, 1], [1, 1.02]);

  // ── Sleeve transforms ──
  const sleeveY = useTransform(smoothProgress, [0, 1], [0, 10]);
  const sleeveScale = useTransform(smoothProgress, [0, 1], [1, 0.998]);

  // ── Shadow between card and sleeve ──
  const shadowOpacity = useTransform(
    smoothProgress,
    [0, 0.3, 1],
    [0, 0.15, 0.3]
  );
  const shadowY = useTransform(smoothProgress, [0, 1], [0, -100]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!sleeveRef.current) {
      return;
    }
    const rect = sleeveRef.current.getBoundingClientRect();
    // Mouse at bottom of sleeve = 0, at top of sleeve = 1, above = clamped to 1
    const fromBottom = rect.bottom - e.clientY;
    const normalized = fromBottom / rect.height;
    const clamped = Math.max(0.15, Math.min(1, normalized));
    pullProgress.set(clamped);
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    pullProgress.set(0.15);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    pullProgress.set(0);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100">
      {/* ── SVG Filters ── */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
        }}
      >
        <filter id="sleeve-paper">
          <feTurbulence
            baseFrequency="0.7"
            numOctaves="3"
            result="noise"
            stitchTiles="stitch"
            type="fractalNoise"
          />
          <feColorMatrix in="noise" result="grain" type="saturate" values="0" />
          <feBlend
            in="grain"
            in2="SourceGraphic"
            mode="overlay"
            result="blended"
          />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>

        <filter id="paper-grain">
          <feTurbulence
            baseFrequency="0.65"
            numOctaves="4"
            result="noise"
            stitchTiles="stitch"
            type="fractalNoise"
          />
          <feColorMatrix in="noise" result="grain" type="saturate" values="0" />
          <feComponentTransfer in="grain" result="boosted">
            <feFuncR intercept="-0.1" slope="1.2" type="linear" />
            <feFuncG intercept="-0.1" slope="1.2" type="linear" />
            <feFuncB intercept="-0.1" slope="1.2" type="linear" />
          </feComponentTransfer>
          <feBlend
            in="boosted"
            in2="SourceGraphic"
            mode="overlay"
            result="blended"
          />
          <feComposite in="blended" in2="SourceGraphic" operator="in" />
        </filter>
      </svg>

      {/* ── Interaction area ──
           pt-64 = invisible 256px zone above the sleeve
           so the mouse can travel upward (pulling the card)
           without leaving the hover area */}
      <div
        className="relative pt-64"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        ref={containerRef}
      >
        {/* ── Visual sleeve container ── */}
        <div
          className="relative h-85 w-140 drop-shadow-[0_24px_32px_rgba(0,0,0,0.4)]"
          ref={sleeveRef}
        >
          {/* Back wall */}
          <m.div
            className="absolute inset-x-0 bottom-28 h-52 rounded-t-3xl bg-[#1A1411] shadow-[inset_0_-160px_40px_rgba(0,0,0,0.5)]"
            style={{
              y: sleeveY,
              scale: sleeveScale,
            }}
          />

          {/* Back wall shine */}
          <m.div
            className="absolute inset-x-10 top-3 h-12 rounded-full bg-[#493939]/20 blur-xl"
            style={{
              y: sleeveY,
              scale: sleeveScale,
            }}
          />

          {/* Gap shadow */}
          <m.div
            className="pointer-events-none absolute inset-x-8 top-8 h-72 rounded-xl bg-black/40 blur-xl"
            style={{
              y: shadowY,
              opacity: shadowOpacity,
            }}
          />

          {/* ── Card ── mouse-driven */}
          <m.div
            className="absolute inset-x-6 top-10 h-72 w-lg rounded-xl bg-[#f5f0e4] shadow-[0_-4px_20px_rgba(0,0,0,0.1),inset_-0.5px_0.5px_2px_rgba(255,255,255,0.3)]"
            style={{
              y: cardY,
              rotate: cardRotate,
              scale: cardScale,
              zIndex: 10,
              filter: "url(#paper-grain)",
              transformOrigin: "center bottom",
            }}
          >
            {/* Laid paper lines */}
            <div
              className="pointer-events-none absolute inset-0 rounded-xl opacity-[0.07]"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  0deg,
                  #c0b49a,
                  #c0b49a 1px,
                  transparent 1px,
                  transparent 4px
                )`,
              }}
            />

            {/* Card content */}
            <div className="relative flex h-full items-end overflow-clip rounded-xl">
              <div
                className="absolute -bottom-20 left-14 flex -rotate-90 select-none flex-col font-extrabold leading-[0.85] tracking-tight"
                style={{
                  color: "#3a3530",
                  textShadow: `
                    0 -0.5px 0 rgba(255,245,230,0.5),
                    0 0.5px 1px rgba(0,0,0,0.15)
                  `,
                }}
              >
                <span className="text-8xl">Nice</span>
                <span className="text-8xl">to</span>
                <span className="text-8xl">Meet</span>
                <span className="text-8xl">You</span>
              </div>
            </div>
          </m.div>

          {/* ── Front pocket ── reacts subtly */}
          <m.div
            className="absolute inset-x-0 bottom-0 z-20 h-70 rounded-b-3xl bg-[#2C1E18] shadow-[inset_30px_-20px_40px_rgba(0,0,0,0.7),inset_-15px_-5px_40px_rgba(0,0,0,0.7),inset_0_3px_1px_rgba(116,70,54,1),inset_0px_4px_10px_rgba(0,0,0,1)]"
            style={{
              y: sleeveY,
              scale: sleeveScale,
              filter: "url(#sleeve-paper)",
            }}
          >
            <div className="absolute inset-0 rounded-b-3xl bg-radial-[at_75%_25%] from-[#493939] to-transparent opacity-90" />
          </m.div>

          {/* ── Stitching ── moves with sleeve */}
          <m.svg
            className="pointer-events-none absolute inset-0 z-50 h-full w-full"
            style={{
              y: sleeveY,
              scale: sleeveScale,
            }}
            viewBox="0 0 560 340"
          >
            <title>Stitching lines</title>
            <filter
              height="140%"
              id="sleeve-stitch-shadow"
              width="140%"
              x="-20%"
              y="-20%"
            >
              <feDropShadow
                dx="0"
                dy="1"
                floodColor="#0D0806"
                floodOpacity="0.8"
                stdDeviation="0.6"
              />
            </filter>
            <path
              d="M 15 70 L 15 310 Q 15 325 30 325 L 530 325 Q 545 325 545 310 L 545 70"
              fill="none"
              filter="url(#sleeve-stitch-shadow)"
              stroke="#412F2F"
              strokeDasharray="7 7"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </m.svg>
        </div>
      </div>
    </main>
  );
}
