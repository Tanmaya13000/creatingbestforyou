import React, { useEffect, useState } from "react";
// useState → used to control animation states and visibility
// useEffect → runs code automatically after component mounts

const index = () => {
  // STATE

  // Controls the first vertical reveal animation for left and right texts
  // When true → text slides up and becomes visible
  const [textVisible, setTextVisible] = useState(false);

  // Controls the second animation for horizontal movement and middle content
  // When true → side texts move horizontally, middle content fades in
  const [animate, setAnimate] = useState(false);

  // EFFECTS

  useEffect(() => {
    // FIRST animation trigger
    // After 200ms → text slides up into view
    setTimeout(() => {
      setTextVisible(true);
    }, 200);

    // SECOND animation trigger
    // After 1000ms → side texts move outward + middle content appears
    setTimeout(() => {
      setAnimate(true);
    }, 1000);
    // Empty dependency array → runs ONLY once when page loads
  }, []);

  return (
    <div className="w-full h-full">
      {/* HERO SECTION */}
      <div className="w-full h-[80vh] bg-[#F3EFEB] flex justify-center items-center">
        <div className="w-full h-[15vw] flex justify-between items-center overflow-hidden ">
          
          {/* LEFT TEXT */}
          <div className="w-[23vw] h-full flex justify-center items-center">
            <h1
              className={`font-[primaryfont] text-[10vw] overflow-hidden transition-all duration-1000 ease-in-out
                ${
                  // Vertical animation: slide up + fade in
                  textVisible
                    ? "translate-y-0 opacity-100"
                    : "translate-y-full opacity-0"
                }
                ${
                  // Horizontal animation: moves outward from center to left
                  animate ? "translate-x-0" : "translate-x-[25vw]"
                }`}
              // transitionDelay is unused here (index not defined),
              // safe to leave as it does not break animation
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              Inside
            </h1>
          </div>

          {/* MIDDLE TEXT */}
          <div className="w-[17vw] h-full flex justify-center items-center">
            <h5
              className={`font-[galgo] text-[3.7vw] leading-[3vw] w-[15vw]
              transition-all duration-700 delay-500
              ${
                // Middle content: fades in + slides up slightly
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-5"
              }`}
            >
              Thoughts, design, and technology that move businesses
            </h5>
          </div>

          {/* IMAGE */}
          <div className="w-[28vw] h-full flex justify-center items-center">
            <img
              src="/images/timeline.jpg"
              alt=""
              className={`w-[27vw] h-[9vw] rounded-xl
              transition-all duration-700 delay-500
              ${
                // Image fades in and scales slightly from 95% → 100%
                animate
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95"
              }`}
            />
          </div>

          {/* RIGHT TEXT */}
          <div className="w-[30vw] h-full flex justify-center items-center">
            <h1
              className={`font-[primaryfont] text-[10vw]
              transition-all duration-1000 ease-in-out overflow-hidden
              ${
                // Vertical reveal same as left text: slide up + fade
                textVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0"
              }
              ${
                // Horizontal animation: moves outward from center to right
                animate
                  ? "translate-x-0"
                  : "-translate-x-[25vw]"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              C B F Y
            </h1>
          </div>
        </div>
      </div>

      {/* PAGE 2 */}
      <div className="page2 w-full h-screen bg-[#9C93E8] flex flex-col justify-between p-[2vw] py-[3vw] ">
        
        {/* HEADING */}
        <div className="w-full h-[30vh]">
          <h1 className="font-[primaryfont] text-[10vw] w-[80vw] leading-[9vw] ">
            We design bold strategies that produce real outcomes
          </h1>
        </div>

        {/* PARAGRAPH */}
        <div className="w-full h-[50vh] flex justify-end items-end">
          <h6 className="font-[galgo] text-[3vw] leading-[2.5vw] w-[50vw] ">
            This space is where we share what we learn while building,
            designing, and scaling digital products. From strategy and design to
            automation and emerging technologies, our insights are shaped by
            real projects, real challenges, and real results. We explore ideas
            that help brands grow stronger online — how thoughtful design builds
            trust, how smart systems improve efficiency, and how creativity
            combined with technology creates meaningful impact. Our goal isn’t
            to follow trends blindly, but to understand what truly works. Every
            insight here is meant to inform, inspire, and offer practical value
            you can apply to your own digital journey. Whether you’re a founder,
            a growing business, or a brand looking to evolve, these insights are
            written to help you make better digital decisions with clarity and
            confidence.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default index;
