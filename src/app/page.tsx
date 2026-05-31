export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-100">
      <svg aria-hidden="true" className="absolute" height="0" width="0">
        <filter id="paper">
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
      <div className="relative h-85 w-140">
        {/* Back wall */}
        <div className="absolute inset-x-0 h-55 rounded-t-4xl bg-[#1A1411] shadow-[inset_0_-160px_40px_rgba(0,0,0,0.5)]" />
        {/*Back wall shine*/}
        <div className="pointer-events-none absolute inset-x-10 top-3 h-12 rounded-full bg-[#493939]/20 blur-xl" />
        <div className="pointer-events-none absolute inset-x-6 bg-orange-100 rounded-3xl top-6 bottom-0 h-50 w-128"/>
        {/* Front pocket */}
        <div
          className="absolute inset-x-0 bottom-0 h-70 rounded-b-4xl bg-[#2C1E18] shadow-[inset_30px_-20px_40px_rgba(0,0,0,0.7),inset_-15px_-5px_40px_rgba(0,0,0,0.7),inset_0_3px_1px_rgba(116,70,54,1),inset_0px_4px_10px_rgba(0,0,0,1)]"
          style={{ filter: "url(#paper)" }}
        >
          <div className="pointer-events-none absolute inset-0 rounded-b-4xl bg-radial-[at_75%_25%] from-[#493939] to-transparent opacity-90" />
        </div>
        {/*Front Stiching Lines*/}
        <svg
          className="pointer-events-none absolute inset-0 z-50 h-full w-full"
          viewBox="0 0 560 340"
        >
          <title>Stiching lines</title>
          <filter
            height="140%"
            id="stitch-shadow"
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
            filter="url(#stitch-shadow)"
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
