import React, { useState } from "react";

const Footer = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div className="w-full h-screen bg-[#1E1E1E] overflow-hidden">
      {/* Top Section - 70% */}
      <div className="w-full h-[70%] flex justify-center items-center p-[4vw] text-white">
        <div className="w-[60%] h-full">
          <h3 className="font-[secondaryregularfont] leading-[2.5vw] text-[3vw] mt-[4vw] ml-[4vw]">
            Rise With <br /> Good Design
          </h3>
        </div>
        <div className="w-[40%] h-full flex">
          {/* Explore Section */}
          <div className="w-[50%] h-full mt-[4vw]">
            <h5 className="font-[roxhead] text-[3vw] m-0 p-0 mb-[1vw]">
              EXPLORE
            </h5>
            <div className="w-full leading-[2vw]">
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                Home
              </p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                About
              </p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                Events
              </p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                Plans
              </p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                Work
              </p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                Insight
              </p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                Contact
              </p>
            </div>
          </div>
          {/* Connect Section */}
          <div className="w-[50%] h-full mt-[4vw]">
            <h5 className="font-[roxhead] text-[3vw] m-0 p-0 mb-[1vw]">
              CONNECT
            </h5>
            <div className="w-full leading-[2vw]">
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                LinkedIn
              </p>
              <p className="font-[secondaryregularfont] text-[1.5vw] m-0">
                Instagram
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - 30% */}
      <div className="w-full h-[30%] relative">
        {/* Cookie Policy */}
        <div className="w-full absolute top-[3vw] left-0 flex z-10">
          <div className="w-[50%] flex items-center px-[1.5vw] text-white">
            <p className="font-[spacebold] text-[1vw] m-0">COOKIE POLICY</p>
          </div>
        </div>

        {/* Big Text at Bottom with Spotlight Effect */}
        <div className="w-full h-full flex items-end justify-center overflow-hidden">
          <div
            className="relative cursor-pointer"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Dark Overlay with Spotlight Cutout - ALWAYS RENDERED */}
            <div
              className="absolute inset-0 pointer-events-none z-10 transition-all duration-300"
              style={{
                background: isHovering
                  ? `radial-gradient(circle 30vw at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, #1E1E1E 100%)`
                  : `radial-gradient(circle 50vw at 0% 50%, transparent 0%, #1E1E1E 110%)`,
              }}
            />

            <h1 className="font-[primaryfont] text-[#E0FF98] m-0 p-0 leading-[0.8] pt-[0.4vw] text-[13.5vw] whitespace-nowrap">
              CREATING BEST FOR YOU
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
