
"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Copy from "@/Components/TextAnimations/copy";
import styles from "@/Components/LandingPages/Stickycards/Stickycards.module.css"

const HomePage3 = () => {
    const stickyCardsData = [
        {
            index: "01",
            title: "Strategy First",
            image: "/Images/stickycards/card1image.jpg",
            description: "Every successful project starts with a strong foundation. We take time to understand your business goals, target audience, and existing workflows. This allows us to plan the right structure, tools, and creative direction—so nothing is built randomly and every decision has a clear purpose."
        },
        {
            index: "02",
            title: "Design That Communicates",
            image: "/Images/stickycards/card2image.jpg",
            description: "Design is not just about aesthetics; it’s about communication. We create websites, posters, and videos that clearly convey your message, guide user attention, and build credibility. Our designs are made to support your brand story while driving real engagement and action."
        },
        {
            index: "03",
            title: "Smart Automation",
            image: "/Images/stickycards/card3image.jpg",
            description: "We use automation to eliminate repetitive manual work and connect your tools into a single, efficient system. With platforms like n8n, we design workflows that save time, reduce errors, and allow your team to focus on higher-value tasks instead of routine operations."
        },
        {
            index: "04",
            title: "Built to Scale",
            image: "/Images/stickycards/card4image.jpg",
            description: "We don’t just build for today—we build for what comes next. Our websites, automations, and creative systems are structured to adapt and scale as your business grows, making it easier to add features, expand operations, and evolve without rebuilding everything from scratch."
        }
    ]

    const container = useRef(null);

    useGSAP(() => {
        const ScrollTrigger = require("gsap/ScrollTrigger").default;
        gsap.registerPlugin(ScrollTrigger);

        const stickyCards = document.querySelectorAll(".sticky-card");
        stickyCards.forEach((card, index) => {
            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: card,
                    start: "top top",
                    endTrigger: stickyCards[stickyCards.length - 1],
                    end: "top top",
                    pin: true,
                    pinSpacing: false,
                })
            }
            if (index < stickyCards.length - 1) {
                ScrollTrigger.create({
                    trigger: stickyCards[index + 1],
                    start: "top bottom",
                    end: "top top",
                    onUpdate: (self) => {
                        const progress = self.progress;
                        const scale = 1 - progress * 0.25;
                        const rotation = (index % 2 === 0 ? 5 : -5) * progress;
                        const borderRadius = `${progress * 40}px`
                        const afterOpacity = progress;

                        gsap.set(card, {
                            scale: scale,
                            rotation: rotation,
                            borderRadius: borderRadius,
                            "--after-opacity": afterOpacity,
                        })
                    }
                })
            }
        })
    }, { scope: container });

    return (
        <div className="sticky-cards w-screen min-h-screen relative bg-[#1F1F1F] z-10 " ref={container} >
            {
                stickyCardsData.map((cardData, index) => (
                    <div
                        key={index}
                        className={`${styles.stickyCard} sticky-card relative w-full min-h-screen px-4 py-6 sm:px-6 sm:py-8 lg:px-10 lg:py-12 flex gap-6 lg:gap-10 max-sm:flex-col  ${index === 1 ? "bg-[#F7FFDC]" : index === 2 ? "bg-[#D1F3F5]" : index === 3 ? "bg-[#DDD9FF]" : "bg-[#FFDDC4]"}

  `}
                    >
                        {/* INDEX */}
                        <div className="sticky-card-index flex-[2] max-sm:flex-none flex items-start">
                            <h1
                                className=" font-[primaryfont] leading-none text-[14vw] sm:text-[10vw] md:text-[7vw] lg:text-[5vw] "
                            >
                                {cardData.index}
                            </h1>
                        </div>

                        {/* CONTENT */}
                        <div className="sticky-card-content flex-[4] flex justify-center">
                            <div
                                className=" sticky-card-content-wrapper w-full sm:w-[90%] md:w-[85%] lg:w-[75%] flex flex-col gap-4 sm:gap-6 lg:gap-8">
                                {/* TITLE */}
                                <h1
                                    className=" sticky-card-header font-[primaryfont] leading-tight text-[7vw] sm:text-[5vw] md:text-[3.5vw] lg:text-[3vw] text-[#1F1F1F]  "
                                >
                                    {cardData.title}
                                </h1>

                                {/* IMAGE */}
                                <div
                                    className=" sticky-card-image w-full sm:w-[80%] md:w-[70%] lg:w-[40vw] h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[60vh] max-w-full overflow-hidden rounded-lg "
                                >
                                    <img
                                        src={cardData.image}
                                        className="w-full h-full object-cover"
                                        alt=""
                                    />
                                </div>

                                {/* COPY */}
                                <div
                                    className=" sticky-card-copy flex gap-4 sm:gap-6 max-sm:flex-col"
                                >
                                    <div className="uppercase text-sm sm:text-base opacity-70">
                                        <p className="font-[secondaryfont] text-[#1F1F1F] ">(about the state)</p>
                                    </div>
                                
                                    <div className=" sm:text-base leading-relaxed">
                                        <p className="font-[secondaryregularfont] text-md sm:xl text-[#1F1F1F] ">{cardData.description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                ))
            }
        </div>
    )
}

export default HomePage3;