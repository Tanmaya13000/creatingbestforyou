// import React, { useEffect, useRef } from "react";
// // React hooks:
// // useRef → to directly access DOM elements
// // useEffect → to run GSAP animation after component mounts

// import gsap from "gsap";
// // GSAP core library for animations

// import { ScrollTrigger } from "gsap/ScrollTrigger";
// // ScrollTrigger plugin → allows animations to react to scrolling

// // Register ScrollTrigger with GSAP (MANDATORY)
// // Without this, scroll-based animations will NOT work
// gsap.registerPlugin(ScrollTrigger);

// const Page3 = () => {
//   // Refs to access DOM elements directly
//   const card2Ref = useRef(null); // second card
//   const card3Ref = useRef(null); // third card
//   const mainRef = useRef(null); // whole section (used for pinning & trigger)

//   useEffect(() => {
//     // Create GSAP media context
//     const mm = gsap.matchMedia();

//     // ✅ DESKTOP ONLY
//     mm.add("(min-width: 1024px)", () => {
//       const tl = gsap.timeline({
//         scrollTrigger: {
//           trigger: mainRef.current,
//           start: "top top",
//           end: "+=200%",
//           scrub: 1,
//           pin: true,
//         },
//       });

//       tl.fromTo(card2Ref.current, { y: "50vw" }, { y: 0, ease: "none" }, 0);

//       tl.fromTo(card3Ref.current, { y: "100vw" }, { y: 0, ease: "none" }, 0.15);
//     });

//     // ❌ MOBILE & TABLET → RESET STATE
//     mm.add("(max-width: 1023px)", () => {
//       gsap.set([card2Ref.current, card3Ref.current], { y: 0 });
//     });

//     // ✅ PROPER CLEANUP
//     return () => mm.revert();
//   }, []);

//   return (
//     <div
//       ref={mainRef}
//       // This container is pinned & animated
//       className="w-full h-screen flex justify-between items-center z-10 p-[2vw]"
//     >
//       {/* CARD 1 — Static (does not animate) */}
//       <div className="card1 w-[30vw] h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] ">
//         <div className="w-full h-[8vw] flex justify-start items-center ">
//           <h1 className="font-[roxhead] text-[9vw] ml-[2vw] ">1</h1>
//           <h6 className="font-[galgo] text-[4vw] leading-[3vw] ml-[10vw] mb-[2vw] ">
//             Built on brand, <br /> made to move
//           </h6>
//         </div>
//         <div className="w-full h-[8vw] flex justify-end items-center">
//           <h6 className="w-[16vw] font-[interlight] text-[0.9vw] ">
//             We go deep into your brand to craft <br /> experiences that feel
//             personal, smart, <br /> and made to hit. Nothing off the shelf.{" "}
//             <br /> Everything off the charts.
//           </h6>
//         </div>
//       </div>

//       {/* CARD 2 — Moves up on scroll */}
//       <div
//         ref={card2Ref}
//         className="card2 w-[30vw] h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] "
//       >
//         <div className="w-full h-[8vw] flex justify-start items-center ">
//           <h1 className="font-[roxhead] text-[9vw] ml-[2vw] ">2</h1>
//           <h6 className="font-[galgo] text-[4vw] leading-[3vw] ml-[10vw] mb-[2vw] ">
//             Moments that hit <br /> different
//           </h6>
//         </div>
//         <div className="w-full h-[8vw] flex justify-end items-center">
//           <h6 className="w-[16vw] font-[interlight] text-[0.9vw] ">
//             From global launches to intimate milestones, we design experiences
//             that spark emotion, fuel connection, and stay with people long after
//             the lights go down.
//           </h6>
//         </div>
//       </div>

//       {/* CARD 3 — Moves up slightly later than card 2 */}
//       <div
//         ref={card3Ref}
//         className="card3 w-[30vw] h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] "
//       >
//         <div className="w-full h-[8vw] flex justify-start items-center ">
//           <h1 className="font-[roxhead] text-[9vw] ml-[2vw] ">3</h1>
//           <h6 className="font-[galgo] text-[4vw] leading-[3vw] ml-[10vw] mb-[2vw] ">
//             Precision at any <br /> scale
//           </h6>
//         </div>
//         <div className="w-full h-[8vw] flex justify-end items-center">
//           <h6 className="w-[17vw] font-[interlight] text-[0.9vw] ">
//             Multi-market. Multilingual. No problem. We deliver high-stakes
//             productions with the polish of a boutique studio, and the reach of a
//             global player.
//           </h6>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Page3;

import React, { useEffect, useRef } from "react";
// React hooks:
// useRef → to directly access DOM elements
// useEffect → to run GSAP animation after component mounts

import gsap from "gsap";
// GSAP core library for animations

// import { ScrollTrigger } from "gsap/ScrollTrigger";
// ScrollTrigger plugin → allows animations to react to scrolling

// Register ScrollTrigger with GSAP (MANDATORY)
// Without this, scroll-based animations will NOT work
// gsap.registerPlugin(ScrollTrigger);

const Page3 = () => {
  // Refs to access DOM elements directly
  const card2Ref = useRef(null); // second card
  const card3Ref = useRef(null); // third card
  const mainRef = useRef(null); // whole section (used for pinning & trigger)

  useEffect(() => {
    // Create GSAP media context
    const ScrollTrigger = require("gsap/ScrollTrigger").default;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    // ✅ DESKTOP ONLY
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      tl.fromTo(card2Ref.current, { y: "50vw" }, { y: 0, ease: "none" }, 0);

      tl.fromTo(card3Ref.current, { y: "100vw" }, { y: 0, ease: "none" }, 0.15);
    });

    // ❌ MOBILE & TABLET → RESET STATE
    mm.add("(max-width: 1023px)", () => {
      gsap.set([card2Ref.current, card3Ref.current], { y: 0 });
    });

    // ✅ PROPER CLEANUP
    return () => mm.revert();
  }, []);

  return (
    <div
      ref={mainRef}
      // This container is pinned & animated on desktop, vertical on mobile
      className="w-full lg:h-screen flex lg:flex-row flex-col lg:justify-between lg:items-center justify-center items-center z-10 lg:p-[2vw] p-[4vw] gap-[4vw] lg:gap-0"
    >
      {/* CARD 1 — Static (does not animate) */}
      <div className="card1 w-[70vw] h-[40vw] lg:w-[30vw] lg:h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] ">
        <div className="w-full h-[8vw] px-[5vw] py-[8vw] lg:px-0 lg:py-0 flex justify-between lg:justify-start items-center ">
          <h1 className="font-[roxhead] text-[15vw] lg:text-[9vw] ml-[2vw] ">
            1
          </h1>
          <h6 className="font-[galgo] text-[6vw] lg:text-[4vw] leading-[5vw] lg:leading-[3vw] ml-[10vw] mb-[2vw] ">
            Built on brand, <br /> made to move
          </h6>
        </div>
        <div className="w-full h-[8vw] flex justify-end items-center p-[3vw] ">
          <h6 className=" w-[40vw] lg:w-[16vw] font-[interlight] text-[2vw] lg:text-[0.9vw] pb-[7vw] ">
            We go deep into your brand to craft <br /> experiences that feel
            personal, smart, <br /> and made to hit. Nothing off the shelf.{" "}
            <br /> Everything off the charts.
          </h6>
        </div>
      </div>

      {/* CARD 2 — Moves up on scroll (desktop only) */}
      <div
        ref={card2Ref}
        className="card2 w-[70vw] h-[40vw] lg:w-[30vw] lg:h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] "
      >
        <div className="w-full h-[8vw] px-[5vw] py-[8vw] lg:px-0 lg:py-0 flex justify-between lg:justify-start items-center ">
          <h1 className="font-[roxhead] text-[15vw] lg:text-[9vw] ml-[2vw] ">
            2
          </h1>
          <h6 className="font-[galgo] text-[6vw] lg:text-[4vw] leading-[5vw] lg:leading-[3vw] ml-[10vw] mb-[2vw] ">
            Moments that hit <br /> different
          </h6>
        </div>
        <div className="w-full h-[8vw] flex justify-end items-center p-[3vw] ">
          <h6 className=" w-[40vw] lg:w-[16vw] font-[interlight] text-[2vw] lg:text-[0.9vw] pb-[7vw] ">
            From global launches to intimate milestones, we design experiences
            that spark emotion, fuel connection, and stay with people long after
            the lights go down.
          </h6>
        </div>
      </div>

      {/* CARD 3 — Moves up slightly later than card 2 (desktop only) */}
      <div
        ref={card3Ref}
        className="card3 w-[70vw] h-[40vw] lg:w-[30vw] lg:h-[22vw] bg-[#F3EFE9] z-10 rounded-[2.2vw] flex flex-col justify-between items-center p-[1vw] "
      >
        <div className="w-full h-[8vw] px-[5vw] py-[8vw] lg:px-0 lg:py-0 flex justify-between lg:justify-start items-center ">
          <h1 className="font-[roxhead] text-[15vw] lg:text-[9vw] ml-[2vw] ">
            3
          </h1>
          <h6 className="font-[galgo] text-[6vw] lg:text-[4vw] leading-[5vw] lg:leading-[3vw] ml-[10vw] mb-[2vw] ">
            Precision at any <br /> scale
          </h6>
        </div>
        <div className="w-full h-[8vw] flex justify-end items-center p-[3vw] ">
          <h6 className=" w-[40vw] lg:w-[16vw] font-[interlight] text-[2vw] lg:text-[0.9vw] pb-[7vw] ">
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
