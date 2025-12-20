import React, { useState } from "react";

const Footer = () => {
  // Stores the mouse X position (Y will be locked)
  const [mouseX, setMouseX] = useState(0);

  // Spotlight active or not
  const [isHovering, setIsHovering] = useState(false);

  // Handle mouse movement on FULL PAGE
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    // Only move X → left to right
    setMouseX(e.clientX - rect.left);
  };

  return (
    <div
      className="w-full h-screen bg-[#1E1E1E] overflow-hidden z-10"
      onMouseMove={handleMouseMove}     // ← hover anywhere on page
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* ---------------- TOP SECTION (70%) ---------------- */}
      <div className="w-full h-[70%] flex justify-center items-center p-[4vw] text-white">
        <div className="w-[60%] h-full">
          <h3 className="font-[secondaryregularfont] leading-[2.5vw] text-[3vw] mt-[4vw] ml-[4vw]">
            Rise With <br /> Good Design
          </h3>
        </div>

        <div className="w-[40%] h-full flex">
          <div className="w-[50%] h-full mt-[4vw]">
            <h5 className="font-[roxhead] text-[3vw] mb-[1vw]">EXPLORE</h5>
            <div className="leading-[2vw]">
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">Home</p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">About</p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">Events</p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">Plans</p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">Work</p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">Insight</p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">Contact</p>
            </div>
          </div>

          <div className="w-[50%] h-full mt-[4vw]">
            <h5 className="font-[roxhead] text-[3vw] mb-[1vw]">CONNECT</h5>
            <div className="leading-[2vw]">
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">LinkedIn</p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">Instagram</p>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- BOTTOM SECTION (30%) ---------------- */}
      <div className="w-full h-[30%] relative">

        <div className="absolute top-[3vw] left-0 w-full flex z-10">
          <div className="w-[50%] flex items-center px-[1.5vw] text-white">
            <p className="font-[spacebold] text-[1vw] m-0">COOKIE POLICY</p>
          </div>
        </div>

        {/* Spotlight + Text */}
        <div className="w-full h-full flex items-end justify-center overflow-hidden relative">
          
          {/* Spotlight overlay */}
          <div
            className="absolute inset-0 pointer-events-none z-10 transition-all duration-200"
            style={{
              background: isHovering
                ? `radial-gradient(circle 30vw at ${mouseX}px 50%, transparent 0%, #1E1E1E 100%)`
                : `radial-gradient(circle 50vw at 0% 50%, transparent 0%, #1E1E1E 110%)`,
            }}
          />

          {/* Big text */}
          <h1 className="font-[primaryfont] text-[#E0FF98] m-0 p-0 leading-[0.8] pt-[0.4vw] text-[13.5vw] whitespace-nowrap">
            CREATING BEST FOR YOU
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
