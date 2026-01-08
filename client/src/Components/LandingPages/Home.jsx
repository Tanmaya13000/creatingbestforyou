// import React, { useEffect, useState, useRef } from "react";
// import gsap from "gsap";

// const Home = () => {
//   // Intro animation states
//   const [showH1, setShowH1] = useState(false);
//   const [showLeftText, setShowLeftText] = useState(false);
//   const [showRightText, setShowRightText] = useState(false);
//   const [introFinished, setIntroFinished] = useState(false);
//   const sectionRef = useRef(null);
//   const [visible, setVisible] = useState(false);

//   // Runs when the component mounts
//   useEffect(() => {
//     // Creates an intersection observer to detect when the section enters viewport
//     const observer = new IntersectionObserver(
//       (entries) => {
//         // If the section is visible, set visible state to true
//         if (entries[0].isIntersecting) {
//           setVisible(true);
//         }
//       },
//       { threshold: 0.2 } // Section becomes "visible" when 20% of it is seen
//     );

//     // Start observing the section if the reference exists
//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     // Cleanup: stop observing when component unmounts
//     return () => {
//       if (sectionRef.current) observer.unobserve(sectionRef.current);
//     };
//   }, []);

//   // Ref for GSAP animated shape
//   const shapeRef = useRef(null);
//   const shapeRef2 = useRef(null);

//   // -------------------- INTRO TIMELINE ---------------------
//   useEffect(() => {
//     const t1 = setTimeout(() => setShowH1(true), 200); // show logo
//     const t2 = setTimeout(() => setShowLeftText(true), 2500); // show left text
//     const t3 = setTimeout(() => setShowRightText(true), 2900); // show right text

//     return () => {
//       clearTimeout(t1);
//       clearTimeout(t2);
//       clearTimeout(t3);
//     };
//   }, []);

//   // -------------------- SHAPE ANIMATION ---------------------
//   useEffect(() => {
//     // Initial state
//     gsap.set(shapeRef.current, {
//       scale: 0,
//       rotation: -180,
//       clipPath:
//         "polygon(73% 0%, 94% 0%, 52.5% 49.5%, 51.5% 50.5%, 27% 100%, 0% 100%, -10% 100%, 49% 48%, 49.5% 47%)",
//       transformOrigin: "50% 50%",
//     });

//     const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

//     // Scale in
//     tl.to(shapeRef.current, { scale: 1, duration: 1.2 });

//     // Clip-path morph, overlap smoothly
//     tl.to(
//       shapeRef.current,
//       {
//         clipPath:
//           "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 48%, 49.5% 47%)",
//         duration: 1.5,
//       },
//       "-=0.9"
//     );

//     // Rotation, overlapping perfectly
//     tl.to(shapeRef.current, { rotation: 0, duration: 1.2 }, "-=1.2").call(
//       () => {
//         setIntroFinished(true); // ✅ Trigger mouse animation after intro
//       }
//     );
//   }, []);

//   useEffect(() => {
//     // Initial state
//     gsap.set(shapeRef2.current, {
//       scale: 0,
//       rotation: -180,
//       clipPath:
//         "polygon(73% 0%, 94% 0%, 52.5% 49.5%, 51.5% 50.5%, 27% 100%, 0% 100%, -10% 100%, 49% 48%, 49.5% 47%)",
//       transformOrigin: "50% 50%",
//     });

//     const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

//     // Scale in
//     tl.to(shapeRef2.current, { scale: 1, duration: 1.2 });

//     // Clip-path morph, overlap smoothly
//     tl.to(
//       shapeRef2.current,
//       {
//         clipPath:
//           "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 48%, 49.5% 47%)",
//         duration: 1.5,
//       },
//       "-=0.9"
//     );

//     // Rotation, overlapping perfectly
//     tl.to(shapeRef2.current, { rotation: 0, duration: 1.2 }, "-=1.2").call(
//       () => {
//         setIntroFinished(true); // ✅ Trigger mouse animation after intro
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (!introFinished) return;
//     const handleMouseMove = (e) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 10; // rotation range
//       const y = (e.clientY / window.innerHeight - 0.5) * 40; // up/down movement

//       if (shapeRef.current) {
//         gsap.to(shapeRef.current, {
//           rotation: x,
//           y: y,
//           duration: 1.2,
//           ease: "power3.out",
//         });
//       }

//       if (shapeRef2.current) {
//         gsap.to(shapeRef2.current, {
//           rotation: x,
//           y: y,
//           duration: 1.2,
//           ease: "power3.out",
//         });
//       }
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => window.removeEventListener("mousemove", handleMouseMove);
//   }, [introFinished]);

//   return (
//     <div className="w-full h-screen relative overflow-hidden bg-[#EAE3DC]">
//       {/* GSAP Animated Shape */}
//       <svg style={{ position: "absolute", width: 0, height: 0 }}>
//         <defs>
//           <filter id="goo">
//             <feGaussianBlur
//               in="SourceGraphic"
//               stdDeviation="25"
//               result="blur"
//             />
//             <feColorMatrix
//               in="blur"
//               mode="matrix"
//               values="1 0 0 0 0
//                       0 1 0 0 0
//                       0 0 1 0 0
//                       0 0 0 35 -18"
//               result="goo"
//             />
//             <feBlend in="SourceGraphic" in2="goo" />
//           </filter>
//         </defs>
//       </svg>
//       <div
//         className="w-full h-full relative max-sm:hidden "
//         style={{ filter: "url(#goo)" }}
//       >
//         <div
//           ref={shapeRef}
//           className="absolute left-1/2 top-1/2 bg-[#9c93e8]"
//           style={{
//             width: "180vw",
//             height: "220vh",
//             transform: "translate(-50%, -50%)",
//             clipPath:
//               "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 48%, 49.5% 47%)",
//           }}
//         />
//       </div>
//       <div
//         className="w-full h-full relative min-sm:hidden "
//         style={{ filter: "url(#goo)" }}
//       >
//         <div
//           ref={shapeRef2}
//           className="absolute left-1/2 top-1/2 bg-[#9c93e8]"
//           style={{
//             width: "180vh",
//             height: "220vh",
//             transform: "translate(-50%, -50%)",
//             clipPath:
//               "polygon(88% -60%, 140% 0%, 54.5% 49.5%, 54.5% 50.5%, 100% 160%, 0% 100%, -10% 36%, 48% 50%, 49.5% 47%)",
//           }}
//         />
//       </div>

//       {/* HERO VIDEO */}

//       <video
//         src="/videos/Comp1.mp4"
//         autoPlay
//         loop
//         muted
//         className="absolute inset-0 top-1/2 left-1/2 w-[clamp(35vh,37vw,33vw)] rounded-[1.5vw] shadow-xl"
//         style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
//       />

//       {/* LEFT TEXT */}

//       <div className="absolute inset-0 flex items-start max-lg:pt-[30vh] lg:items-center justify-center lg:justify-start px-[2vw] ">
//         <h1 className="font-[secondaryboldfont] max-w-[15ch] text-left text-[clamp(3rem,4rem,2.3rem)] leading-[1] text-[#1E1E1E] ">
//           Rise With <br /> Good Design
//         </h1>
//       </div>
//       {/* RIGHT TEXT */}
//       <div className="absolute inset-0 flex items-center pt-[30vh] lg:pt-0 justify-center lg:justify-end px-[3vw]">
//         <p className="font-[secondarylightfont] max-w-[32ch] text-left lg:text-left text-[clamp(1.3rem,2.2vw,1.5rem)] leading-[1.2] text-[#1E1E1E] ">
//           We build thoughtful brands and <br />
//           digital experiences that make <br /> people stop, look, and remember.
//         </p>
//       </div>

//       {/* LOGO */}

//       <div
//         ref={sectionRef}
//         className="
//     absolute
//     bottom-[-1vw]
//     left-1/2
//     w-[93vw] sm:w-[95vw] md:w-[96vw]
//     max-w-[120vw]
//     z-10
//     flex
//     justify-center
//   "
//         style={{
//           aspectRatio: "1856 / 266",
//           mixBlendMode: "overlay",
//           opacity: visible ? 1 : 0,
//           transform: "translateX(-50%) translateY(0px)",
//         }}
//       >
//         <img
//           src="/images/logo.svg"
//           alt="hero-text"
//           className="w-full h-full object-contain "
//         />
//       </div>

//       {/* <div
//         className="absolute inset-0 items-center justify-center "
//         style={{
//           aspectRatio: "1856 / 266",
//           mixBlendMode: "overlay",
//           opacity: showH1 ? 1 : 0,
//           transform: showH1
//             ? "translateX(-50%) translateY(0)"
//             : "translateX(-50%) translateY(40px)",
//           transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1)",
//         }}
//       >
//         <img src="/images/logo.svg" alt="hero-text" className="" />
//       </div> */}

//       {/* Gooey filter */}
//       <svg style={{ position: "absolute", width: 0, height: 0 }}>
//         <defs>
//           <filter id="goo">
//             <feGaussianBlur
//               in="SourceGraphic"
//               stdDeviation="25"
//               result="blur"
//             />
//             <feColorMatrix
//               in="blur"
//               mode="matrix"
//               values="1 0 0 0 0
//                       0 1 0 0 0
//                       0 0 1 0 0
//                       0 0 0 35 -18"
//               result="goo"
//             />
//             <feBlend in="SourceGraphic" in2="goo" />
//           </filter>
//         </defs>
//       </svg>
//     </div>
//   );
// };

// export default Home;

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Home = () => {
  // Intro animation states
  const [showH1, setShowH1] = useState(false);
  const [showLeftText, setShowLeftText] = useState(false);
  const [showRightText, setShowRightText] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  // Runs when the component mounts
  useEffect(() => {
    // Creates an intersection observer to detect when the section enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // If the section is visible, set visible state to true
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 } // Section becomes "visible" when 20% of it is seen
    );

    // Start observing the section if the reference exists
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup: stop observing when component unmounts
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Ref for GSAP animated shape
  const shapeRef = useRef(null);
  const shapeRef2 = useRef(null);

  // -------------------- INTRO TIMELINE ---------------------
  useEffect(() => {
    const t1 = setTimeout(() => setShowH1(true), 200); // show logo
    const t2 = setTimeout(() => setShowLeftText(true), 2500); // show left text
    const t3 = setTimeout(() => setShowRightText(true), 2900); // show right text

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // -------------------- SHAPE ANIMATION ---------------------
  useEffect(() => {
    // Initial state
    gsap.set(shapeRef.current, {
      scale: 0,
      rotation: -180,
      clipPath:
        "polygon(73% 0%, 94% 0%, 52.5% 49.5%, 51.5% 50.5%, 27% 100%, 0% 100%, -10% 100%, 49% 48%, 49.5% 47%)",
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    // Scale in
    tl.to(shapeRef.current, { scale: 1, duration: 1.2 });

    // Clip-path morph, overlap smoothly
    tl.to(
      shapeRef.current,
      {
        clipPath:
          "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 48%, 49.5% 47%)",
        duration: 1.5,
      },
      "-=0.9"
    );

    // Rotation, overlapping perfectly
    tl.to(shapeRef.current, { rotation: 0, duration: 1.2 }, "-=1.2").call(
      () => {
        setIntroFinished(true); // ✅ Trigger mouse animation after intro
      }
    );
  }, []);

  useEffect(() => {
    // Initial state
    gsap.set(shapeRef2.current, {
      scale: 0,
      rotation: -180,
      clipPath:
        "polygon(73% 0%, 94% 0%, 52.5% 49.5%, 51.5% 50.5%, 27% 100%, 0% 100%, -10% 100%, 49% 48%, 49.5% 47%)",
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    // Scale in
    tl.to(shapeRef2.current, { scale: 1, duration: 1.2 });

    // Clip-path morph, overlap smoothly
    tl.to(
      shapeRef2.current,
      {
        clipPath:
          "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 48%, 49.5% 47%)",
        duration: 1.5,
      },
      "-=0.9"
    );

    // Rotation, overlapping perfectly
    tl.to(shapeRef2.current, { rotation: 0, duration: 1.2 }, "-=1.2").call(
      () => {
        setIntroFinished(true); // ✅ Trigger mouse animation after intro
      }
    );
  }, []);

  useEffect(() => {
    if (!introFinished) return;
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 10; // rotation range
      const y = (e.clientY / window.innerHeight - 0.5) * 40; // up/down movement

      if (shapeRef.current) {
        gsap.to(shapeRef.current, {
          rotation: x,
          y: y,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      if (shapeRef2.current) {
        gsap.to(shapeRef2.current, {
          rotation: x,
          y: y,
          duration: 1.2,
          ease: "power3.out",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [introFinished]);

  

  return (
    <div className="w-full h-screen relative overflow-hidden bg-[#EAE3DC]">
      {/* GSAP Animated Shape */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
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
      <div
        className="w-full h-full relative max-sm:hidden "
        style={{ filter: "url(#goo)" }}
      >
        <div
          ref={shapeRef}
          className="absolute left-1/2 top-1/2 bg-[#9c93e8]"
          style={{
            width: "180vw",
            height: "220vh",
            transform: "translate(-50%, -50%)",
            clipPath:
              "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 48%, 49.5% 47%)",
          }}
        />
      </div>
      <div
        className="w-full h-full relative min-sm:hidden "
        style={{ filter: "url(#goo)" }}
      >
        <div
          ref={shapeRef2}
          className="absolute left-1/2 top-1/2 bg-[#9c93e8]"
          style={{
            width: "180vh",
            height: "220vh",
            transform: "translate(-50%, -50%)",
            clipPath:
              "polygon(88% -60%, 140% 0%, 54.5% 49.5%, 54.5% 50.5%, 100% 160%, 0% 100%, -10% 36%, 48% 50%, 49.5% 47%)",
          }}
        />
      </div>

      {/* HERO VIDEO */}

      <video
        src="/videos/HomePage1/Comp1.mp4"
        autoPlay
        loop
        muted
        className="absolute inset-0 top-1/2 left-1/2 w-[clamp(35vh,37vw,33vw)] rounded-[1.5vw] shadow-xl"
        style={{ transform: "translate(-50%, -50%)", willChange: "transform" }}
      />

      {/* LEFT TEXT */}

      <div className="absolute inset-0 flex items-start max-lg:pt-[20vh] lg:items-center justify-center lg:justify-start px-[2vw] ">
        <h1 className="font-[secondaryboldfont] max-w-[15ch] text-left text-[clamp(3rem,4rem,2.3rem)] leading-[1] text-[#1E1E1E] ">
          Rise With <br /> Good Design
        </h1>
      </div>
      {/* RIGHT TEXT */}
      <div className="absolute inset-0 flex items-center pt-[40vh] lg:pt-0 justify-center lg:justify-end px-[3vw]">
        <p className="font-[secondarylightfont] max-w-[32ch] text-left lg:text-left text-[clamp(1.3rem,2.2vw,1.5rem)] leading-[1.2] text-[#1E1E1E] ">
          We build thoughtful brands and <br />
          digital experiences that make <br /> people stop, look, and remember.
        </p>
      </div>

      {/* LOGO */}

      <div
        ref={sectionRef}
        className="
    absolute
    bottom-[-1vw]
    left-1/2
    w-[93vw] sm:w-[95vw] md:w-[96vw]
    max-w-[120vw]
    z-10
    flex
    justify-center
  "
        style={{
          aspectRatio: "1856 / 266",
          mixBlendMode: "overlay",
          opacity: visible ? 1 : 0,
          transform: "translateX(-50%) translateY(0px)",
        }}
      >
        <img
          src="/images/HomePage1/logo.svg"
          alt="hero-text"
          className="w-full h-full object-contain "
        />
      </div>


      {/* Gooey filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
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
    </div>
  );
};

export default Home;



