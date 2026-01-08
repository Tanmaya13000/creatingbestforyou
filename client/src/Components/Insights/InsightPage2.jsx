// import React, { useEffect } from "react";
// import styles from "@/Components/Insights/InsightPage1.module.css";
// import gsap from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

// const InsightPage2 = () => {

//   useEffect(() => {
//     gsap.registerPlugin(ScrollTrigger);
//     gsap.ticker.lagSmoothing(0);

//     const textElements = document.querySelectorAll(`.${styles["animate-text"]}`);

//     textElements.forEach((el) => {
//       el.setAttribute("data-text", el.textContent.trim());

//       ScrollTrigger.create({
//         trigger: el,
//         start: "top 50%",
//         end: "bottom 50%",
//         scrub: true,
//         onUpdate: (self) => {
//           const clipValue = 100 - self.progress * 100;
//           el.style.setProperty("--clip-value", `${clipValue}%`);
//         },
//       });
//     });

//     const headers = document.querySelectorAll(`.${styles["services-header"]}`);

//     // initial GSAP positions (NOT CSS)
//     gsap.set(headers[0], { x: "100%" });
//     gsap.set(headers[1], { x: "-100%" });
//     gsap.set(headers[2], { x: "100%" });

//     ScrollTrigger.create({
//       trigger: `.${styles.services}`,
//       start: "top bottom",
//       end: "top top",
//       scrub: true,
//       onUpdate: (self) => {
//         gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
//         gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
//         gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
//       },
//     });

//     ScrollTrigger.create({
//       trigger: `.${styles.services}`,
//       start: "top top",
//       end: `+=${window.innerHeight * 2}`,
//       pin: true,
//       scrub: 1,
//       pinSpacing: false,
//       onUpdate: (self) => {
//         const headers = document.querySelectorAll(`.${styles["services-header"]}`);

//         if (self.progress <= 0.5) {
//           const yProgress = self.progress / 0.5;
//           gsap.set(headers[0], { y: `${yProgress * 100}%` });
//           gsap.set(headers[2], { y: `${yProgress * -100}%` });
//         } else {
//           gsap.set(headers[0], { y: "100%" });
//           gsap.set(headers[2], { y: "-100%" });

//           const scaleProgress = (self.progress - 0.5) / 0.5;
//           const minScale = window.innerWidth <= 1000 ? 0.3 : 0.1;
//           const scale = 1 - scaleProgress * (1 - minScale);

//           headers.forEach((header) => gsap.set(header, { scale }));
//         }
//       },
//     });

//     ScrollTrigger.refresh();
//   }, []);

//   return (
//     <div className={`${styles["body"]}`}>
//       <div className={`${styles["about"]}`}>
//         <h1 className={`${styles["animate-text"]}`}>
//           We share what we learn while building and scaling digital products. From strategy to tech, our insights come from real projects and results. We show how design builds trust, systems boost efficiency, and creativity drives impact. No trends—just what works. Every insight helps you make smarter digital decisions with confidence.
//         </h1>
//       </div>
//       <div className={`${styles["services"]}  `}>
//         <div className={`${styles["services-header"]}`}>
//           <img src="/Images/spr.svg" alt="" />
//         </div>
//         <div className={`${styles["services-header"]}`}>
//           <img src="/Images/spr.svg" alt="" />
//         </div>
//         <div className={`${styles["services-header"]}`}>
//           <img src="/Images/spr.svg" alt="" />
//         </div>
//       </div>
//       <div className={`${styles["services-copy"]}`}>
//         <h1 className={`${styles["animate-text"]}`}>
//           We share what we learn while building and scaling digital products. From strategy to tech, our insights come from real projects and results. We show how design builds trust, systems boost efficiency, and creativity drives impact. No trends—just what works. Every insight helps you make smarter digital decisions with confidence.
//         </h1>
//       </div>
//     </div>
//   )
// }

// export default InsightPage2; 


import React, { useEffect } from "react";
import styles from "@/Components/Insights/InsightPage1.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const InsightPage2 = () => {

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.ticker.lagSmoothing(0);

    const textElements = document.querySelectorAll(`.${styles["animate-text"]}`);

    textElements.forEach((el) => {
      el.setAttribute("data-text", el.textContent.trim());
      ScrollTrigger.create({
        trigger: el,
        start: "top 50%",
        end: "bottom 50%",
        scrub: true,
        onUpdate: (self) => {
          const clipValue = 100 - self.progress * 100;
          el.style.setProperty("--clip-value", `${clipValue}%`);
        },
      });
    });

    const headers = document.querySelectorAll(`.${styles["services-header"]}`);

    // Initialize everything explicitly
    gsap.set(headers[0], { x: "100%", y: "0%", scale: 1  });
    gsap.set(headers[1], { x: "-100%", y: "0%", scale: 1   });
    gsap.set(headers[2], { x: "100%", y: "0%", scale: 1  });

    // Horizontal slide-in
    ScrollTrigger.create({
      trigger: `.${styles.services}`,
      start: "top bottom",
      end: "top top",
      scrub: true,
      onUpdate: (self) => {
        gsap.set(headers[0], { x: `${100 - self.progress * 100}%` });
        gsap.set(headers[1], { x: `${-100 + self.progress * 100}%` });
        gsap.set(headers[2], { x: `${100 - self.progress * 100}%` });
      },
    });

    // Pinning + vertical + scale
    ScrollTrigger.create({
      trigger: `.${styles.services}`,
      start: "top top",
      end: `+=${window.innerHeight * 2}`,
      pin: true,
      scrub: 1,
      pinSpacing: false,
      anticipatePin: 1, // ✅ KEY FIX
      invalidateOnRefresh: true, // ✅ HELPS WITH RECALCULATION
      onUpdate: (self) => {
        if (self.progress <= 0.5) {
          const yProgress = self.progress / 0.5;
          gsap.set(headers[0], { y: `${yProgress * 100}%`, scale: 1  });
          gsap.set(headers[1], { y: "0%", scale: 1   });
          gsap.set(headers[2], { y: `${yProgress * -100}%`, scale: 1   });
        } else {
          const scaleProgress = (self.progress - 0.5) / 0.5;
          const minScale = window.innerWidth <= 1000 ? 0.7 : 0.5;
          const scale = 1  - scaleProgress * (1   - minScale);

          gsap.set(headers[0], { y: "100%", scale });
          gsap.set(headers[1], { y: "0%", scale });
          gsap.set(headers[2], { y: "-100%", scale });
        }
      },
    });

    // Refresh after setup
    setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);
  return (
    <div className={`${styles["body"]}`}>
      {/* <div className={`${styles["about"]}`}>
        <h1 className={`${styles["animate-text"]}`}>
          We share what we learn while building and scaling digital products. From strategy to tech, our insights come from real projects and results. We show how design builds trust, systems boost efficiency, and creativity drives impact. No trends—just what works. Every insight helps you make smarter digital decisions with confidence.
        </h1>
      </div> */}
      <div className={`${styles["services"]}  `}>
        <div className={`${styles["services-header"]}`}>
          <img src="/Images/spr.svg" alt="" />
        </div>
        <div className={`${styles["services-header"]}`}>
          <img src="/Images/spr.svg" alt="" />
        </div>
        <div className={`${styles["services-header"]}`}>
          <img src="/Images/spr.svg" alt="" />
        </div>
      </div>
      <div className={`${styles["services-copy"]}`}>
        <h1 className={`${styles["animate-text"]}`}>
          We share what we learn while building and scaling digital products. From strategy to tech, our insights come from real projects and results. We show how design builds trust, systems boost efficiency, and creativity drives impact. No trends—just what works. Every insight helps you make smarter digital decisions with confidence.
        </h1>
      </div>
    </div>
  )
}

export default InsightPage2; 