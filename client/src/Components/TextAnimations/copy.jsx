"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(SplitText, ScrollTrigger);

const Copy = ({ children, animateOnScroll = true, delay = 0 }) => {
  const containerRef = useRef(null);
  const elementRef = useRef([]);
  const splitref = useRef([]);
  const linesRef = useRef([]);

  useGSAP(() => {
    if (!containerRef.current) return;

    splitref.current = [];
    elementRef.current = [];
    linesRef.current = [];

    let elements = [];
    if (containerRef.current.hasAttribute("data-copy-wrapper")) {
      elements = Array.from(containerRef.current.children);
    } else {
      elements = [containerRef.current];
    }

    elements.forEach((element) => {
      elementRef.current.push(element);

      const split = SplitText.create(element, {
        type: "lines",
        mask: "lines",
        linesClass: "lines++",
      });

      splitref.current.push(split);

      const computedStyle = window.getComputedStyle(element);
      const textIndent = computedStyle.textIndent;

      if (textIndent && textIndent === "0px") {
        if (split.lines && split.lines.length > 0) {
          split.lines[0].style.paddingLeft = textIndent;
        }
        element.style.textIndent = "0";
      }

      linesRef.current.push(...split.lines);
    });

    gsap.set(linesRef.current, { y: "100%" });

    ScrollTrigger.refresh(); // ✅ REQUIRED

    const animationProps = {
      y: "0%",
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      delay: delay,
    };

    if (animateOnScroll) {
      gsap.to(linesRef.current, {
        ...animationProps,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          once: true,
        },
      });
    } else {
      gsap.to(linesRef.current, animationProps);
    }

    return () => {
      splitref.current.forEach((split) => {
        if (split) split.revert();
      });
    };
  }, { scope: containerRef, dependencies: [animateOnScroll, delay] });

  return (
    <div ref={containerRef} data-copy-wrapper="true">
      {children}
    </div>
  );
};

export default Copy;
