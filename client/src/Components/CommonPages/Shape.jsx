// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// const Index = () => {
//   const shapeRef = useRef(null);

//   useEffect(() => {
//     // Set initial state
//     gsap.set(shapeRef.current, {
//       scale: 0,
//       rotation: -180,
//       clipPath:
//         "polygon(73% 0%, 94% 0%, 51% 51%, 50% 53%, 27% 100%, 0% 100%, -10% 100%, 45% 45%, 46% 44%)",
//       transformOrigin: "50% 50%",
//     });

//     // Timeline for smooth overlapping animation
//     const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

//     // Scale in (duration 1s)
//     tl.to(shapeRef.current, { scale: 1, duration: 1 });

//     // Clip-path morph (duration 1.2s), starts slightly before scale finishes
//     tl.to(
//       shapeRef.current,
//       {
//         clipPath:
//           "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 47%, 49.5% 47%)",
//         duration: 1.2,
//       },
//       "-=0.6"
//     );

//     // Rotation (duration 1s), starts slightly before clip-path finishes
//     tl.to(shapeRef.current, { rotation: 0, duration: 1 }, "-=0.8");
//   }, []);

//   return (
//     <div className="w-full h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
//       {/* SVG Goo Filter */}
//       <svg style={{ position: "absolute", width: 0, height: 0 }}>
//         <defs>
//           <filter id="goo">
//             <feGaussianBlur
//               in="SourceGraphic"
//               stdDeviation="25"
//               result="blur"
//             />
//             <feColorMatrix
//               in="blur"
//               mode="matrix"
//               values="1 0 0 0 0
//                       0 1 0 0 0
//                       0 0 1 0 0
//                       0 0 0 35 -18"
//               result="goo"
//             />
//             <feBlend in="SourceGraphic" in2="goo" />
//           </filter>
//         </defs>
//       </svg>

//       {/* Filter container */}
//       <div className="w-full h-full relative" style={{ filter: "url(#goo)" }}>
//         {/* Shape */}
//         <div
//           ref={shapeRef}
//           className="absolute left-1/2 top-1/2 bg-[#9c93e8]"
//           style={{
//             width: "180vw", // added: make shape wider than viewport
//             height: "220vh", // added: make shape taller than viewport
//             transform: "translate(-50%, -50%)", // added: keep shape centered
//             clipPath:
//               "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 47%, 49.5% 47%)",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Index;

// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";

// const Index = () => {
//   const shapeRef = useRef(null);

//   useEffect(() => {
//     // Set initial state
//     gsap.set(shapeRef.current, {
//       scale: 0,
//       rotation: -180,
//       clipPath:
//         "polygon(73% 0%, 94% 0%, 51% 51%, 50% 53%, 27% 100%, 0% 100%, -10% 100%, 45% 45%, 46% 44%)",
//       transformOrigin: "50% 50%",
//     });

//     // Timeline for smooth overlapping animation
//     const tl = gsap.timeline({ defaults: { ease: "power3.inOut" } });

//     // Scale in (duration 1s)
//     tl.to(shapeRef.current, { scale: 1, duration: 1 });

//     // Clip-path morph (duration 1.2s), starts slightly before scale finishes
//     tl.to(
//       shapeRef.current,
//       {
//         clipPath:
//           "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 47%, 49.5% 47%)",
//         duration: 1.2,
//       },
//       "-=0.6"
//     );

//     // Rotation (duration 1s), starts slightly before clip-path finishes
//     tl.to(shapeRef.current, { rotation: 0, duration: 1 }, "-=0.8");
//   }, []);

//   return (
//     <div className="w-full h-screen bg-gray-100 flex items-center justify-center overflow-hidden">
//       {/* SVG Goo Filter */}
//       <svg style={{ position: "absolute", width: 0, height: 0 }}>
//         <defs>
//           <filter id="goo">
//             <feGaussianBlur
//               in="SourceGraphic"
//               stdDeviation="25"
//               result="blur"
//             />
//             <feColorMatrix
//               in="blur"
//               mode="matrix"
//               values="1 0 0 0 0
//                       0 1 0 0 0
//                       0 0 1 0 0
//                       0 0 0 35 -18"
//               result="goo"
//             />
//             <feBlend in="SourceGraphic" in2="goo" />
//           </filter>
//         </defs>
//       </svg>

//       {/* Filter container */}
//       <div className="w-full h-full relative" style={{ filter: "url(#goo)" }}>
//         {/* Shape */}
//         <div
//           ref={shapeRef}
//           className="absolute left-1/2 top-1/2 bg-[#9c93e8]"
//           style={{
//             width: "180vw", // added: make shape wider than viewport
//             height: "220vh", // added: make shape taller than viewport
//             transform: "translate(-50%, -50%)", // added: keep shape centered
//             clipPath:
//               "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 47%, 49.5% 47%)",
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default Index;


import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Index = () => {
  const shapeRef = useRef(null);

  useEffect(() => {
    // Initial state
    gsap.set(shapeRef.current, {
      scale: 0,
      rotation: -180,
      clipPath:
        "polygon(73% 0%, 94% 0%, 52.5% 49.5%, 51.5% 50.5%, 27% 100%, 0% 100%, -10% 100%, 49% 48%, 49.5% 47%)",
      transformOrigin: "50% 50%",
    });

    const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

    // Scale in
    tl.to(shapeRef.current, { scale: 1, duration: 1.2 });

    // Clip-path morph, starts slightly before scale finishes
    tl.to(
      shapeRef.current,
      {
        clipPath:
          "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 48%, 49.5% 47%)",
        duration: 1.5,
      },
      "-=0.9" // overlap more smoothly
    );

    // Rotation, overlapping perfectly
    tl.to(
      shapeRef.current,
      { rotation: 0, duration: 1.2 },
      "-=1.2" // start rotation slightly earlier for smooth continuous motion
    );
  }, []);

  return (
    <div className="w-full h-screen absolute bg-gray-100 flex items-center 
    justify-center overflow-hidden">
      {/* SVG Goo Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="25" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 35 -18"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      {/* Filter container */}
      <div className="w-full h-full relative" style={{ filter: "url(#goo)" }}>
        {/* Shape */}
        <div
          ref={shapeRef}
          className="absolute left-1/2 top-1/2 bg-[#9c93e8]"
          style={{
            width: "180vw",
            height: "220vh",
            transform: "translate(-50%, -50%)",
            clipPath:
              "polygon(88% -60%, 98% 0%, 52.5% 49.5%, 51.5% 50.5%, 75% 160%, 0% 100%, -10% 36%, 49% 48%, 49.5% 47%)",
          }}
        />
      </div>
    </div>
  );
};

export default Index;
