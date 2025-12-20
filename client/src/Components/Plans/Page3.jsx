
import React, { useEffect, useRef } from "react";
// React hooks:
// useRef → to directly access DOM elements
// useEffect → to run GSAP animation after component mounts

import gsap from "gsap";
// GSAP core library for animations

import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollTrigger plugin → allows animations to react to scrolling

// Register ScrollTrigger with GSAP (MANDATORY)
// Without this, scroll-based animations will NOT work
gsap.registerPlugin(ScrollTrigger);

const Page3 = () => {
  // Refs to access DOM elements directly
  const card2Ref = useRef(null); // second card
  const card3Ref = useRef(null); // third card
  const mainRef = useRef(null);  // whole section (used for pinning & trigger)

  useEffect(() => {
    // GSAP timeline → allows multiple animations to stay perfectly synced
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: mainRef.current, 
        // Element that controls when animation starts

        start: "top top", 
        // When top of section touches top of viewport

        end: "+=200%", 
        // Animation lasts for 200% of viewport scroll height

        scrub: 1, 
        // Links animation progress directly to scroll
        // 1 = slight smoothness, 0 = instant

        pin: true, 
        // Pins the section in place while scrolling
      },
    });

    // CARD 2 ANIMATION
    // Starts card 2 from far below (50vw down)
    // Moves it smoothly to its normal position (y: 0)
    tl.fromTo(
      card2Ref.current,
      { y: "50vw" }, // starting position (off screen)
      { y: 0, ease: "none" }, // end position
      0 // starts immediately with scroll
    );

    // CARD 3 ANIMATION
    // Starts even further down (100vw)
    // Slight delay so it follows card 2
    tl.fromTo(
      card3Ref.current,
      { y: "100vw" }, // starts lower than card 2
      { y: 0, ease: "none" },
      0.15 // small delay → creates staggered movement
    );

    // Cleanup function
    // Prevents memory leaks & duplicated triggers on route change
    return () => ScrollTrigger.killAll();
  }, []);

  return (
    <div
      ref={mainRef}
      // This container is pinned & animated
      className="w-full h-screen flex justify-between items-center z-10 p-[2vw]"
    >
      {/* CARD 1 — Static (does not animate) */}
      <div className="card1 w-[30vw] h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] ">
        <div className="w-full h-[8vw] flex justify-start items-center ">
          <h1 className="font-[roxhead] text-[9vw] ml-[2vw] ">1</h1>
          <h6 className="font-[galgo] text-[4vw] leading-[3vw] ml-[10vw] mb-[2vw] ">
            Built on brand, <br /> made to move
          </h6>
        </div>
        <div className="w-full h-[8vw] flex justify-end items-center">
          <h6 className="w-[16vw] font-[interlight] text-[0.9vw] ">
            We go deep into your brand to craft <br /> experiences that feel
            personal, smart, <br /> and made to hit. Nothing off the shelf.{" "}
            <br /> Everything off the charts.
          </h6>
        </div>
      </div>

      {/* CARD 2 — Moves up on scroll */}
      <div
        ref={card2Ref}
        className="card2 w-[30vw] h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] "
      >
        <div className="w-full h-[8vw] flex justify-start items-center ">
          <h1 className="font-[roxhead] text-[9vw] ml-[2vw] ">2</h1>
          <h6 className="font-[galgo] text-[4vw] leading-[3vw] ml-[10vw] mb-[2vw] ">
            Moments that hit <br /> different
          </h6>
        </div>
        <div className="w-full h-[8vw] flex justify-end items-center">
          <h6 className="w-[16vw] font-[interlight] text-[0.9vw] ">
            From global launches to intimate milestones, we design experiences
            that spark emotion, fuel connection, and stay with people long after
            the lights go down.
          </h6>
        </div>
      </div>

      {/* CARD 3 — Moves up slightly later than card 2 */}
      <div
        ref={card3Ref}
        className="card3 w-[30vw] h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] "
      >
        <div className="w-full h-[8vw] flex justify-start items-center ">
          <h1 className="font-[roxhead] text-[9vw] ml-[2vw] ">3</h1>
          <h6 className="font-[galgo] text-[4vw] leading-[3vw] ml-[10vw] mb-[2vw] ">
            Precision at any <br /> scale
          </h6>
        </div>
        <div className="w-full h-[8vw] flex justify-end items-center">
          <h6 className="w-[17vw] font-[interlight] text-[0.9vw] ">
            Multi-market. Multilingual. No problem. We deliver high-stakes
            productions with the polish of a boutique studio, and the reach of a
            global player.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Page3;
