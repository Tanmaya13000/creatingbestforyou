// import React, { useRef } from "react";
// import styles from "@/Components/Insights/InsightPage1.module.css";
// import { SplitText } from "gsap/SplitText";
// import Matter from "matter-js";

// const InsightPage2 = () => {
//     const paragraph = useRef(null);

//     const hightlightWords = [
//         "ideas",
//         "design",
//         "systems",
//         "creativity",
//         "technology",
//         "trends",
//         "insight",
//         "inspire",
//         "journey",
//         "founder",
//         "evolve",
//         "decisions",
//         "confidence",
//     ]

//     const text = new SplitText(paragraph.current, { type: "words" });
//     const words = [ ...text.words ];

//     const { Engine, Runner, World, Bodies, Body, Events } = Matter;

//     const engine = Engine.create({
//         gravity: { x: 0, y: 0 },
//     });

//     const runner = Runner.create();
//     Runner.run(runner, engine);

//     const floor = Bodies.rectangle(
//         window.innerWidth / 2,
//         window.innerHeight + 5,
//         window.innerWidth,
//         20,
//         { isStatic: true }
//     );

//     World.add(engine.world, floor)

//     const shuffledWords = [...words];
//     for (let i = shuffledWords.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1))
//         [shuffledWords[i], shuffledWords[j] = shuffledWords[j], shuffledWords[i]]

//     };

//     const wordsToHighlight = words.filter((word) =>
//         hightlightWords.some((Highlight) => word.textContent.includes(Highlight))
//     );

//     let phychicsEnabled = false;
//     let lastProgress = 0;
//     const charElement = [];
//     const charBodies = [];

//     wordsToHighlight.forEach((word) => {
//         const chars = word.textContent.split("");
//         const wordRect = word.getBoundingClientRect();
//         const stickyRect = document.querySelector(".sticky").getBoundingClientRect();

//         word.style.opacity = 1;

//         chars.forEach((char, charIndex) => {
//             const charSpan = document.createElement("span");
//             charSpan.className = "char";
//             charSpan.textContent = char;
//             charSpan.style.position = "absolute";
//             document.querySelector("sticky").appendChild(charSpan);

//             const charWidth = word.offsetWidth / chars.length;
//             const x = wordRect.left - stickyRect.left + charIndex * charWidth;
//             const y = wordRect.top - stickyRect.top;

//             charSpan.style.left = `${x}px`
//             charSpan.style.top = `${y}px`
//             charSpan.style.color = getComputedStyle(word).color;
//             charElement.push(charSpan);

//             const body = Bodies.rectangle(
//                 x + charWidth / 2,
//                 y + charSpan.offsetHeight / 2,
//                 charWidth,
//                 charSpan.offsetHeight,
//                 {
//                     restitution: 0.75,
//                     friction: 0.5,
//                     frictionAir: 0.0175,
//                     isStatic: true,
//                 }
//             );

//             World.add(engine.world, body);
//             charBodies.push({
//                 body,
//                 element: charSpan,
//                 initialx: x,
//                 initialy: y,

//             })
//         })
//     });

//     function resetAnimation() {
//         engine.world.gravity.y = 0;

//         charBodies.forEach(({ body, element, initialx, initialy }) => {
//             Body.setStatic(body, true);
//             Body.setPosition(body, {
//                 x: initialx + element.offsetWidth / 2,
//                 y: initialy + element.offsetHeight / 2,
//             });
//             Body.setAngle(body, 0);
//             Body.setVelocity(body, { x: 0, y: 0 });
//             Body.setAngularVelocity(body, 0);

//             element.style.transform = "none";
//             element.style.opacity = 0;
//         });
//         words.forEach((word) => {
//             gsap.to(word, {
//                 opacity: 1,
//                 duration: 0.5,
//                 ease: "power2.in",
//             });
//         });
//     }

//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: ".sticky",
//             start: "top top",
//             end: `+=${window.innerHeight * 4}px`,
//             pin: true,
//             scrub: true,
//             onUpdate: (self) => {
//                 const isScrollingDown = self.progress > lastProgress;
//                 lastProgress = self.progress;

//                 if (self.progress >= 0.6 && !phychicsEnabled && isScrollingDown) {
//                     phychicsEnabled = true;
//                     engine.world.gravity.y = 1;

//                     wordsToHighlight.forEach((word) => {
//                         word.style.opacity = 0;
//                     });
//                     charBodies.forEach(({ body, element }) => {
//                         element.style.opacity = 1;
//                         element.style.color = "#FFFFFF";
//                         Body.setStatic(body, false);
//                         Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
//                         Body.setVelocity(body, {
//                             x: (Math.random() - 0.5) * 5,
//                             y: -Math.random() * 5,
//                         });
//                     });
//                     gsap.to(
//                         words.filter(
//                             (word) =>
//                                 !hightlightWords.some((hw) => word.textContent.includes(hw))
//                         ),
//                         {
//                             opacity: 0,
//                             duration: 0.5,
//                             ease: "power2.out",
//                         }
//                     );
//                 } else if (self.progress < 0.6 && phychicsEnabled && !isScrollingDown) {
//                     phychicsEnabled = false;
//                     resetAnimation();
//                 }
//             }
//         }
//     });

//     const phase1 = gsap.timeline();
//     shuffledWords.forEach((word) => {
//         phase1.to(
//             word,
//             {
//                 color: "#E4330",
//                 duration: 0.1,
//                 ease: "power2.inOut",
//             },
//             Math.random() * 0.9
//         );
//     });

//     const phase2 = gsap.timeline();
//     const shuffledHighlights = [...wordsToHighlight];
//     for (let i = shuffledHighlights.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [shuffledHighlights[i], shuffledHighlights[j]] = [
//             shuffledHighlights[j],
//             shuffledHighlights[i],
//         ];

//     }

//     shuffledHighlights.forEach((word) => {
//         phase2.to(
//             word,
//             {
//                 color: "#FFFFFF",
//                 duration: 0.1,
//                 ease: "power2.inOUt",
//             }
//         )
//     });

//     tl.add(phase1, 0).add(phase2, 1).to({}, { duration: 2 });

//     Events.on(engine, "afterUpdate", () => {
//         charBodies.forEach(({ body, element, initialx, initialy }) => {
//             if (phychicsEnabled) {
//                 const deltaX = body.position.x - (initialx + element.offsetWidth / 2);
//                 const deltaY = body.position.y - (initialy + element.position.offsetHeight / 2);
//                 element.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${body.angle}rad)`
//             }
//         });
//     });


//     return (
//         <div className="sticky w-full h-screen flex flex-col justify-start items-center p-[5vw] bg-[#9C93E8] " >
//             <h1 className={`${styles.bigText} font-[primaryfont] text-[4vw] `}
//             >
//                 We design bold strategies
//                 that produce real outcomes
//             </h1>
//             <p ref={paragraph} className={`${styles.paragraph} font-[secondaryregularfont] text-[1.8vw] text-center leading-[1.9vw] `} >
//                 This space is where we share what we learn while building, designing, and scaling digital products.
//                 From strategy and design to automation and emerging technologies, our insights are shaped by real projects, real challenges, and real results.
//                 We explore ideas that help brands grow stronger online — how thoughtful design builds trust, how smart systems improve efficiency, and how creativity combined with technology creates meaningful impact.
//                 Our goal isn’t to follow trends blindly, but to understand what truly works.
//                 Every insight here is meant to inform, inspire, and offer practical value you can apply to your own digital journey.
//                 Whether you’re a founder, a growing business, or a brand looking to evolve, these insights are written to help you make better digital decisions with clarity and confidence.
//             </p>
//         </div>
//     )
// }

// export default InsightPage2;

"use client";

import React, { useRef, useEffect } from "react";
import styles from "@/Components/Insights/InsightPage1.module.css";
import { SplitText } from "gsap/SplitText";
import Matter from "matter-js";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, SplitText);

const InsightPage2 = () => {
  const paragraph = useRef(null);

  useEffect(() => {
    if (!paragraph.current) return;

    document.fonts.ready.then(() => {
      const hightlightWords = [
        "ideas",
        "design",
        "systems",
        "creativity",
        "technology",
        "trends",
        "insight",
        "inspire",
        "journey",
        "founder",
        "evolve",
        "decisions",
        "confidence",
      ];

      const text = new SplitText(paragraph.current, { type: "words" });
      const words = [...text.words];

      const { Engine, Runner, World, Bodies, Body, Events } = Matter;

      const engine = Engine.create({ gravity: { x: 0, y: 0 } });
      const runner = Runner.create();
      Runner.run(runner, engine);

      const floor = Bodies.rectangle(
        window.innerWidth / 2,
        window.innerHeight + 50,
        window.innerWidth,
        100,
        { isStatic: true }
      );
      World.add(engine.world, floor);

      const shuffledWords = [...words].sort(() => Math.random() - 0.5);

      const wordsToHighlight = words.filter((word) =>
        hightlightWords.some((hw) =>
          word.textContent.toLowerCase().includes(hw)
        )
      );

      let phychicsEnabled = false;
      let lastProgress = 0;

      const charBodies = [];
      const stickyEl = document.querySelector(".sticky-container");

      wordsToHighlight.forEach((word) => {
        const chars = word.textContent.split("");
        const wordRect = word.getBoundingClientRect();
        const stickyRect = stickyEl.getBoundingClientRect();

        word.style.opacity = 1;

        chars.forEach((char, i) => {
          const span = document.createElement("span");
          span.className = "char";
          span.textContent = char;
          stickyEl.appendChild(span);

          const charWidth = word.offsetWidth / chars.length;
          const x = wordRect.left - stickyRect.left + i * charWidth;
          const y = wordRect.top - stickyRect.top;

          span.style.left = `${x}px`;
          span.style.top = `${y}px`;
          span.style.color = getComputedStyle(word).color;

          const body = Bodies.rectangle(
            x + charWidth / 2,
            y + span.offsetHeight / 2,
            charWidth,
            span.offsetHeight,
            {
              restitution: 0.75,
              friction: 0.5,
              frictionAir: 0.0175,
              isStatic: true,
            }
          );

          World.add(engine.world, body);

          charBodies.push({
            body,
            element: span,
            initialx: x,
            initialy: y,
          });
        });
      });

      function resetAnimation() {
        engine.world.gravity.y = 0;

        charBodies.forEach(({ body, element, initialx, initialy }) => {
          Body.setStatic(body, true);
          Body.setPosition(body, {
            x: initialx + element.offsetWidth / 2,
            y: initialy + element.offsetHeight / 2,
          });
          Body.setVelocity(body, { x: 0, y: 0 });
          Body.setAngle(body, 0);
          element.style.opacity = 0;
          element.style.transform = "none";
        });

        words.forEach((word) =>
          gsap.to(word, { opacity: 1, duration: 0.3 })
        );
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-container",
          start: "top top",
          end: `+=${window.innerHeight * 4}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const isScrollingDown = self.progress > lastProgress;
            lastProgress = self.progress;

            if (self.progress >= 0.6 && !phychicsEnabled && isScrollingDown) {
              phychicsEnabled = true;
              engine.world.gravity.y = 1;

              wordsToHighlight.forEach((w) => (w.style.opacity = 0));

              charBodies.forEach(({ body, element }) => {
                element.style.opacity = 1;
                element.style.color = "#ffffff";
                Body.setStatic(body, false);
                Body.setVelocity(body, {
                  x: (Math.random() - 0.5) * 5,
                  y: -Math.random() * 5,
                });
              });

              gsap.to(
                words.filter(
                  (w) =>
                    !hightlightWords.some((hw) =>
                      w.textContent.toLowerCase().includes(hw)
                    )
                ),
                { opacity: 0, duration: 0.4 }
              );
            }

            if (self.progress < 0.6 && phychicsEnabled && !isScrollingDown) {
              phychicsEnabled = false;
              resetAnimation();
            }
          },
        },
      });

      const phase1 = gsap.timeline();
      shuffledWords.forEach((word) => {
        phase1.to(
          word,
          { color: "#E43300", duration: 0.1 },
          Math.random()
        );
      });

      const phase2 = gsap.timeline();
      [...wordsToHighlight]
        .sort(() => Math.random() - 0.5)
        .forEach((word) => {
          phase2.to(word, { color: "#ffffff", duration: 0.1 });
        });

      tl.add(phase1, 0).add(phase2, 1).to({}, { duration: 2 });

      Events.on(engine, "afterUpdate", () => {
        charBodies.forEach(({ body, element, initialx, initialy }) => {
          if (!phychicsEnabled) return;
          element.style.transform = `translate(
            ${body.position.x - (initialx + element.offsetWidth / 2)}px,
            ${body.position.y - (initialy + element.offsetHeight / 2)}px
          ) rotate(${body.angle}rad)`;
        });
      });

      return () => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
        Engine.clear(engine);
        Runner.stop(runner);
        text.revert();
      };
    });
  }, []);

  return (
    <div className="sticky-container w-full h-screen flex flex-col items-center justify-start p-[5vw] bg-[#9C93E8]">
      <h1 className={`${styles.bigText} font-[primaryfont] text-[4vw]`}>
        We design bold strategies that produce real outcomes
      </h1>

      <p
        ref={paragraph}
        className={`${styles.paragraph} font-[secondaryregularfont] text-[1.8vw] text-center leading-[1.9vw] text-green-200`}
      >
        This space is where we share what we learn while building, designing, and
        scaling digital products. From strategy and design to automation and emerging
        technologies, our insights are shaped by real projects, real challenges, and
        real results. We explore ideas that help brands grow stronger online — how
        thoughtful design builds trust, how smart systems improve efficiency, and how
        creativity combined with technology creates meaningful impact. Our goal isn’t
        to follow trends blindly, but to understand what truly works. Every insight
        here is meant to inform, inspire, and offer practical value you can apply to
        your own digital journey. Whether you’re a founder, a growing business, or a
        brand looking to evolve, these insights are written to help you make better
        digital decisions with clarity and confidence.
      </p>
    </div>
  );
};

export default InsightPage2;
