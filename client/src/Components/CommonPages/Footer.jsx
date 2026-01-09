import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Copy from "../TextAnimations/copy";
gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  // Stores the mouse X position (Y will be locked)
  const [mouseX, setMouseX] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [startX, setStartX] = useState(0);
  const textRef = useRef(null);
  // const ContainerRef = useRef(null);
  const footerRef = useRef(null);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!textRef.current || !containerRef.current) return;

    const touchX = e.touches[0].clientX;
    const deltaX = touchX - startX;

    const textWidth = textRef.current.offsetWidth;
    const containerWidth = containerRef.current.offsetWidth;

    // Text is initially centered
    const maxX = textWidth / 2 - containerWidth / 2; // rightmost
    const minX = -(textWidth / 2 - containerWidth / 2); // leftmost

    setDragX((prev) => {
      const next = prev + deltaX;
      return Math.max(Math.min(next, maxX), minX);
    });

    setStartX(touchX);
  };

  // Handle mouse movement on FULL PAGE
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Only move X → left to right
    setMouseX(e.clientX - rect.left);
  };

  // useEffect(() => {
  //   let triggerInstance;
  //   ScrollTrigger.create({
  //     trigger: containerRef.current,
  //     start: "top bottom",
  //     end: "top top",
  //     scrub: true,
  //     onUpdate: (self) => {
  //       const progress = self.progress;
  //       const yValue = -100 * (1 - progress);
  //       gsap.set(footerRef.current, { y: `${yValue}%` });

  //     }
  //   });
  //   return () => {
  //     if (triggerInstance) triggerInstance.kill(); // ✅ safe kill
  //   };
  // }, [])

  return (
    <div
      ref={containerRef}
      className="w-full h-full "
      onMouseMove={handleMouseMove} // ← hover anywhere on page
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)} // <-- no mouseX reset
    >
      <div ref={footerRef} className="relative w-full h-screen bg-[#1E1E1E]  overflow-hidden z--100">
        {/* ---------------- TOP SECTION (70%) ---------------- */}
        <div className="w-full h-[70%] flex flex-col lg:flex-row justify-center items-center p-[4vw] text-white gap-[6vw] lg:gap-0">
          {/* LEFT SECTION */}
          <div className="w-full lg:w-[60%] h-full max-sm:mt-[20vw] flex justify-center lg:justify-start">
            <Copy>
              <h3
                className="font-[secondaryregularfont]  leading-[8vw] sm:leading-[5vw] lg:leading-[2.5vw] text-[8vw] sm:text-[5vw] lg:text-[3vw] text-center lg:text-left mt-[2vw] lg:mt-[4vw] lg:ml-[4vw]"
              >
                Rise With <br /> Good Design
              </h3>
            </Copy>
          </div>

          {/* RIGHT SECTION */}
          <div className="w-full lg:w-[40%] h-full flex flex-col sm:flex-row gap-[6vw] sm:gap-[4vw] mt-[6vw] lg:mt-0">
            {/* EXPLORE */}
            <div className="w-full sm:w-[50%] flex sm:flex-col max-sm:gap-[7vh]">
              <h5
                className="font-[primaryfont] text-[9vw] max-sm:w-[23vw] sm:text-[7vw] md:text-[7vw] lg:text-[4vw]  mb-[2vw]"
              >
                EXPLORE
              </h5>

              {/* GROUP */}
              <div
                className="group leading-[7vw] sm:leading-[5.5vw] md:leading-[4.5vw] lg:leading-[3.5vw] xl:leading-[2.5vw] [&:hover>a:not(:hover)]:opacity-30 "
              >
                {[
                  { name: "Home", link: "/" },
                  { name: "About Us", link: "/about-us" },
                  { name: "Plans", link: "/plans" },
                  { name: "Work", link: "/work" },
                  { name: "Insight", link: "/insight" },
                  { name: "Contact", link: "/contact" },
                ].map((item) => (
                  <Copy>
                    <a
                      key={item.name}
                      href={item.link}
                      className=" block font-[secondaryregularfont] text-[6vw] sm:text-[5vw] md:text-[4vw] lg:text-[3vw] xl:text-[2vw] transition-all duration-300 text-white group-hover:opacity-30 hover:opacity-100 "
                    >
                      {item.name}
                    </a>
                  </Copy>
                ))}
              </div>
            </div>

            {/* CONNECT */}
            <div className="w-full sm:w-[50%] flex sm:flex-col max-sm:gap-[7vh]">
              <h5
                className="font-[primaryfont] text-[9vw] max-sm:w-[23vw] sm:text-[7vw] md:text-[7vw] lg:text-[4vw] mb-[2vw]"
              >
                CONNECT
              </h5>

              {/* GROUP */}
              <div className="group leading-[7vw] sm:leading-[5.5vw] md:leading-[4.5vw] lg:leading-[3.5vw] xl:leading-[2.5vw] [&:hover>a:not(:hover)]:opacity-30 ">
                {[
                  { name: "LinkedIn", link: "https://www.linkedin.com/in/creatingbestforyou" },
                  { name: "Instagram", link: "https://www.instagram.com" },
                ].map((item) => (
                  <Copy>
                    <a
                      key={item.name}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className=" block font-[secondaryregularfont] text-[6vw] sm:text-[5vw] md:text-[4vw] lg:text-[3vw] xl:text-[2vw] m-0 transition-all duration-300 text-white group-hover:opacity-30 hover:opacity-100 "
                    >
                      {item.name}
                    </a>
                  </Copy>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ---------------- BOTTOM SECTION (30%) ---------------- */}
        <div className="absolute bottom-[13vh] sm:bottom-[13vw] left-0 w-full flex z-200">
          <div className="w-full max-lg:justify-center lg:w-[50%] flex items-center px-[1.5vw] text-white">
            <p className="font-[spacebold] text-[clamp(1rem,3rem,1.5rem)] m-0">
              COOKIE POLICY
            </p>{" "}
            {/*  text-[5vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw] */}
          </div>
        </div>
        <div className="w-full h-[30%] relative">
          {/* Spotlight + Text */}
          <div className="w-full h-full flex items-end justify-center overflow-hidden relative">
            {/* Spotlight overlay */}
            <div
              className="hidden sm:block absolute inset-0 sm:pointer-events-none z-10 transition-all duration-200"
              style={{
                background: isHovering
                  ? `radial-gradient(circle 30vw at ${mouseX}px 50%, transparent 0%, #1E1E1E 100%)`
                  : `radial-gradient(circle 30vw at ${mouseX}px 50%, transparent 0%, #1E1E1E 100%)`, // <-- keep last mouseX
              }}
            />

            {/* Big text */}
            <h1 className="hidden sm:block font-[primaryfont] text-[#E0FF98] m-0 p-0 leading-[0.8] pt-[0.4vw] text-[13.5vw] whitespace-nowrap">
              CREATING BEST FOR YOU
            </h1>
          </div>

          <div
            className="sm:hidden absolute w-full h-[18vh] bottom-0 flex items-end justify-center overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            {/* Right soft shadow */}
            <div
              className="absolute bottom-0 right-0 w-[7vh] h-[13vh] z-20 bg-gradient-to-l from-[#1F1F1F]/100 via-[#1F1F1F]/80 via-[#1F1F1F]/60 via-[#1F1F1F]/40 to-transparent pointer-events-none"
            ></div>

            {/* Left soft shadow */}
            <div
              className="absolute bottom-0 left-0 w-[7vh] h-[13vh] z-20 bg-gradient-to-r from-[#1F1F1F]/100 via-[#1F1F1F]/80 via-[#1F1F1F]/60 via-[#1F1F1F]/40 to-transparent pointer-events-none"
            ></div>

            <h1
              ref={textRef}
              className="font-[primaryfont] text-[#E0FF98] m-0 p-0 leading-[0.8] pt-[0.4vw] text-[20.5vw] whitespace-nowrap"
              style={{
                transform: `translateX(${dragX}px)`,
              }}
            >
              CREATING BEST FOR YOU
            </h1>
          </div>

          {/* MOBILE DRAG TEXT */}

          {/* <div
          className="sm:hidden w-full h-full mb-[15vw]  "
        >
          <h1
            className="font-[primaryfont] text-[#E0FF98]
               text-[22vw] whitespace-nowrap leading-[0.8]
               drop-shadow-[0_0_25px_rgba(224,255,152,0.25)]"
          >
            CREATING BEST FOR YOU
          </h1>
        </div> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
