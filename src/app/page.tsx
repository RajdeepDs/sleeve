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
      </svg>
      <div
        className="relative h-85 w-140 drop-shadow-[0_24px_32px_rgba(0,0,0,0.4)]"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Back wall */}
        <div className="absolute inset-x-0 bottom-28 h-52 rounded-t-3xl bg-[#1A1411] shadow-[inset_0_-160px_40px_rgba(0,0,0,0.5)]" />
        {/* Back wall shine */}
        <div className="absolute inset-x-10 top-3 h-12 rounded-full bg-[#493939]/20 blur-xl" />
        {/* Card */}
        <m.div
          animate={{ y: open ? -40 : 0 }}
          className="absolute inset-x-6 top-10 h-72 w-lg rounded-xl bg-[#f5f0e4] p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.1),inset_-0.5px_0.5px_2px_rgba(255,255,255,0.3)]"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          {" "}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage: `
                     radial-gradient(
                       circle,
                       rgba(199,192,176,0.9) 1px,
                       transparent 1px
                     )
                   `,
              backgroundSize: "14px 14px",

              maskImage: `
                radial-gradient(
                  ellipse at 25% 35%,
                  black 0%,
                  black 25%,
                  transparent 60%
                ),
                radial-gradient(
                  ellipse at 95% 50%,
                  black 0%,
                  black 20%,
                  transparent 50%
                )
              `,
            }}
          />
          <div className="flex h-full items-end">
            <h1 className="font-bold text-4xl">RAJDEEP</h1>
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
      </div>
    </main>
  );
}
