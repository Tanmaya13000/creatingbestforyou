import React from "react";

const Navbar = () => {
  return (
    <div className="w-full h-[6vw] bg-transparent fixed top-0 left-0 right-0 flex justify-between items-start z-50 ">
      <div className="xl:w-[7vw] xl:h-[3vw] lg:w-[12vh] lg:h-[5vh] md:h-[5vh] md:w-[12vh] sm:w-[12vh] sm:h-[5vh] max-sm:w-[12vh] max-sm:h-[5vh] bg-[#E0FF98] rounded-br-[4vw] sm:rounded-br-[4vw] lg:rounded-br-[2.5vw] xl:rounded-br-[1.5vw] flex justify-between items-center sm:p-[2.5vw] md:p-[1.5vw] lg:p-[1vw] xl:p-[0.7vw] p-[3vw] md:gap-[1vw] lg:gap-[2vw] xl:gap-[1vw] ">
        <div className="flex flex-col sm:gap-[1.3vw] md:gap-[1vw] xl:gap-[0.5vw] gap-[1.5vw] ">
          <div className="lg:w-[3vw] lg:h-[1px] md:w-[4vw] xl:w-[2vw] w-[5vw] h-[0.1vw] bg-[#1E1E1E]"></div>
          <div className="lg:w-[3vw] lg:h-[1px] md:w-[4vw] xl:w-[2vw] w-[5vw] h-[0.1vw] bg-[#1E1E1E]"></div>
        </div>
        <p className="font-[secondaryregularfont]" >MENU</p>
      </div>
      <h5 className="font-[primaryfont] max-sm:text-[4vw] sm:text-[3vw] md:text-[2vw] text-[1.5vw] mt-[0.5vw] ">CREATING BEST FOR YOU</h5>
      <div className="xl:w-[7vw] xl:h-[3vw] lg:w-[12vh] lg:h-[5vh] md:h-[5vh] md:w-[12vh] sm:w-[12vh] sm:h-[5vh] max-sm:w-[12vh] max-sm:h-[5vh] bg-[#E0FF98] rounded-bl-[4vw] sm:rounded-bl-[4vw] lg:rounded-bl-[2.5vw] xl:rounded-bl-[1.5vw] flex justify-between items-center sm:p-[2.5vw] md:p-[1.5vw] lg:p-[1vw] xl:p-[0.7vw] p-[3vw] md:gap-[1vw] lg:gap-[2vw] xl:gap-[1vw] ">
        <div className="flex flex-col sm:gap-[1.3vw] md:gap-[1vw] xl:gap-[0.5vw] gap-[1.5vw] ">
          <div className="lg:w-[3vw] lg:h-[1px] md:w-[4vw] xl:w-[2vw] w-[5vw] h-[0.1vw] bg-[#1E1E1E]"></div>
          <div className="lg:w-[3vw] lg:h-[1px] md:w-[4vw] xl:w-[2vw] w-[5vw] h-[0.1vw] bg-[#1E1E1E]"></div>
        </div>
        <p className="font-[secondaryregularfont]" >MENU</p>
      </div>
    </div>
  );
};

export default Navbar;
