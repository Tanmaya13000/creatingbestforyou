// import React, { useEffect, useRef, useState } from "react";

// const Tagline = () => {
//   // Creates a reference to the section DOM element so we can observe it
//   const sectionRef = useRef(null);

//   // Tracks whether the section is visible on screen
//   const [visible, setVisible] = useState(false);

//   // Runs when the component mounts
//   useEffect(() => {
//     // Creates an intersection observer to detect when the section enters viewport
//     const observer = new IntersectionObserver(
//       (entries) => {
//         // If the section is visible, set visible state to true
//         if (entries[0].isIntersecting) {
//           setVisible(true);
//         }
//       },
//       { threshold: 0.2 } // Section becomes "visible" when 20% of it is seen
//     );

//     // Start observing the section if the reference exists
//     if (sectionRef.current) {
//       observer.observe(sectionRef.current);
//     }

//     // Cleanup: stop observing when component unmounts
//     return () => {
//       if (sectionRef.current) observer.unobserve(sectionRef.current);
//     };
//   }, []);

//   // Array of tagline lines to animate one by one
//   const lines = [
//     "Made for impact.",
//     "We design stories that",
//     "stay with your audience",
//     "long after the first",
//     "glance.",
//   ];

//   return (
//     <div
//       ref={sectionRef} // Connects this section to our observer
//       className="w-full h-screen bg-[#E0FF98] flex justify-center items-center"
//     >
//       {/* Main text wrapper */}
//       <h1 className="font-[primaryfont] text-[6vh] sm:text-[10vw] text-center leading-none text-[#1E1E1E]">
//         {/* Loop through each line of text */}
//         {lines.map((line, index) => (
//           <div key={index} className="overflow-hidden">
//             {/* Animated inner wrapper that slides up */}
//             <div
//               className={`
//                 transition-transform duration-[900ms] ease-out
//                 ${visible ? "translate-y-0" : "translate-y-full"}
//               `}
//               style={{
//                 // Adds stagger delay so lines appear one after another
//                 transitionDelay: `${index * 300}ms`,
//               }}
//             >
//               {line}
//             </div>
//           </div>
//         ))}
//       </h1>
//     </div>
//   );
// };

// export default Tagline;


"use client";

import Copy from "@/Components/TextAnimations/copy.jsx"
import React, { useEffect, useRef, useState } from "react";

const Tagline = () => {
  // Creates a reference to the section DOM element so we can observe it
  const sectionRef = useRef(null);

  // Tracks whether the section is visible on screen
  const [visible, setVisible] = useState(false);


  // Array of tagline lines to animate one by one
  const lines = [
    "Made for impact.",
    "We design stories that",
    "stay with your audience",
    "long after the first",
    "glance.",
  ];

  return (
    <div
      ref={sectionRef} // Connects this section to our observer
      className="w-full h-screen bg-[#E0FF98] flex justify-center items-center"
    >
      {/* Main text wrapper */}
      <Copy delay={0.3} >
        <h1 className="font-[primaryfont] text-[6vh] sm:text-[10vw] text-center leading-none text-[#1E1E1E]">
          Made for impact. We design stories that stay with your audience long after the first glance.
        </h1>
      </Copy>
    </div>
  );
};

export default Tagline;
