import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Single Sunray Animation */}
      <div className="fixed top-0 left-0 pointer-events-none z-40 overflow-hidden w-full h-full">
        <div
          className="absolute top-[-20vw] left-[-25vw] bg-[#E0FF98] origin-top-left transition-all duration-1000 ease-out"
          style={{
            width: isMenuOpen ? "200.4vw" : "0", // diagonal length to reach bottom-right
            height: "9vw", // right side height as you mentioned
            transform: "rotate(30deg)", // diagonal angle
            clipPath: isMenuOpen 
              ? "polygon(0 0, 100% 0, 100% 20vw, 0 10vw)" // Creates the slant: right=20vw, left=10vw
              : "polygon(0 0, 0 0, 0 0, 0 0)",
          }}
        />
      </div>

      {/* Navbar */}
      <div className="w-full h-[6vw] bg-transparent fixed top-0 left-0 right-0 flex justify-between items-start z-50">
        {/* Left Menu Button - CLICKABLE */}
        <button
          onClick={toggleMenu}
          className="xl:w-[7vw] xl:h-[3vw] lg:w-[12vh] lg:h-[5vh] md:h-[5vh] md:w-[12vh] sm:w-[12vh] sm:h-[5vh] max-sm:w-[12vh] max-sm:h-[5vh] bg-[#E0FF98] rounded-br-[4vw] sm:rounded-br-[4vw] lg:rounded-br-[2.5vw] xl:rounded-br-[1.5vw] flex justify-between items-center sm:p-[2.5vw] md:p-[1.5vw] lg:p-[1vw] xl:p-[0.7vw] p-[3vw] md:gap-[1vw] lg:gap-[2vw] xl:gap-[1vw] cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="flex flex-col sm:gap-[1.3vw] md:gap-[1vw] xl:gap-[0.5vw] gap-[1.5vw]">
            <div className="lg:w-[3vw] lg:h-[1px] md:w-[4vw] xl:w-[2vw] w-[5vw] h-[0.1vw] bg-[#1E1E1E]"></div>
            <div className="lg:w-[3vw] lg:h-[1px] md:w-[4vw] xl:w-[2vw] w-[5vw] h-[0.1vw] bg-[#1E1E1E]"></div>
          </div>
          <p className="font-[secondaryregularfont]">MENU</p>
        </button>

        {/* Center Title */}
        <h5 className="font-[primaryfont] max-sm:text-[4vw] sm:text-[3vw] md:text-[2vw] text-[1.5vw] mt-[0.5vw]">
          CREATING BEST FOR YOU
        </h5>

        {/* Right Menu Button */}
        <div className="xl:w-[7vw] xl:h-[3vw] lg:w-[12vh] lg:h-[5vh] md:h-[5vh] md:w-[12vh] sm:w-[12vh] sm:h-[5vh] max-sm:w-[12vh] max-sm:h-[5vh] bg-[#E0FF98] rounded-bl-[4vw] sm:rounded-bl-[4vw] lg:rounded-bl-[2.5vw] xl:rounded-bl-[1.5vw] flex justify-between items-center sm:p-[2.5vw] md:p-[1.5vw] lg:p-[1vw] xl:p-[0.7vw] p-[3vw] md:gap-[1vw] lg:gap-[2vw] xl:gap-[1vw]">
          <div className="flex flex-col sm:gap-[1.3vw] md:gap-[1vw] xl:gap-[0.5vw] gap-[1.5vw]">
            <div className="lg:w-[3vw] lg:h-[1px] md:w-[4vw] xl:w-[2vw] w-[5vw] h-[0.1vw] bg-[#1E1E1E]"></div>
            <div className="lg:w-[3vw] lg:h-[1px] md:w-[4vw] xl:w-[2vw] w-[5vw] h-[0.1vw] bg-[#1E1E1E]"></div>
          </div>
          <p className="font-[secondaryregularfont]">MENU</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;