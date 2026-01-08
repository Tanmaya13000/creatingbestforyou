import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Copy from "../TextAnimations/copy";

const Plan2 = () => {
  // --------------------------
  // Refs to access DOM elements directly
  // --------------------------
  const figureRef = useRef(null); // whole figure container (used for hover movement)
  const shapeContainerRef = useRef(null); // container that holds all shapes
  const rotatingContainerRef = useRef(null); // container for initial rotation animation
  const centerRef = useRef(null); // center shape
  const leftRef = useRef(null); // left shape
  const rightRef = useRef(null); // right shape

  // --------------------------
  // Runs once on component mount
  // Handles initial GSAP animations
  // --------------------------
  useEffect(() => {
    // --------------------------
    // Initial rotation animation for the whole shape container
    // --------------------------
    gsap.fromTo(
      rotatingContainerRef.current,
      { rotate: 80 }, // start rotation
      { rotate: -145, duration: 2.6, ease: "power4.out" } // end rotation smoothly
    );

    // --------------------------
    // Animate the center piece's clip-path
    // --------------------------
    gsap.fromTo(
      centerRef.current,
      { clipPath: "polygon(30% 0px, 80% 0px, 51.5% 100%, 48.5% 100%)" },
      {
        clipPath: "polygon(30% 0px, 80% 0px, 51.5% 100%, 48.5% 100%)",
        duration: 2.6,
        ease: "power4.out",
      }
    );

    // --------------------------
    // Animate the left piece's clip-path
    // --------------------------
    gsap.fromTo(
      leftRef.current,
      { clipPath: "polygon(48% 0px, 52% 0px, 100% 100%, 100% 100%)" },
      {
        clipPath: "polygon(48% 0px, 52% 0px, 100% 100%, -50% 100%)",
        duration: 2.6,
        ease: "power4.out",
      }
    );

    // --------------------------
    // Animate the right piece's clip-path
    // --------------------------
    gsap.fromTo(
      rightRef.current,
      { clipPath: "polygon(48% 0px, 52% 0px, -150% 100%, 0% 100%)" },
      {
        clipPath: "polygon(48% 0px, 52% 0px, 150% 100%, 0% 100%)",
        duration: 2.6,
        ease: "power4.out",
      }
    );
  }, []);

  // --------------------------
  // Function to handle mouse hover movement
  // Moves the shape container slightly based on mouse position
  // --------------------------
  const handleMouseMove = (e) => {
    if (!shapeContainerRef.current) return;

    const rect = shapeContainerRef.current.getBoundingClientRect(); // get container dimensions
    const x = e.clientX - rect.left - rect.width / 2; // horizontal distance from center
    const y = e.clientY - rect.top - rect.height / 2; // vertical distance from center

    const moveX = (x / rect.width) * 30; // scale movement (max 30px)
    const moveY = (y / rect.height) * 30;
    const rotate = (x / rect.width) * 5; // small rotation effect based on horizontal movement

    // Animate shape container to follow the mouse smoothly
    gsap.to(shapeContainerRef.current, {
      x: moveX,
      y: moveY,
      rotate: rotate,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  // --------------------------
  // Function to reset figure back to original position when mouse leaves
  // --------------------------
  const handleMouseLeave = () => {
    gsap.to(shapeContainerRef.current, {
      x: 0,
      y: 0,
      rotate: 0,
      duration: 1,
      ease: "power3.out",
    });
  };

  return (
    <div
      className="planpageone w-full h-[100vh] bg-[#9C93E8] relative overflow-hidden "
      onMouseMove={handleMouseMove} // mouse move triggers hover animation
      onMouseLeave={handleMouseLeave} // mouse leave resets animation
    >
      {/* --------------------------
          Background image
      -------------------------- */}
      <img
        src="/Images/hackathon1.jpg"
        className="fixed top-0 left-0 w-full h-full object-cover z--4"
        alt=""
      />

      {/* --------------------------
          Figure container (hover + shapes)
      -------------------------- */}
      <figure
        ref={figureRef}
        className="absolute w-full h-full z-30"
        style={{ willChange: "transform" }}
      >
        {/* --------------------------
            Shape container
        -------------------------- */}
        <div
          ref={shapeContainerRef}
          className="absolute"
          style={{
            top: "calc(50% + 14vh)",
            left: "calc(50% - 10vw)",
            width: "max(110vw, 110vh)",
            height: "max(110vw, 110vh)",
            transform: "translate(-50%, -50%)",
            filter: "url(#goo)", // apply gooey filter
            willChange: "transform",
          }}
        >
          {/* --------------------------
              Rotating container for initial animation
          -------------------------- */}
          <div ref={rotatingContainerRef} className="w-full h-full" style={{ willChange: "transform" }}>
            {/* Center piece */}
            <div
              ref={centerRef}
              className="absolute left-0 w-full h-full"
              style={{
                bottom: "49%",
                background: "#f7ffdc",
                transformOrigin: "50% 100%",
                left: "-1%",
                transform: "rotate(35deg)",
                willChange: "transform",
              }}
            />

            {/* Left piece */}
            <div
              ref={leftRef}
              className="absolute left-0 w-full h-full"
              style={{
                top: "50%",
                background: "#f7ffdc",
                transformOrigin: "50% 0%",
                transform: "rotate(35deg)",
                willChange: "transform",
              }}
            />

            {/* Right piece */}
            <div
              ref={rightRef}
              className="absolute left-0 w-full h-full"
              style={{
                top: "50%",
                background: "#f7ffdc",
                transformOrigin: "50% 0%",
                transform: "rotate(-15deg)",
                willChange: "transform",
              }}
            />
          </div>
        </div>

        {/* --------------------------
            Text overlays
        -------------------------- */}
        <Copy delay={1.2} >
          <h1 className="absolute top-[20vw] left-[22vw] sm:top-[10vw] sm:left-[20vw] md:top-[10vw] md:left-[35vw] lg:top-[10vw] lg:left-[42vw] font-[primaryfont] text-[11vw] md:text-[9vw] lg:text-[7vw] leading-[8vw] ">
            How Pricing Works
          </h1>
        </Copy>
        {/* <Copy delay={1.2} > */}
          <h2 className="font-[galgo] text-[9vw] sm:text-[5vw] md:text-[4vw] lg:text-[3vw] absolute top-[35vw] left-[21vw] sm:top-[25vw] sm:left-[20vw] md:top-[25vw] md:left-[35vw] lg:top-[25vw] lg:left-[42vw] w-[70vw] sm:w-[30vw] md:w-[20vw] leading-[7vw] sm:leading-[4vw] md:leading-[3vw] lg:leading-[2.5vw] ">
            Your ambition defines scope. Scope defines investment
          </h2>
        {/* </Copy> */}
        {/* <Copy delay={1.2} > */}
          <h6 className="font-[maropelight] max-sm:text-center text-[3.5vw] sm:text-[3vw] md:text-[2vw] lg:text-[1.5vw] text-[#1E1E1E] leading-[4.5vw] sm:leading-[3vw] md:leading-[2vw] lg:leading-[1.5vw] absolute top-[52vw] max-sm:left-[20vw] sm:top-[26vw] sm:right-[5vw] md:top-[25vw] md:right-[6vw] lg:top-[25vw] lg:right-0 mr-[2vw] w-[86vw] max-sm:px-[10vw] sm:w-[42vw] md:w-[30vw]">
            Our plans are strategic starting points, not fixed packages. Pricing
            is refined based on customization, feature depth, content volume, and
            automation needs. This ensures you invest only in what adds real
            value. Once requirements are finalized, we provide a clear scope,
            timeline, and cost — fully transparent, with no hidden charges. Our
            pricing adapts to your goals, scale, and long-term vision.
          </h6>
        {/* </Copy> */}

        {/* --------------------------
            Gooey filter applied to shapes
        -------------------------- */}
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
      </figure>
    </div>
    // <div className="w-full h-full"></div>
  );
};

export default Plan2;
