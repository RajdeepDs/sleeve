"use client";

import { motion as m } from "motion/react";
import { useEffect, useState } from "react";

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(open);
  }, [open]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100">
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
          {/* This is the key — push the noise contrast */}
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
      <m.div
        animate={{
          y: open ? 2 : 0,
          scale: open ? 0.998 : 1,
        }}
        className="relative h-85 w-140 drop-shadow-[0_24px_32px_rgba(0,0,0,0.4)]"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* Back wall */}
        <div className="absolute inset-x-0 bottom-28 h-52 rounded-t-3xl bg-[#1A1411] shadow-[inset_0_-160px_40px_rgba(0,0,0,0.5)]" />
        {/* Back wall shine */}
        <div className="absolute inset-x-10 top-3 h-12 rounded-full bg-[#493939]/20 blur-xl" />
        {/* Card */}
        <m.div
          animate={{
            y: open ? -50 : 0,
            rotate: open ? -0.8 : 0,
            scale: open ? 1.01 : 1,
          }}
          className="absolute inset-x-6 top-10 h-72 w-lg rounded-xl bg-[#f5f0e4] shadow-[0_-4px_20px_rgba(0,0,0,0.1),inset_-0.5px_0.5px_2px_rgba(255,255,255,0.3)]"
          initial={false}
          style={{ filter: "url(#paper-grain)" }}
          transition={
            open
              ? {
                  type: "spring",
                  stiffness: 200,
                  damping: 24,
                  mass: 1.2,
                  // mass adds weight — the card feels like it has substance
                }
              : {
                  type: "spring",
                  stiffness: 400,
                  damping: 28,
                  mass: 0.8,
                }
          }
        >
          {/* Laid lines */}
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

          {/* Name */}
          <div className="relative flex h-full items-end overflow-clip">
            <div
              className="absolute -bottom-20 left-14 flex -rotate-90 flex-col font-extrabold leading-[0.85] tracking-tight"
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
        {/* Front pocket */}
        <div
          className="absolute inset-x-0 bottom-0 h-70 rounded-b-3xl bg-[#2C1E18] shadow-[inset_30px_-20px_40px_rgba(0,0,0,0.7),inset_-15px_-5px_40px_rgba(0,0,0,0.7),inset_0_3px_1px_rgba(116,70,54,1),inset_0px_4px_10px_rgba(0,0,0,1)]"
          style={{ filter: "url(#sleeve-paper)" }}
        >
          <div className="absolute inset-0 rounded-b-3xl bg-radial-[at_75%_25%] from-[#493939] to-transparent opacity-90" />
        </div>
        {/* Front stitching lines */}
        <svg
          className="pointer-events-none absolute inset-0 z-50 h-full w-full"
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
            d="M 15 70 L 15 310 Q 15 325 30 325 L 530 325 Q 545 325 545 310 L 545 70 "
            fill="none"
            filter="url(#sleeve-stitch-shadow)"
            stroke="#412F2F"
            strokeDasharray="7 7"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>
      </m.div>
    </main>
  );
}
