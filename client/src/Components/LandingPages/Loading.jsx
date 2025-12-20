import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
  // --------------------------
  // State to store the smooth progress value for display
  // --------------------------
  const [displayProgress, setDisplayProgress] = useState(0);

  // --------------------------
  // Ref to store the "real" progress value used by GSAP
  // We update this ref, and then set the displayProgress in onUpdate for smooth animation
  // --------------------------
  const progressRef = useRef({ value: 0 });

  // --------------------------
  // GSAP animation to smoothly increment progressRef.value from 0 to 100 over time
  // --------------------------
  useEffect(() => {
    gsap.to(progressRef.current, {
      value: 100, // target value
      duration: 4, // duration of the animation (seconds)
      ease: "power2.out", // easing function for smooth movement
      onUpdate: () => {
        // Update the React state each frame to re-render UI smoothly
        setDisplayProgress(progressRef.current.value);
      },
    });
  }, []); // run once on component mount

  // --------------------------
  // Function to determine color for each character based on progress
  // --------------------------
  const getColorForProgress = (charIndex) => {
    const text = "CREATING BEST FOR YOU"; // the text we are animating
    const totalChars = text.length; // total characters in text
    const charSection = (charIndex + 1) / totalChars; // fraction for this char (1/21, 2/21...)
    const charProgress = displayProgress / 100; // convert progress to 0-1

    // If current progress has reached this char's fraction, make it purple, else gray
    return charProgress >= charSection ? "#5040D6" : "#DACEC1";
  };

  // --------------------------
  // Text with non-breaking spaces between words
  // --------------------------
  const text = "CREATING\u00A0BEST\u00A0FOR\u00A0YOU";

  return (
    <div className="w-full h-screen flex justify-center items-center bg-[#EAE3DC]">
      <div className="w-full h-[18vw] flex flex-col justify-between items-center px-[2vw]">

        {/* ================= LOADING BAR ================= */}
        <div className="relative w-full flex justify-center items-center">
          <div className="w-[73vw] relative">
            {/* Background bar */}
            <div className="w-full h-[0.3vw] bg-[#DACEC1] mt-[3vw] relative">
              {/* Animated progress bar */}
              <div
                className="h-full bg-[#5040D6]"
                style={{ width: `${displayProgress}%` }} // width updates with progress
              />
            </div>

            {/* Percentage text */}
            <div
              className="absolute -mt-[2.5vw] font-[galgo] text-[2vw] text-[#1F1F1F]"
              style={{
                left: `${displayProgress}%`, // move along with progress
                transform: "translateX(-50%)", // center the number
              }}
            >
              {Math.round(displayProgress)}%
            </div>
          </div>
        </div>

        {/* ================= ANIMATED TEXT ================= */}
        <div className="w-full h-[10vw] flex justify-center items-center">
          <h1 className="font-[primaryfont] text-[10vw] flex">
            {text.split("").map((char, index) => (
              <span
                key={index}
                style={{
                  color: getColorForProgress(index), // color based on progress
                  transition: "color 0.15s linear", // smooth color change
                }}
              >
                {char}
              </span>
            ))}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Loading;
