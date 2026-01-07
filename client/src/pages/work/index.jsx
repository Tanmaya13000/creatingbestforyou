import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Copy from "@/Components/TextAnimations/copy";

const index = () => {
  const clipRef = useRef(null);
  const isIntroDone = useRef(false);

  const [activeImage, setActiveImage] = useState(null);
  const overlayRef = useRef(null);
  const imageRef = useRef(null);
  const VideoOverlayRef = useRef(null);
  const videoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const clipPaths = {
    xl: "polygon(35% 0, 66% 0, 80% 100%, 20% 100%)",
    lg: "polygon(35% 0, 66% 0, 80% 100%, 20% 100%)",
    md: "polygon(35% 0, 66% 0, 80% 100%, 20% 100%)",
    sm: "polygon(35% 0, 66% 0, 80% 100%, 20% 100%)",
    xs: "polygon(30% 0, 70% 0, 85% 100%, 15% 100%)",
  };

  const openVideo = (src) => setActiveVideo(src);
  const closeVideo = () => setActiveVideo(null);

  useEffect(() => {
    if (activeImage) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, y: 40 },
        { scale: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [activeImage]);

  useEffect(() => {
    if (activeVideo) {
      gsap.fromTo(
        VideoOverlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );
      gsap.fromTo(
        videoRef.current,
        { scale: 0.8, y: 40 },
        { scale: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [activeVideo]);

  const getClipPathByWidth = () => {
    const width = window.innerWidth;
    if (width >= 1280) return clipPaths.xl;
    if (width >= 1024) return clipPaths.lg;
    if (width >= 768) return clipPaths.md;
    if (width >= 640) return clipPaths.sm;
    return clipPaths.xs;
  };

  const parseClipPath = (clipString) => {
    const points = clipString
      .replace("polygon(", "")
      .replace(")", "")
      .split(",")
      .map((p) => p.trim());
    return points.map((p) => p.split(" ").map(Number));
  };

  useEffect(() => {
    gsap.fromTo(
      clipRef.current,
      { clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)" },
      {
        clipPath: getClipPathByWidth(),
        duration: 1,
        ease: "power2.out",
        onComplete: () => {
          isIntroDone.current = true;
        },
      }
    );

    const handleResize = () => {
      if (isIntroDone.current) {
        gsap.to(clipRef.current, {
          clipPath: getClipPathByWidth(),
          duration: 0.8,
          ease: "power2.out",
        });
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isIntroDone.current) return;

      const container = clipRef.current.parentElement;
      const rect = container.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const width = rect.width;
      const percentX = mouseX / width;

      const left = 43 + percentX * (110 - 43);
      const right = -10 + percentX * (58 - -10);

      gsap.to(clipRef.current, {
        clipPath: `polygon(35% 0, 66% 0, ${left}% 100%, ${right}% 100%)`,
        duration: 2.5,
        ease: "power2.out",
      });
    };

    const container = clipRef.current.parentElement;
    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="w-full h-full">
      {/* ================= Page 1 ================= */}
      <div className="relative w-full h-screen flex flex-col">
        <img
          src="/Images/5.png"
          className="absolute w-full h-screen object-cover"
          alt=""
        />
        <div
          ref={clipRef}
          className="sunray absolute top-0 left-0 w-full h-full bg-[#E0FF98] z-10"
          style={{
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
          }}
        >
          <div className="w-full h-full flex flex-col justify-center gap-[10vw] lg:gap-[7vw] items-center py-20vw  ">
            <Copy delay={0.3} >
              <h1 className="text-center z-20 font-[primaryfont] text-[7vw] md:text-[5vw] p-6">
                Proof Over Promises
              </h1>
            </Copy>
            <Copy delay={0.3} >  
              <h6 className="bottom-[3vw] right-[3vw] z-20 font-normal text-[3vw] md:text-[2vw] leading-[3vw] md:leading-[2vw] text-center w-[45vw] md:w-[40vw]">
                In every great story, power isn’t claimed — it’s proven. This page
                is not about hype. It’s about capability. Each project below
                represents a problem faced, a strategy chosen, and a solution
                executed. Some are live projects, others are concept builds —
                created to demonstrate thinking, design depth, and execution
                quality. We believe ideas are worth nothing without structure. And
                structure is built through deliberate work.
              </h6>
            </Copy>
          </div>
        </div>
      </div>

      {/* ================= Page 2 ================= */}
      <div className=" relative w-full h-[100vh] md:h-screen bg-[#1F1F1F] flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16  ">
        <div className="w-full h-auto text-[#E0FF98] flex justify-center items-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
          <h1 className="font-[primaryfont] text-[7vw] sm:text-[8vw] md:text-[5vw] lg:text-[6vw] xl:text-[7vw] text-center">
            Work that speaks before we do
          </h1>
        </div>
        <div className="w-full flex flex-wrap items-center justify-center gap-[2vw]">
          <video
            autoPlay
            loop
            muted
            onClick={() => openVideo("/videos/v1.mp4")}
            className="w-[90%] sm:w-[50%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-[1vw] object-cover cursor-pointer"
            src="/videos/v1.mp4"
          ></video>
          <video
            autoPlay
            loop
            muted
            onClick={() => openVideo("/videos/v2.mp4")}
            className="w-[90%] sm:w-[50%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-[1vw] object-cover cursor-pointer"
            src="/videos/v2.mp4"
          ></video>
          <video
            autoPlay
            loop
            muted
            onClick={() => openVideo("/videos/v1.mp4")}
            className="w-[90%] sm:w-[50%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-[1vw] object-cover cursor-pointer"
            src="/videos/v1.mp4"
          ></video>
        </div>

        {activeVideo && (
          <div
            ref={VideoOverlayRef}
            className="absolute inset-0 flex justify-center items-center z-50"
            onClick={closeVideo}
            style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <video
                ref={videoRef}
                src={activeVideo}
                autoPlay
                loop
                className="max-w-[90vw] max-h-[80vh] rounded-[1vw] object-cover"
              ></video>
              <button
                onClick={closeVideo}
                className="absolute top-2 right-2 text-white bg-black bg-opacity-20 rounded-full w-10 h-10 flex justify-center items-center text-[1.5rem]"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= Page 3 ================= */}
      <div className="page3 w-full min-h-[70vh] bg-[#F3EFE9] flex flex-col justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 items-center p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16 z-[-10] ">
        <div className="w-full flex justify-center items-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="font-[primaryfont] text-[12vw] sm:text-[9vw] md:text-[6vw] lg:text-[4.5vw] xl:text-[7vw] text-[#DACEC1] text-center">
            Concept Projects
          </h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <h6 className="font-[galgo] text-[5vw] sm:text-[4vw] md:text-[3vw] lg:text-[2vw] xl:text-[3vw] text-[#DACEC1] leading-[4vw] sm:leading-[3vw] md:leading-[2vw] lg:leading-[2vw] xl:leading-[2vw] text-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[80%]">
            Not all battles are fought in public. Some are prepared in silence.
            Our concept work explores ideas for brands, startups, and industries
            — showcasing how we approach design, storytelling, and systems
            before the first client ever clicks “launch.” These concepts reflect
            how we think, not just what we deliver.
          </h6>
        </div>
      </div>

      {/* ================= Page 4 ================= */}
      <div className="relative w-full min-h-screen bg-[#E0FF98] flex flex-col justify-center gap-[4vw] p-4 sm:p-6 md:p-8 lg:p-12 xl:p-16">
        <div className="w-full flex justify-center items-center mb-4 sm:mb-6 md:mb-8">
          <h1 className="font-[primaryfont] text-[7vw] sm:text-[8vw] md:text-[6vw] lg:text-[4vw] xl:text-[3vw] text-center">
            A glimpse of what we’re capable of
          </h1>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 w-full">
          <img
            src="/Images/ps1.png"
            onClick={() => setActiveImage("/Images/ps1.png")}
            className="w-[90%] sm:w-[45%] md:w-[30%] lg:w-[27%] xl:w-[25%] mb-4 sm:mb-0"
            alt=""
          />
          <img
            src="/Images/ps2.png"
            onClick={() => setActiveImage("/Images/ps2.png")}
            className="w-[90%] sm:w-[45%] md:w-[30%] lg:w-[27%] xl:w-[25%] mb-4 sm:mb-0"
            alt=""
          />
          <img
            src="/Images/ps3.png"
            onClick={() => setActiveImage("/Images/ps3.png")}
            className="w-[90%] sm:w-[45%] md:w-[30%] lg:w-[27%] xl:w-[25%] mb-4 sm:mb-0"
            alt=""
          />
        </div>

        {activeImage && (
          <div
            ref={overlayRef}
            className="absolute inset-0 z-[999] bg-black/70 flex items-center justify-center"
            onClick={() => setActiveImage(null)}
          >
            <button
              className="absolute top-6 right-6 text-white text-[3vw] md:text-[2vw] lg:text-[1.5vw] hover:opacity-70 transition"
              onClick={() => setActiveImage(null)}
            >
              ✕
            </button>
            <img
              ref={imageRef}
              src={activeImage}
              onClick={(e) => e.stopPropagation()}
              className="block max-w-[90vw] max-h-[85vh] rounded-[1.5vw] shadow-2xl"
              alt=""
            />
          </div>
        )}
      </div>

      {/* ================= Page 5 ================= */}
      <div className="page5 w-full h-[100vh] md:h-screen bg-[#F3EFE9] flex flex-col justify-center gap-6 sm:gap-8 md:gap-10 items-center px-4 sm:px-6 md:px-10 lg:px-16 z-100 ">
        <div className="w-full flex justify-center items-center">
          <h1 className="font-[primaryfont] text-[#DACEC1] text-[11vw] sm:text-[10vw] md:text-[8vw] lg:text-[8vw] xl:text-[9vw] text-center">
            The Standard We Follow
          </h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <h6 className="font-[galgo] text-[#DACEC1] text-[9vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] xl:text-[7vw] leading-[8vw] sm:leading-[7vw] md:leading-[5vw] lg:leading-[5vw] xl:leading-[5vw] text-center w-full sm:w-[90%] md:w-[70%] lg:w-[60%]">
            Every layout serves a purpose. <br />
            Every motion carries meaning. <br />
            Every decision earns its place. <br />
            This is not decoration. <br />
            This is design with consequence.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default index;



// import React, { useEffect, useRef, useState } from "react";
// import { gsap } from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

// const index = () => {
//   const clipRef = useRef(null);
//   const isIntroDone = useRef(false);

//   const [activeImage, setActiveImage] = useState(null);
//   const overlayRef = useRef(null);
//   const imageRef = useRef(null);

//   const VideoOverlayRef = useRef(null);
//   const videoRef = useRef(null);

//   const page3Ref = useRef(null);
//   const page5ref = useRef(null);

//   const [activeVideo, setActiveVideo] = useState(null);

//   const clipPaths = {
//     xl: "polygon(35% 0, 66% 0, 80% 100%, 20% 100%)",
//     lg: "polygon(35% 0, 66% 0, 80% 100%, 20% 100%)",
//     md: "polygon(35% 0, 66% 0, 80% 100%, 20% 100%)",
//     sm: "polygon(35% 0, 66% 0, 80% 100%, 20% 100%)",
//     xs: "polygon(30% 0, 70% 0, 85% 100%, 15% 100%)",
//   };

//   const openVideo = (src) => setActiveVideo(src);
//   const closeVideo = () => setActiveVideo(null);

//   useEffect(() => {
//     if (activeImage) {
//       gsap.fromTo(
//         overlayRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 1, ease: "power2.out" }
//       );

//       gsap.fromTo(
//         imageRef.current,
//         { scale: 0.8, y: 40 },
//         { scale: 1, y: 0, duration: 1, ease: "power3.out" }
//       );
//     }
//   }, [activeImage]);

//   useEffect(() => {
//     if (activeVideo) {
//       gsap.fromTo(
//         VideoOverlayRef.current,
//         { opacity: 0 },
//         { opacity: 1, duration: 1, ease: "power2.out" }
//       );

//       gsap.fromTo(
//         videoRef.current,
//         { scale: 0.8, y: 40 },
//         { scale: 1, y: 0, duration: 1, ease: "power3.out" }
//       );
//     }
//   }, [activeVideo]);

//   const getClipPathByWidth = () => {
//     const width = window.innerWidth;
//     if (width >= 1280) return clipPaths.xl;
//     if (width >= 1024) return clipPaths.lg;
//     if (width >= 768) return clipPaths.md;
//     if (width >= 640) return clipPaths.sm;
//     return clipPaths.xs;
//   };

//   const parseClipPath = (clipString) => {
//     const points = clipString
//       .replace("polygon(", "")
//       .replace(")", "")
//       .split(",")
//       .map((p) => p.trim());

//     return points.map((p) => p.split(" ").map(Number));
//   };

//   useEffect(() => {
//     gsap.fromTo(
//       clipRef.current,
//       {
//         clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
//       },
//       {
//         clipPath: getClipPathByWidth(),
//         duration: 1,
//         ease: "power2.out",
//         onComplete: () => {
//           isIntroDone.current = true;
//         },
//       }
//     );

//     const handleResize = () => {
//       if (isIntroDone.current) {
//         gsap.to(clipRef.current, {
//           clipPath: getClipPathByWidth(),
//           duration: 0.8,
//           ease: "power2.out",
//         });
//       }
//     };

//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!isIntroDone.current) return;

//       const container = clipRef.current.parentElement;
//       const rect = container.getBoundingClientRect();
//       const mouseX = e.clientX - rect.left;
//       const width = rect.width;
//       const percentX = mouseX / width;

//       const left = 43 + percentX * (110 - 43);
//       const right = -10 + percentX * (58 - -10);

//       gsap.to(clipRef.current, {
//         clipPath: `polygon(35% 0, 66% 0, ${left}% 100%, ${right}% 100%)`,
//         duration: 2.5,
//         ease: "power2.out",
//       });
//     };

//     const container = clipRef.current.parentElement;
//     container.addEventListener("mousemove", handleMouseMove);
//     return () => container.removeEventListener("mousemove", handleMouseMove);
//   }, []);

//   useEffect(() => {
//     if (!page3Ref.current) return;

//     gsap.fromTo(
//       page3Ref.current,
//       { yPercent: -35 },
//       {
//         yPercent: 0,
//         ease: "none",
//         scrollTrigger: {
//           trigger: page3Ref.current,
//           start: "top bottom+=100",
//           end: "bottom bottom",
//           scrub: true,
//         },
//       }
//     );
//   }, []);

//   useEffect(() => {
//     if (!page5ref.current) return;

//     gsap.fromTo(
//       page5ref.current,
//       { yPercent: -100 },
//       {
//         yPercent: 0,
//         ease: "none",
//         scrollTrigger: {
//           trigger: page5ref.current,
//           start: "top bottom+=100",
//           end: "bottom bottom",
//           scrub: true,
//         },
//       }
//     );
//   }, []);

//   return (
//     <div className="w-full h-full">
//       {/* ================= Page 1 ================= */}
//       <div className="relative w-full h-screen flex flex-col">
//         <img
//           src="/Images/5.png"
//           className="absolute w-full h-screen object-cover"
//           alt=""
//         />

//         <div
//           ref={clipRef}
//           className="sunray absolute top-0 left-0 w-full h-full bg-[#E0FF98] z-10"
//           style={{
//             clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
//           }}
//         >
//           <div className="w-full h-full flex flex-col justify-center gap-[10vw] lg:gap-[7vw] items-center py-20vw">
//             <h1 className="text-center z-20 font-[primaryfont] text-[7vw] md:text-[5vw] p-6">
//               Proof Over Promises
//             </h1>

//             <h6 className="bottom-[3vw] right-[3vw] z-20 font-normal text-[3vw] md:text-[2vw] leading-[3vw] md:leading-[2vw] text-center w-[45vw] md:w-[40vw]">
//               In every great story, power isn’t claimed — it’s proven.
//             </h6>
//           </div>
//         </div>
//       </div>

//       {/* ================= Page 2 ================= */}
//       <div className="relative w-full h-[100vh] md:h-screen bg-[#1F1F1F] flex flex-col justify-center items-center p-4 z-10">
//         {/* content unchanged */}
//       </div>

//       {/* ================= Page 3 ================= */}
//       <div
//         ref={page3Ref}
//         className="page3 w-full min-h-[70vh] bg-[#F3EFE9] flex flex-col justify-center items-center p-4"
//       >
//         {/* content unchanged */}
//       </div>

//       {/* ================= Page 4 ================= */}
//       <div className="relative w-full min-h-screen bg-[#E0FF98] flex flex-col justify-center p-4 z-20">
//         {/* content unchanged */}
//       </div>

//       {/* ================= Page 5 ================= */}
//       <div className="overflow-hidden">
//         <div
//           ref={page5ref}
//           className="page5 w-full h-[70vh] md:h-screen bg-[#F3EFE9] flex flex-col justify-center items-center px-4"
//         >
//           <div className="page5 w-full h-[70vh] md:h-screen bg-[#F3EFE9] flex flex-col justify-center gap-6 sm:gap-8 md:gap-10 items-center px-4 sm:px-6 md:px-10 lg:px-16">
//             <div className="w-full flex justify-center items-center">
//               <h1 className="font-[primaryfont] text-[#DACEC1] text-[11vw] sm:text-[10vw] md:text-[8vw] lg:text-[8vw] xl:text-[9vw] text-center">
//                 The Standard We Follow
//               </h1>
//             </div>
//             <div className="w-full flex justify-center items-center">
//               <h6 className="font-[galgo] text-[#DACEC1] text-[9vw] sm:text-[8vw] md:text-[7vw] lg:text-[6vw] xl:text-[7vw] leading-[8vw] sm:leading-[7vw] md:leading-[5vw] lg:leading-[5vw] xl:leading-[5vw] text-center w-full sm:w-[90%] md:w-[70%] lg:w-[60%]">
//                 Every layout serves a purpose. <br />
//                 Every motion carries meaning. <br />
//                 Every decision earns its place. <br />
//                 This is not decoration. <br />
//                 This is design with consequence.
//               </h6>
//             </div>
//           </div>
//           {/* content unchanged */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default index;
