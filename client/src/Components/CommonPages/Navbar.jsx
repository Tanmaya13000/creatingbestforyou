import React, { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    "About",
    "Events",
    "Exhibits",
    "Congresses",
    "Sports",
    "Work",
    "Insights",
    "Contact",
  ];

  return (
    <>
      {/* SUNRAY POLYGON SHAPE */}
      <div
        className="menu-shape fixed top-0 left-0 w-screen h-screen bg-[#E0FF98] pointer-events-none z-40 origin-top-left"
        style={{
          clipPath: isMenuOpen
            ? "polygon(-2% 3%, 6% 0, 400% 90%, 78% 110%)"
            : "polygon(0 6%, 0 0, 0 0, 0 0)",
          transition: "clip-path 1.1s cubic-bezier(0.76, 0, 0.24, 1)",
        }}
      />

      {/* BLACK DIM LAYER */}
      <div
        className="fixed inset-0 bg-black z-30 pointer-events-none transition-opacity duration-700"
        style={{ opacity: isMenuOpen ? 0.4 : 0 }}
      />

      {/* MENU OVERLAY CONTENT */}
      <div
        className={`fixed right-[2vw] bottom-[2.5vw] top-[13.5vw] inset-0 z-50 flex items-end justify-end pr-[4vw] transition-all duration-500 ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        style={{
          opacity: isMenuOpen ? 1 : 0,
          transitionDelay: isMenuOpen ? "600ms" : "0ms",
        }}
      >
        <ul className="text-right space-y-[0.8vw] translate-x-[2vw]">
          {menuItems.map((item, index) => (
            <li
              key={item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="text-[4.5vw] font-[primaryfont] text-[#1E1E1E] cursor-pointer leading-[0.9] transition-all duration-300"
              style={{
                transform: isMenuOpen ? "translateY(0)" : "translateY(30px)",
                opacity:
                  hoveredIndex === null || hoveredIndex === index
                    ? 1
                    : 0.4, // fade other items
                transition: `opacity 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${
                  isMenuOpen ? (index + 1) * 80 + 600 : 0
                }ms`,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* NAVBAR */}
      <div className="w-full h-[6vw] bg-transparent fixed top-0 left-0 right-0 flex justify-between items-start z-[60]">
        {/* MENU BUTTON */}
        <button
          onClick={toggleMenu}
          className="menu-btn xl:w-[7vw] xl:h-[3vw] lg:w-[12vh] lg:h-[5vh] md:h-[5vh] md:w-[12vh] sm:w-[12vh] sm:h-[5vh] max-sm:w-[12vh] max-sm:h-[5vh] bg-[#E0FF98] rounded-br-[4vw] sm:rounded-br-[4vw] lg:rounded-br-[2.5vw] xl:rounded-br-[1.5vw] flex justify-start items-center sm:p-[2.5vw] md:p-[1.5vw] lg:p-[1vw] xl:p-[0.7vw] p-[3vw] gap-[1vw] cursor-pointer hover:opacity-90 transition-opacity overflow-hidden relative"
        >
          {/* HAMBURGER LINES */}
          <div className="flex flex-col gap-[0.3rem]">
            <span
              className="line w-[2rem] h-[2px] bg-[#1E1E1E] block transition-all duration-500"
              style={{
                borderRadius: isMenuOpen ? "9999px" : "0px",
                transform: isMenuOpen
                  ? "rotate(45deg) translateY(0.3rem)"
                  : "rotate(0deg) translateY(0)",
              }}
            />
            <span
              className="line w-[2rem] h-[2px] bg-[#1E1E1E] block transition-all duration-500"
              style={{
                borderRadius: isMenuOpen ? "9999px" : "0px",
                transform: isMenuOpen
                  ? "rotate(-45deg) translateY(-0.3rem)"
                  : "rotate(0deg) translateY(0)",
              }}
            />
          </div>

          {/* MENU / CLOSE TEXT */}
          <div className="relative h-[1.5rem] w-[3.5rem] overflow-hidden flex items-center ml-2">
            <span
              className="absolute font-[secondaryregularfont] transition-transform duration-500 ease-out"
              style={{
                transform: isMenuOpen ? "translateY(-100%)" : "translateY(0%)",
              }}
            >
              MENU
            </span>
            <span
              className="absolute font-[secondaryregularfont] transition-transform duration-500 ease-out"
              style={{
                transform: isMenuOpen ? "translateY(0%)" : "translateY(100%)",
              }}
            >
              CLOSE
            </span>
          </div>
        </button>

        {/* Logo */}
        <img
          src="/images/logo.svg"
          alt="hero-text"
          className="w-[10vw] mt-[1vw] object-contain mix-blend-difference"
        />

        {/* Contact Button */}
        <div className="xl:w-[8.5vw] xl:h-[3vw] lg:w-[12vh] lg:h-[5vh] md:h-[5vh] md:w-[12vh] sm:w-[12vh] sm:h-[5vh] max-sm:w-[12vh] max-sm:h-[5vh] bg-[#E0FF98] rounded-bl-[4vw] sm:rounded-bl-[4vw] lg:rounded-bl-[2.5vw] xl:rounded-bl-[1.5vw] flex justify-start items-center sm:p-[2.5vw] md:p-[1.5vw] lg:p-[1vw] xl:p-[0.7vw] p-[3vw] gap-[1vw] cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="flex flex-col gap-[0.3rem]">
            <div className="w-[2rem] h-[2px] bg-[#1E1E1E]"></div>
            <div className="w-[2rem] h-[2px] bg-[#1E1E1E]"></div>
          </div>
          <p className="font-[secondaryregularfont] ml-2">CONTACT</p>
        </div>
      </div>
    </>
  );
};

export default Navbar;
