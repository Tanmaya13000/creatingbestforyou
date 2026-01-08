// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";

// /* ===================== CARD 3D ===================== */

// const Card3D = ({ children, className }) => {
//   const cardRef = useRef(null);

//   const handleMouseMove = (e) => {
//     if (!cardRef.current) return;

//     const rect = cardRef.current.getBoundingClientRect();
//     const x = e.clientX - rect.left - rect.width / 2;
//     const y = e.clientY - rect.top - rect.height / 2;

//     const maxTilt = 20;

//     gsap.to(cardRef.current, {
//       rotateX: -(y / (rect.height / 2)) * maxTilt,
//       rotateY: (x / (rect.width / 2)) * maxTilt,
//       duration: 0.5,
//       ease: "power2.out",
//       transformPerspective: 1000,
//     });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(cardRef.current, {
//       rotateX: 0,
//       rotateY: 0,
//       duration: 0.8,
//       ease: "power3.out",
//     });
//   };

//   return (
//     <div
//       ref={cardRef}
//       className={className}
//       onMouseMove={handleMouseMove}
//       onMouseLeave={handleMouseLeave}
//       style={{ transformStyle: "preserve-3d" }}
//     >
//       {children}
//     </div>
//   );
// };

// /* ===================== MAIN PAGE ===================== */

// const Index = () => {
//   const shapeRef = useRef(null);
//   const sectionRef = useRef(null);
//   const [visible, setVisible] = useState(false);
//   const [introFinished, setIntroFinished] = useState(false);

//   const [screenSize, setScreenSize] = useState("lg");

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 640) setScreenSize("xs");
//       else if (window.innerWidth < 768) setScreenSize("sm");
//       else if (window.innerWidth < 1024) setScreenSize("md");
//       else setScreenSize("lg");
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   /* ---------- Intersection ---------- */
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => entry.isIntersecting && setVisible(true),
//       { threshold: 0.2 }
//     );

//     if (sectionRef.current) observer.observe(sectionRef.current);
//     return () => observer.disconnect();
//   }, []);

//   /* ---------- CLIP PATHS ---------- */
//   const getClipPaths = () => {
//     switch (screenSize) {
//       case "xs":
//         return {
//           start:
//             "polygon(60.75% 0%, 70.25% 0%, 52.26% 67.44%, 100% 150.5%, 100% 100%, 0% 100%, 0% 150.75%, 47.62% 67.44%)",
//           end: "polygon(40.75% 0%, 70.25% 0%, 52.26% 67.44%, 100% 70.5%, 100% 100%, 0% 100%, 0% 68.75%, 47.62% 67.44%)",
//         };
//       case "sm":
//         return {
//           start:
//             "polygon(49% 0%, 51% 0%, 50% 45%, 32% 100%, 52% 100%, 48% 100%, 38% 100%, 50% 45%)",
//           end: "polygon(40.75% 0%, 70.25% 0%, 52.26% 67.44%, 100% 70.5%, 100% 100%, 0% 100%, 0% 68.75%, 47.62% 67.44%)",
//         };
//       case "md":
//         return {
//           start:
//             "polygon(49% 0%, 51% 0%, 50% 45%, 32% 100%, 52% 100%, 48% 100%, 38% 100%, 50% 45%)",
//           end: "polygon(40.75% 0%, 70.25% 0%, 52.26% 67.44%, 100% 70.5%, 100% 100%, 0% 100%, 0% 68.75%, 47.62% 67.44%)",
//         };
//       default: // lg
//         return {
//           start:
//             "polygon(49% 0%, 51% 0%, 50% 45%, 32% 100%, 52% 100%, 48% 100%, 38% 100%, 50% 45%)",
//           end: "polygon(40.75% 0%, 53.25% 0%, 49.26% 56.44%, 100% 60.5%, 100% 100%, 0% 100%, 0% 58.75%, 47.62% 56.44%)",
//         };
//     }
//   };

//   const { start: startClip, end: endClip } = getClipPaths();

//   /* ---------- ENTRY ANIMATION ---------- */
//   useEffect(() => {
//     if (!visible || !shapeRef.current) return;

//     const tl = gsap.timeline({
//       defaults: {
//         ease: "power2.out",
//       },
//     });

//     // 1️⃣ SCALE IN (FAST)
//     tl.fromTo(
//       shapeRef.current,
//       {
//         scale: 0,
//         transformOrigin: "50% 50%",
//       },
//       {
//         scale: 1,
//         duration: 0.4,
//         ease: "power3.out",
//       }
//     );

//     // 2️⃣ CLIP PATH MORPH (OVERLAPPED)
//     tl.fromTo(
//       shapeRef.current,
//       {
//         clipPath: startClip,
//       },
//       {
//         clipPath: endClip,
//         duration: 1,
//         ease: "power2.inOut",
//       },
//       "-=0.2" // starts BEFORE scale finishes
//     );

//     // 3️⃣ ROTATION (SNAPS IN LAST)
//     tl.fromTo(
//       shapeRef.current,
//       {
//         rotate: -180,
//       },
//       {
//         rotate: 0,
//         duration: 1,
//         ease: "power2.out",
//       },
//       "-=0.25" // overlaps clip-path
//     ).call(() => {
//       setIntroFinished(true); // ✅ Trigger mouse animation after intro
//     });
//   }, [visible, startClip, endClip]);

//   /* ---------- MOUSE TILT ---------- */
//   const handleMouseMove = (e) => {
//     if (!introFinished) return;
//     const centerX = window.innerWidth / 2;
//     const centerY = window.innerHeight / 2;

//     const moveX = (e.clientX - centerX) / centerX; // -1 to 1
//     const moveY = (e.clientY - centerY) / centerY; // -1 to 1

//     const maxMoveX = 40; // horizontal movement
//     const maxMoveY = 30; // vertical movement
//     const maxTilt = 6; // rotation

//     gsap.to(shapeRef.current, {
//       x: moveX * maxMoveX,
//       y: moveY * maxMoveY + Math.abs(moveX) * 10, // slight downward bias
//       rotateZ: moveX * maxTilt,
//       duration: 2.6,
//       ease: "power3.out",
//     });
//   };

//   const handleMouseLeave = () => {
//     gsap.to(shapeRef.current, {
//       x: 0,
//       y: 0,
//       rotateZ: 0,
//       duration: 1.8,
//       ease: "power3.out",
//     });
//   };

//   return (
//     <div className="w-full h-full">
//       {/* ================= PAGE 1 ================= */}
//       <div
//         ref={sectionRef}
//         onMouseMove={handleMouseMove}
//         onMouseLeave={handleMouseLeave}
//         className="relative h-screen bg-[#F3EFEB] overflow-hidden"
//       >
//         <svg>
//           <defs>
//             <filter id="goo">
//               <feGaussianBlur
//                 in="SourceGraphic"
//                 stdDeviation="25"
//                 result="blur"
//               />
//               <feColorMatrix
//                 in="blur"
//                 mode="matrix"
//                 values="1 0 0 0 0
//                       0 1 0 0 0
//                       0 0 1 0 0
//                       0 0 0 35 -18"
//                 result="goo"
//               />
//               <feBlend in="SourceGraphic" in2="goo" />
//             </filter>
//           </defs>
//         </svg>
//         {/* SHAPE */}
//         <div className="absolute inset-0">
//           <div
//             className="absolute w-[160vw] h-[180vh] sm:w-[150vw] sm:h-[180vh] md:w-[150vw] md:h-[180vh] lg:w-[150vw] lg:h-[150vw]"
//             style={{
//               filter: "url(#goo)",
//               left: "65%",
//               top: "60%",
//               transform: "translate(-50%, -55%)",
//             }}
//           >
//             <div
//               ref={shapeRef}
//               className="absolute w-full h-full bg-[#9C93E8]"
//               style={{
//                 clipPath: endClip,
//                 filter: "url(#goo)",
//                 willChange: "transform, clip-path",
//               }}
//             />
//           </div>
//         </div>

//         <div className="absolute inset-0 flex justify-center md:justify-start items-center px-[10vw] ">
//           <p
//             className={` font-[secondaryboldfont] text-[4vw] md:text-[3vw] leading-[2.5vw]
//           transition-transform duration-[900ms] ${
//             visible ? "translate-y-0" : "translate-y-full"
//           }`}
//           >
//             Where creativity meets strategy to <br />
//             drive real-world results
//           </p>
//         </div>

//         <div
//           ref={sectionRef}
//           className="
//     absolute
//     bottom-[-1vw]
//     left-1/2
//     w-[93vw] sm:w-[95vw] md:w-[96vw]
//     max-w-[120vw]
//     z-10
//     flex
//     justify-center
//   "
//           style={{
//             aspectRatio: "1856 / 266",
//             mixBlendMode: "overlay",
//             opacity: visible ? 1 : 0,
//             transform: visible
//               ? "translateX(-50%) translateY(0)"
//               : "translateX(-50%) translateY(40px)",
//             transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
//           }}
//         >
//           <img
//             src="/images/logo.svg"
//             alt="hero-text"
//             className="w-full h-full object-contain transition-transform duration-[900ms] ease-out"
//           />
//         </div>

//         {/* GOO */}
//         <svg style={{ position: "absolute", width: 0, height: 0 }}>
//           <filter id="goo">
//             <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
//             <feColorMatrix
//               values="1 0 0 0 0
//                       0 1 0 0 0
//                       0 0 1 0 0
//                       0 0 0 35 -18"
//             />
//           </filter>
//         </svg>
//       </div>

//       {/* ================= PAGE 2 ================= */}
//       <div className="page2 w-full h-[137vh] bg-[#1E1E1E] flex flex-col pb-[5vh] pt-[10vh] px-[1vh] gap-[2vw] ">
//         <div className="w-full h-[25vw] text-[#FFFFFF] flex justify-between items-center ">
//           <div className="w-[27vw] h-full text-[#FFFFFF] flex justify-center items-center pl-[2vw] ">
//             <p className=" font-[sohnelight] leading-[1.5vw] text-[1.3vw]  ">
//               Every brand has a story worth telling. We shape that story through
//               thoughtful design, engaging content, and seamless technology —
//               turning ideas into experiences that build trust, spark emotion,
//               and drive real business results.
//             </p>
//           </div>
//           <div className="w-[43vw] h-full text-[#FFFFFF] flex justify-center items-center pt-[7vw] ">
//             <h1 className="font-[roxhead] text-[13vw] leading-[11vw] ">
//               Creativity That <br /> Drives Results
//             </h1>
//           </div>
//           <div className="w-[20vw] h-full text-[#FFFFFF] "></div>
//         </div>
//         <div className="w-full h-[78vh] flex justify-between items-center p-[2vw] ">
//           <Card3D className="card1 w-[30vw] h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[2vw] rounded-[2vw]">
//             <div className="w-full h-[13vw] flex justify-between items-center ">
//               <div className="w-[12vw] h-full  flex justify-start items-center ml-[1vw]">
//                 <h1 className="font-[roxhead] text-[10vw] text-[#1E1E1E] ">
//                   1
//                 </h1>
//               </div>
//               <div className="w-[14vw] h-full ">
//                 <p className=" font-[spacelight] text-[0.9vw] text-[#1E1E1E] ">
//                   We start with people, not platforms. Understanding human
//                   behavior shapes every design, message, and system we create —
//                   because meaningful experiences aren't just seen, they're felt
//                   and remembered.
//                 </p>
//               </div>
//             </div>
//             <div className="w-full h-[13vw] flex justify-start items-end ">
//               <h1 className="font-[primaryfont] text-[4vw] text-[#1E1E1E] ">
//                 {" "}
//                 Designed for People{" "}
//               </h1>
//             </div>
//           </Card3D>
//           <Card3D className="card2 w-[30vw] h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[2vw] rounded-[2vw]">
//             <div className="w-full h-[13vw] flex justify-between items-center ">
//               <div className="w-[12vw] h-full flex justify-start items-center ml-[1vw]">
//                 <h1 className="font-[roxhead] text-[10vw] text-[#1E1E1E] ">
//                   2
//                 </h1>
//               </div>
//               <div className="w-[14vw] h-full ">
//                 <p className=" font-[spacelight] text-[0.9vw] text-[#1E1E1E] ">
//                   No shortcuts. No empty trends. We blend strategic thinking
//                   with sharp creativity to deliver work that has clarity,
//                   purpose, and measurable impact — crafted to stand out and
//                   stand strong over time.
//                 </p>
//               </div>
//             </div>
//             <div className="w-full h-[13vw] flex justify-start items-end ">
//               <h1 className="font-[primaryfont] text-[4vw]  text-[#1E1E1E] ">
//                 Ideas With Purpose
//               </h1>
//             </div>
//           </Card3D>
//           <Card3D className="card3 w-[30vw] h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[2vw] rounded-[2vw]">
//             <div className="w-full h-[13vw] flex justify-between items-center ">
//               <div className="w-[12vw] h-full  flex justify-start items-center ml-[1vw]">
//                 <h1 className="font-[roxhead] text-[10vw] text-[#1E1E1E] ">
//                   3
//                 </h1>
//               </div>
//               <div className="w-[14vw] h-full ">
//                 <p className=" font-[spacelight] text-[0.9vw] text-[#1E1E1E] ">
//                   Nothing is accidental. From the first idea to the final
//                   execution, every detail is deliberate — aligned to flow
//                   seamlessly, perform flawlessly, and elevate the experience at
//                   every touchpoint.
//                 </p>
//               </div>
//             </div>
//             <div className="w-full h-[13vw] flex justify-start items-end ">
//               <h1 className="font-[primaryfont] text-[4vw] text-[#1E1E1E] ">
//                 {" "}
//                 Built to Perform{" "}
//               </h1>
//             </div>
//           </Card3D>
//         </div>
//       </div>
//       <div className="page3 w-full h-[50vh] bg-[#E0FF98] flex justify-center items-center ">
//         <h1 className="font-[roxhead] text-[6vw] leading-[4vw] text-center ">
//           Nobody is good - they're only good at showing they're good. <br /> and
//           that's where we come in.
//         </h1>
//       </div>
//     </div>
//   );
// };

// export default Index;

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Copy from "@/Components/TextAnimations/copy";

/* ===================== CARD 3D ===================== */

const Card3D = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const maxTilt = 20;

    gsap.to(cardRef.current, {
      rotateX: -(y / (rect.height / 2)) * maxTilt,
      rotateY: (x / (rect.width / 2)) * maxTilt,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000,
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

/* ===================== MAIN PAGE ===================== */

const Index = () => {
  const shapeRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);

  const [screenSize, setScreenSize] = useState("lg");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setScreenSize("xs");
      else if (window.innerWidth < 768) setScreenSize("sm");
      else if (window.innerWidth < 1024) setScreenSize("md");
      else setScreenSize("lg");
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* ---------- Intersection ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setVisible(true),
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* ---------- CLIP PATHS ---------- */
  const getClipPaths = () => {
    switch (screenSize) {
      case "xs":
        return {
          start:
            "polygon(60.75% 0%, 70.25% 0%, 52.26% 67.44%, 100% 150.5%, 100% 100%, 0% 100%, 0% 150.75%, 47.62% 67.44%)",
          end: "polygon(40.75% 0%, 70.25% 0%, 52.26% 67.44%, 100% 70.5%, 100% 100%, 0% 100%, 0% 68.75%, 47.62% 67.44%)",
        };
      case "sm":
        return {
          start:
            "polygon(49% 0%, 51% 0%, 50% 45%, 32% 100%, 52% 100%, 48% 100%, 38% 100%, 50% 45%)",
          end: "polygon(40.75% 0%, 70.25% 0%, 52.26% 67.44%, 100% 70.5%, 100% 100%, 0% 100%, 0% 68.75%, 47.62% 67.44%)",
        };
      case "md":
        return {
          start:
            "polygon(49% 0%, 51% 0%, 50% 45%, 32% 100%, 52% 100%, 48% 100%, 38% 100%, 50% 45%)",
          end: "polygon(40.75% 0%, 70.25% 0%, 52.26% 67.44%, 100% 70.5%, 100% 100%, 0% 100%, 0% 68.75%, 47.62% 67.44%)",
        };
      default: // lg
        return {
          start:
            "polygon(49% 0%, 51% 0%, 50% 45%, 32% 100%, 52% 100%, 48% 100%, 38% 100%, 50% 45%)",
          end: "polygon(40.75% 0%, 53.25% 0%, 49.26% 56.44%, 100% 60.5%, 100% 100%, 0% 100%, 0% 58.75%, 47.62% 56.44%)",
        };
    }
  };

  const { start: startClip, end: endClip } = getClipPaths();

  /* ---------- ENTRY ANIMATION ---------- */
  useEffect(() => {
    if (!visible || !shapeRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        ease: "power2.out",
      },
    });

    // 1️⃣ SCALE IN (FAST)
    tl.fromTo(
      shapeRef.current,
      {
        scale: 0,
        transformOrigin: "50% 50%",
      },
      {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      }
    );

    // 2️⃣ CLIP PATH MORPH (OVERLAPPED)
    tl.fromTo(
      shapeRef.current,
      {
        clipPath: startClip,
      },
      {
        clipPath: endClip,
        duration: 1,
        ease: "power2.inOut",
      },
      "-=0.2" // starts BEFORE scale finishes
    );

    // 3️⃣ ROTATION (SNAPS IN LAST)
    tl.fromTo(
      shapeRef.current,
      {
        rotate: -180,
      },
      {
        rotate: 0,
        duration: 1,
        ease: "power2.out",
      },
      "-=0.25" // overlaps clip-path
    ).call(() => {
      setIntroFinished(true); // ✅ Trigger mouse animation after intro
    });
  }, [visible, startClip, endClip]);

  /* ---------- MOUSE TILT ---------- */
  const handleMouseMove = (e) => {
    if (!introFinished) return;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (e.clientX - centerX) / centerX; // -1 to 1
    const moveY = (e.clientY - centerY) / centerY; // -1 to 1

    const maxMoveX = 40; // horizontal movement
    const maxMoveY = 30; // vertical movement
    const maxTilt = 6; // rotation

    gsap.to(shapeRef.current, {
      x: moveX * maxMoveX,
      y: moveY * maxMoveY + Math.abs(moveX) * 10, // slight downward bias
      rotateZ: moveX * maxTilt,
      duration: 2.6,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(shapeRef.current, {
      x: 0,
      y: 0,
      rotateZ: 0,
      duration: 1.8,
      ease: "power3.out",
    });
  };

  return (
    <div className="w-full h-full z-1000 ">
      {/* ================= PAGE 1 ================= */}
      <div
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-screen bg-[#F3EFEB] overflow-hidden"
      >
        <svg>
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="25"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 35 -18"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
        {/* SHAPE */}
        <div className="absolute inset-0">
          <div
            className="absolute w-[160vw] h-[180vh] sm:w-[150vw] sm:h-[180vh] md:w-[150vw] md:h-[180vh] lg:w-[150vw] lg:h-[150vw]"
            style={{
              filter: "url(#goo)",
              left: "65%",
              top: "60%",
              transform: "translate(-50%, -55%)",
            }}
          >
            <div
              ref={shapeRef}
              className="absolute w-full h-full bg-[#9C93E8]"
              style={{
                clipPath: endClip,
                filter: "url(#goo)",
                willChange: "transform, clip-path",
              }}
            />
          </div>
        </div>

        <div className="absolute inset-0 flex justify-center md:justify-start items-center px-[10vw] ">
          <Copy>
            <p
              className={` font-[secondaryboldfont] text-[4vw] md:text-[3vw] leading-[2.5vw]
                }`}
            >
              Where creativity meets strategy to <br />
              drive real-world results
            </p>
          </Copy>
        </div>

        <div
          className=" absolute bottom-[-1vw] left-1/2 w-[93vw] sm:w-[95vw] md:w-[96vw] max-w-[120vw] z-1000 flex justify-center"
          style={{
            aspectRatio: "1856 / 266",
            mixBlendMode: "overlay",
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateX(-50%) translateY(0)"
              : "translateX(-50%) translateY(40px)",
            transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <img
            src="/images/logo.svg"
            alt="hero-text"
            className="w-full h-full object-contain transition-transform duration-[900ms] ease-out"
          />
        </div>

        {/* GOO */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
            <feColorMatrix
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 35 -18"
            />
          </filter>
        </svg>
      </div>

      {/* ================= PAGE 2 ================= */}
      <div className="page2 w-full min-h-screen bg-[#1E1E1E] flex flex-col pb-[5vh] pt-[10vh] px-[4vw] gap-[6vw] lg:gap-[2vw] z-10000 ">
        {/* TOP SECTION */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-start lg:items-center gap-[6vw] lg:gap-0">
          <div className="w-full lg:w-[27vw] text-[#FFFFFF] flex justify-center items-center lg:pl-[2vw]">
            <Copy>
              <p className="font-[secondaryboldfont] leading-[5vw] lg:leading-[1.5vw] text-[4vw] lg:text-[1.3vw]">
                Every brand has a story worth telling. We shape that story through
                thoughtful design, engaging content, and seamless technology —
                turning ideas into experiences that build trust, spark emotion,
                and drive real business results.
              </p>
            </Copy>
          </div>
          <div className="w-full lg:w-[43vw] text-[#FFFFFF] flex justify-center items-center lg:pt-[7vw]">
            {/* <Copy> */}
            <h1 className="font-[roxhead] text-[18vw] lg:text-[13vw] leading-[15vw] lg:leading-[11vw] text-center lg:text-left">
              Creativity That Drives Results
            </h1>
            {/* </Copy> */}
          </div>
          <div className="hidden lg:block w-[20vw]" />
        </div>

        {/* CARDS SECTION */}
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-[6vw] lg:gap-0">
          {/* CARD 1 */}
          <Card3D className="w-full lg:w-[30vw]  lg:h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[6vw] lg:p-[2vw] rounded-[4vw] lg:rounded-[2vw]">
            <div className="w-full flex justify-between items-start">
              <h1 className="font-[roxhead] text-[18vw] lg:text-[10vw] text-[#1E1E1E]">
                1
              </h1>
              {/* <Copy> */}
                <p className="font-[spacelight] text-[3.5vw] lg:text-[0.9vw] bg-red-200 max-sm:mr-[2vw] text-[#1E1E1E] max-sm:w-[60%] w-[60%] lg:w-[14vw]">
                  We start with people, not platforms. Understanding human
                  behavior shapes every design, message, and system we create —
                  because meaningful experiences aren't just seen, they're felt
                  and remembered.
                </p>
              {/* </Copy> */}
            </div>
            <h1 className="font-[primaryfont] text-[7vw] lg:text-[4vw] text-[#1E1E1E] w-full text-left">
              Designed for People
            </h1>
          </Card3D>

          {/* CARD 2 */}
          <Card3D className="w-full lg:w-[30vw] lg:h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[6vw] lg:p-[2vw] rounded-[4vw] lg:rounded-[2vw]">
            <div className="w-full flex justify-between items-start">
              <h1 className="font-[roxhead] text-[18vw] lg:text-[10vw] text-[#1E1E1E]">
                2
              </h1>
              {/* <Copy> */}
                <p className="font-[spacelight] text-[3.5vw] lg:text-[0.9vw] text-[#1E1E1E] w-[60%] lg:w-[14vw]">
                  No shortcuts. No empty trends. We blend strategic thinking with
                  sharp creativity to deliver work that has clarity, purpose, and
                  measurable impact — crafted to stand out and stand strong over
                  time.
                </p>
              {/* </Copy> */}
            </div>
            <h1 className="font-[primaryfont] text-[7vw] lg:text-[4vw] text-[#1E1E1E] w-full text-left">
              Ideas With Purpose
            </h1>
          </Card3D>

          {/* CARD 3 */}
          <Card3D className="w-full lg:w-[30vw] lg:h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[6vw] lg:p-[2vw] rounded-[4vw] lg:rounded-[2vw]">
            <div className="w-full flex justify-between items-start">
              <h1 className="font-[roxhead] text-[18vw] lg:text-[10vw] text-[#1E1E1E]">
                3
              </h1>
              {/* <Copy> */}
                <p className="font-[spacelight] text-[3.5vw] lg:text-[0.9vw] text-[#1E1E1E] w-[60%] lg:w-[14vw]">
                  Nothing is accidental. From the first idea to the final
                  execution, every detail is deliberate — aligned to flow
                  seamlessly, perform flawlessly, and elevate the experience at
                  every touchpoint.
                </p>
              {/* </Copy> */}
            </div>
            <h1 className="font-[primaryfont] text-[7vw] lg:text-[4vw] text-[#1E1E1E] w-full text-left">
              Built to Perform
            </h1>
          </Card3D>
        </div>
      </div>

      <div className="page3 w-full h-[50vh] bg-[#E0FF98] flex justify-center items-center z-10000 ">
        <Copy>
          <h1 className="font-[roxhead] text-[7vw] leading-[6vw] text-center ">
            Nobody is good - they're only good at showing they're good. <br /> and
            that's where we come in.
          </h1>
        </Copy>
      </div>
    </div>
  );
};

export default Index;
