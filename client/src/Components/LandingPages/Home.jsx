import React, { useEffect, useRef, useState } from "react";

const Home = () => {
  // Intro animation states
  const [showH1, setShowH1] = useState(false);
  const [showShapes, setShowShapes] = useState(false);
  const [shapesAtFinal, setShapesAtFinal] = useState(false);
  const [showLeftText, setShowLeftText] = useState(false);
  const [showRightText, setShowRightText] = useState(false);

  // Refs for mouse movement and smoothing
  const wrapperRef = useRef(null);
  const videoRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 }); // mouse target
  const currentRef = useRef({ x: 0, y: 0 }); // smoothed mouse position
  const rafRef = useRef(null);

  // Video scaling values
  const targetVideoScale = useRef(1);
  const currentVideoScale = useRef(1);

  // Bottom shape width animation
  const bottomShapeRef = useRef(null);
  const [bottomWidth, setBottomWidth] = useState(20); // starting width of bottom shape

  // -------------------- INTRO TIMELINE ---------------------
  useEffect(() => {
    const t1 = setTimeout(() => setShowH1(true), 200); // show logo
    const t2 = setTimeout(() => setShowShapes(true), 800); // start shapes
    const t3 = setTimeout(() => setShapesAtFinal(true), 1300); // shapes final rotation
    const t4 = setTimeout(() => setShowLeftText(true), 2500); // show left text
    const t5 = setTimeout(() => setShowRightText(true), 2900); // show right text

    // animate bottom shape width
    setTimeout(() => {
      setBottomWidth(110);
    }, 800);

    // Mouse move listener
    const handleMouse = (e) => {
      const range = 40;
      const x = (e.clientX / window.innerWidth - 0.5) * range; // convert to a small value range
      const y = (e.clientY / window.innerHeight - 0.5) * range;
      targetRef.current.x = x; // update mouse target
      targetRef.current.y = y;
    };

    // start listening to mouse after intro
    const startListen = setTimeout(() => {
      window.addEventListener("mousemove", handleMouse, { passive: true });
    }, 3000);

    return () => {
      // cleanup timeouts + listeners
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      window.removeEventListener("mousemove", handleMouse);
      clearTimeout(startListen);
    };
  }, []);

  // -------------------- SCROLL SCALE ---------------------
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // scale video based on scroll
      const scale = 1 + Math.min(scrollY / 600, 0.8);
      targetVideoScale.current = scale;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // -------------------- SMOOTH ANIMATION LOOP ---------------------
  useEffect(() => {
    const stiffness = 0.08; // follow speed
    const damping = 0.92; // slow-down smoothing

    const tick = () => {
      // Smooth mouse movement
      const cur = currentRef.current;
      const tar = targetRef.current;

      cur.x += (tar.x - cur.x) * stiffness;
      cur.y += (tar.y - cur.y) * stiffness;
      cur.x *= damping;
      cur.y *= damping;

      // Smooth video scaling
      currentVideoScale.current +=
        (targetVideoScale.current - currentVideoScale.current) * 0.1;

      // Shape parallax movement
      const tx = cur.x * 2;
      const ty = cur.y * 1.5;
      const rotX = cur.y * 0.08;
      const rotY = cur.x * 0.12;

      // Move the purple shapes
      if (wrapperRef.current) {
        wrapperRef.current.style.transform = shapesAtFinal
          ? `translate3d(${tx}px, ${ty}px, 0) rotateX(${rotX}deg) rotateY(${rotY}deg)`
          : "translate3d(0,0,0) rotateX(0deg) rotateY(0deg)";
      }

      // Move + rotate + scale the video
      if (videoRef.current) {
        const videoTx = cur.x * 5;
        const videoTy = cur.y * 5;
        const scale = currentVideoScale.current;
        const videoRotX = cur.y * 0.15;
        const videoRotY = cur.x * 0.15;

        videoRef.current.style.transform = `translate(-50%, -50%) translate3d(${videoTx}px, ${videoTy}px, 0) rotateX(${videoRotX}deg) rotateY(${videoRotY}deg) scale(${scale})`;
      }

      requestAnimationFrame(tick); // loop forever
    };

    requestAnimationFrame(tick);
  }, [shapesAtFinal]);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#EAE3DC]">
      
      {/* Background wrapper for shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <figure
          ref={wrapperRef}
          className="absolute w-full h-full aspect-square"
          style={{ willChange: "transform", transition: "none" }}
        >
          <div
            className="absolute top-1/2 left-1/2 translate-y-32 w-[max(115vw,115vh)] h-[max(120vw,120vh)] rounded-full overflow-hidden"
            style={{
              transform: shapesAtFinal
                ? "translate(-50%, -50%) rotate(40deg) scale(1)" // final shape position
                : showShapes
                ? "translate(-50%, -50%) rotate(-140deg) scale(0.3)" // mid animation
                : "translate(-50%, -50%) rotate(-140deg) scale(0)", // hidden
              opacity: showShapes ? 1 : 0,
              transition: shapesAtFinal
                ? "all 1.3s cubic-bezier(0.34, 1.56, 0.64, 1)" // bouncy effect
                : "opacity 0.4s ease-out",
              filter: "url(#goo)", // gooey effect
              backfaceVisibility: "hidden",
            }}
          >

            {/* TOP PURPLE SHAPE */}
            <div
              className="absolute left-0 bg-[#9C93E8]"
              style={{
                width: "max(110vw, 110vh)",
                height: "max(110vw, 110vh)",
                bottom: "max(50vw, 50vh)",
                clipPath: "polygon(40% 0, 75% 0, 51% 100%, 49% 100%)", // triangle shape
              }}
            />

            {/* BOTTOM PURPLE SHAPE (WIDTH ANIMATED) */}
            <div
              ref={bottomShapeRef}
              className="absolute left-0 bg-[#9C93E8]"
              style={{
                width: `${bottomWidth}vw`, // animated width
                height: "max(110vw, 110vh)",
                transition: "width 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)", // smooth width grow
                top: "max(50vw, 50vh)",
                clipPath: "polygon(49% 0, 51% 0, 180% 100%, -100% 100%)", // large angled shape
              }}
            />

          </div>
        </figure>
      </div>

      {/* HERO VIDEO */}
      <video
        ref={videoRef}
        src="/videos/Comp1.mp4"
        autoPlay
        loop
        muted
        className="absolute top-1/2 left-1/2 w-[27vw] rounded-[1.5vw] shadow-xl"
        style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
      />

      {/* LEFT TEXT */}
      <h5
        className="font-[secondaryregularfont] leading-[2.5vw] text-[3vw] mt-[4vw] ml-[4vw] absolute top-[20vw] z-10"
        style={{
          opacity: showLeftText ? 1 : 0, // fade in
          transform: showLeftText ? "translateY(0)" : "translateY(20px)", // slide up
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        Rise With <br /> Good Design
      </h5>

      {/* RIGHT TEXT */}
      <p
        className="font-[secondarylightfont] text-[1.5vw] absolute top-[22vw] right-[3vw] leading-[1.5vw] z-10"
        style={{
          opacity: showRightText ? 1 : 0, // fade in
          transform: showRightText ? "translateY(0)" : "translateY(20px)", // slide up
          transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        We build thoughtful brands and <br />
        digital experiences that make <br /> people stop, look, and remember.
      </p>

      {/* LOGO */}
      <div
        className="absolute bottom-[-1.5vw] left-1/2 w-[97vw] z-10 flex justify-center"
        style={{
          aspectRatio: "1856 / 266",
          mixBlendMode: "overlay",
          opacity: showH1 ? 1 : 0, // fade in
          transform: showH1
            ? "translateX(-50%) translateY(0)"
            : "translateX(-50%) translateY(40px)", // slide up
          transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <img
          src="/images/logo.svg"
          alt="hero-text"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Gooey filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="blur" /> {/* blur for goo */}
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 30 -15"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" /> {/* mix goo + graphic */}
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default Home;
