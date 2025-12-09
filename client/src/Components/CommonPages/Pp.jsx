import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  const [showH1, setShowH1] = useState(false);
  const [showShapes, setShowShapes] = useState(false);
  const [shapesAtFinal, setShapesAtFinal] = useState(false);
  const [showLeftText, setShowLeftText] = useState(false);
  const [showRightText, setShowRightText] = useState(false);

  const wrapperRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);

  // -------------------- INTRO ANIM ---------------------
  useEffect(() => {
    const t1 = setTimeout(() => setShowH1(true), 200);
    const t2 = setTimeout(() => setShowShapes(true), 800);
    const t3 = setTimeout(() => setShapesAtFinal(true), 1300);
    const t4 = setTimeout(() => setShowLeftText(true), 2500);
    const t5 = setTimeout(() => setShowRightText(true), 2900);

    const handleMouse = (e) => {
      const range = 80;
      const x = (e.clientX / window.innerWidth - 0.5) * range;
      const y = (e.clientY / window.innerHeight - 0.5) * range;
      targetRef.current.x = x;
      targetRef.current.y = y;
    };

    const startListen = setTimeout(() => {
      window.addEventListener("mousemove", handleMouse, { passive: true });
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(startListen);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  // -------------------- SMOOTH MOTION LOOP ---------------------
  useEffect(() => {
    const stiffness = 0.08;
    const damping = 0.92;

    const tick = () => {
      const cur = currentRef.current;
      const tar = targetRef.current;

      cur.x += (tar.x - cur.x) * stiffness;
      cur.y += (tar.y - cur.y) * stiffness;

      cur.x *= damping;
      cur.y *= damping;

      const tx = cur.x * 2.2;
      const ty = cur.y * 2.2;
      const rot = cur.x * 0.12;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = shapesAtFinal
          ? `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`
          : "translate3d(0,0,0) rotate(0deg)";
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [shapesAtFinal]);

  // ---------------------------------------------------

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#EAE3DC]">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* MOVING WRAPPER */}
        <figure
          ref={wrapperRef}
          className="absolute w-full h-full aspect-square"
          style={{
            willChange: "transform",
            transition: "none",
          }}
        >
          {/* MASK FIX: hides all ugly clipped edges */}
          <div
            className="absolute top-1/2 left-1/2 w-[max(110vw,110vh)] h-[max(110vw,110vh)] rounded-full overflow-hidden"
            style={{
              transform: shapesAtFinal
                ? "translate(-50%, -50%) rotate(40deg) scale(1)"
                : showShapes
                ? "translate(-50%, -50%) rotate(-140deg) scale(0.3)"
                : "translate(-50%, -50%) rotate(-140deg) scale(0)",
              opacity: showShapes ? 1 : 0,
              transition: shapesAtFinal
                ? "all 1.3s cubic-bezier(0.34, 1.56, 0.64, 1)"
                : "opacity 0.4s ease-out",
              filter: "url(#goo)",
              backfaceVisibility: "hidden",
            }}
          >
            {/* YOUR ORIGINAL PURPLE SHAPE (unchanged) */}
            <div
              className="absolute left-0 w-[max(110vw,110vh)] h-[max(110vw,110vh)] bg-[#9C93E8]"
              style={{
                bottom: "max(50vw, 50vh)",
                clipPath: "polygon(25% 0, 75% 0, 51% 100%, 49% 100%)",
              }}
            />

            <div
              className="absolute left-0 w-[max(110vw,110vh)] h-[max(110vw,110vh)] bg-[#9C93E8]"
              style={{
                top: "max(50vw, 50vh)",
                clipPath: "polygon(49% 0, 51% 0, 180% 100%, -100% 100%)",
              }}
            />
          </div>
        </figure>
      </div>

      {/* Left text */}
      <h5
        className="font-[secondaryregularfont] leading-[2.5vw] text-[3vw] mt-[4vw] ml-[4vw] absolute top-[20vw] z-10"
        style={{
          opacity: showLeftText ? 1 : 0,
          transform: showLeftText ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        Rise With <br /> Good Design
      </h5>

      {/* Right text */}
      <p
        className="font-[secondarylightfont] text-[1.5vw] absolute top-[22vw] right-[3vw] leading-[1.5vw] z-10"
        style={{
          opacity: showRightText ? 1 : 0,
          transform: showRightText ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        We build thoughtful brands and <br />
        digital experiences that make <br /> people stop, look, and remember.
      </p>

      {/* Bottom H1 Logo */}
      <div
        className="absolute bottom-[-1.5vw] left-1/2 w-[97vw] z-10 flex justify-center"
        style={{
          aspectRatio: "1856 / 266",
          mixBlendMode: "overlay",
          opacity: showH1 ? 1 : 0,
          transform: showH1
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(40px)",
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src="/images/logo.svg"
          alt="hero-text"
          className="w-full h-full object-contain"
        />
      </div>

      {/* SVG goo filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 30 -15"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Home;
