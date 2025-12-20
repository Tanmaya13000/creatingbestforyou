import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isRetracting, setIsRetracting] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { label: "About", link: "/about-us" },
    // { label: "Events", link: "/events" },
    // { label: "Exhibits", link: "/exhibits" },
    // { label: "Congresses", link: "/congresses" },
    { label: "Plans", link: "/plans" },
    { label: "Work", link: "/work" },
    { label: "Insights", link: "/insights" },
    { label: "Contact", link: "/contact" },
  ];

  const handleMenuItemClick = (link) => {
    // Trigger full-screen sunray
    setIsTransitioning(true);

    // Close menu visually
    setIsMenuOpen(false);

    // Start retraction after expansion
    setTimeout(() => {
      setIsRetracting(true);

      // Navigate after slower retraction completes
      setTimeout(() => {
        router.push(link);
        setIsTransitioning(false);
        setIsRetracting(false);
      }, 1400); // slightly longer for smooth collapse
    }, 1300); // slightly longer full expansion for cinematic effect
  };
  console.log(isHovered)

  

  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className={`fixed lg:justify-center sm:justify-end items-center mix-blend-difference w-full xl:mt-[3.5vw] lg:mt-[4vw] md:mt-[6vw] z-100`}>
        <h1 className="font-[primaryfont] xl:text-[1.7vw] lg:text-[2.3vw] md:text-[3vw] text-white text-center ">
          CREATING BEST FOR YOU
        </h1>
      </div>
      {/* SUNRAY BACKGROUND */}
      <div
        className="menu-shape fixed top-0 left-0 w-screen h-screen bg-[#E0FF98] pointer-events-none z-40 origin-top-left"
        style={{
          clipPath: isRetracting
            ? "polygon(-6% -2%, -10% -4%, 400% 90%, 78% 110%)" // retract to menu
            : isTransitioning
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" // full screen
            : isMenuOpen
            ? "polygon(-6% -2%, -10% -4%, 400% 90%, 78% 110%)" // normal open
            : "polygon(0 6%, 0 0, 0 0, 0 0)", // closed
          transition:
            isTransitioning || isRetracting
              ? "clip-path 2.3s cubic-bezier(0.16, 1, 0.3, 1)"
              : "clip-path 0.3s ease-in-out",
          transform:
            isTransitioning && !isRetracting ? "scale(1.05)" : "scale(1)",
          transitionProperty: "clip-path, transform",
        }}
      />

      {/* BLACK DIM */}
      <div
        className="fixed inset-0 bg-black z-30 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isMenuOpen && !isTransitioning ? 0.4 : 0,
        }}
      />

      {/* MENU ITEMS */}
      <div
        className={`fixed right-[2vw] bottom-[2.5vw] top-[13.5vw] inset-0 z-50
        flex items-end justify-end pr-[4vw] transition-all duration-500
        ${
          isMenuOpen && !isTransitioning
            ? "pointer-events-auto"
            : "pointer-events-none"
        }`}
        style={{
          opacity: isMenuOpen && !isTransitioning ? 1 : 0,
          transitionDelay: isMenuOpen ? "600ms" : "0ms",
        }}
      >
        <ul className="text-right space-y-[0.8vw] translate-x-[2vw]">
          {menuItems.map((item, index) => (
            <li
              key={item.label}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleMenuItemClick(item.link)}
              className="text-[4.5vw] font-[primaryfont] text-[#1E1E1E]
              cursor-pointer leading-[0.9] transition-all duration-300"
              style={{
                transform: isMenuOpen ? "translateY(0)" : "translateY(30px)",
                opacity:
                  hoveredIndex === null || hoveredIndex === index ? 1 : 0.4,
                transition: `opacity 0.3s, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${
                  isMenuOpen ? (index + 1) * 80 + 600 : 0
                }ms`,
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      {/* TOP NAVBAR */}
      <div
        className="w-full h-[6vw] bg-transparent fixed top-0 left-0 right-0
      flex justify-between items-start z-[60]"
      >
        {/* MENU BUTTON */}
        <button
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={toggleMenu}
          className="menu-btn sm:bg-red-400 md:bg-blue-400 lg:bg-green-300 xl:bg-amber-200 xl:w-[8.3vw] xl:h-[3vw] lg:w-[13vh] lg:h-[5vh]
          md:h-[5vh] md:w-[12vh] sm:w-[12vh] sm:h-[5vh] max-sm:w-[8vh]
          max-sm:h-[5vh] bg-[#E0FF98] rounded-br-[4vw] sm:rounded-br-[3vw] md:rounded-br-[2vw]
          lg:rounded-br-[2vw] xl:rounded-br-[1vw] flex justify-center
          items-center sm:p-[2.5vw] md:p-[1.5vw] lg:p-[1vw] xl:p-[0.7vw]
          p-[3vw] gap-[1vw] cursor-pointer hover:opacity-90
          transition-opacity overflow-hidden relative"
        >
          {/* LINES */}
          <div className="flex flex-col gap-[0.3rem]">
            <span
              className={`${
                isMenuOpen ? "" : "line"
              } ${isHovered ? "is-hovered" : ""}  w-[2rem] h-[2px] bg-[#1E1E1E] block transition-all duration-500`}
              style={{
                borderRadius: isMenuOpen ? "9999px" : "0px",
                transform: isMenuOpen
                  ? "rotate(45deg) translateY(0.3rem)"
                  : "rotate(0deg) translateY(0)",
              }}
            />
            <span
              className={` ${
                isMenuOpen ? "" : "line"
              } ${isHovered ? "is-hovered" : ""} w-[2rem] h-[2px] bg-[#1E1E1E] block transition-all duration-500`}
              style={{
                borderRadius: isMenuOpen ? "9999px" : "0px",
                transform: isMenuOpen
                  ? "rotate(-45deg) translateY(-0.3rem)"
                  : "rotate(0deg) translateY(0)",
              }}
            />
          </div>

          {/* TEXT SWITCH */}
          <div className="relative h-[1.5rem] w-[3rem] overflow-hidden flex items-center ml-2 max-sm:hidden ">
            <span
              className="absolute font-[secondaryregularfont] transition-transform duration-500 ease-out xl:text-[0.8vw] "
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

        {/* LOGO */}

        {/* CONTACT BUTTON */}
        <div
          className="xl:w-[9vw] xl:h-[3vw] lg:w-[14vh] lg:h-[5vh] md:h-[5vh]
        md:w-[15vh] sm:w-[15vh] sm:h-[5vh] max-sm:w-[12vh] max-sm:h-[5vh]
        bg-[#E0FF98] rounded-bl-[4vw] sm:rounded-bl-[4vw] md:rounded-bl-[2vw] lg:rounded-bl-[2.5vw]
        xl:rounded-bl-[1.5vw] flex justify-center items-center sm:p-[2.5vw]
        md:p-[2vw] lg:p-[1vw] xl:p-[1vw] p-[3vw] gap-[1vw] cursor-pointer
        hover:opacity-90 transition-opacity max-lg:hidden "
        >
          <div className="flex flex-col gap-[0.3rem]">
            <div className="w-[2rem] h-[1.7px] bg-[#1E1E1E]"></div>
            <div className="w-[2rem] h-[1.7px] bg-[#1E1E1E]"></div>
          </div>
          <p className="font-[secondaryregularfont] ml-2 xl:text-[0.8vw] lg:text-[1.2vw] md:text-[1.5vw] sm:text-[1.8vw] text-[1.3vw] ">CONTACT</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
