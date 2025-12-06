import React from "react";

const Home = () => {
  return (
    <div className="w-full h-screen relative overflow-hidden bg-red-400">
      <div
        className="absolute top-1/2 left-1/2 w-[max(110vw,110vh)] h-[max(110vw,110vh)] aspect-square z-0 "
        style={{
          transform: "translate(-50%, -50%) rotate(40deg)",
          willChange: "transform",
          backfaceVisibility: "hidden",
          filter: "url(#goo)",
        }}
      >
        {/* Top purple shape */}
        <div
          className="absolute left-0 w-[max(110vw,110vh)] h-[max(110vw,110vh)] aspect-square bg-[#9C93E8]"
          style={{
            bottom: "max(50vw, 50vh)",
            clipPath: "polygon(25% 0, 75% 0, 51% 100%, 49% 100%)",
            willChange: "transform",
          }}
        />

        {/* Bottom purple shape */}
        <div
          className="absolute left-0 w-[max(110vw,110vh)] h-[max(110vw,110vh)] aspect-square bg-[#9C93E8]"
          style={{
            top: "max(50vw, 50vh)",
            clipPath: "polygon(49% 0, 51% 0, 180% 100%, -100% 100%)",
            willChange: "transform",
          }}
        />
      </div>

      {/* SVG filter for goo effect */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Home;
