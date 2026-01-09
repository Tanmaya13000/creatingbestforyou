// import React, { useEffect, useRef } from "react";
// import styles from "@/Components/LandingPages/HomePage4/HomePage4.module.css";
// import { BsArrowLeft } from "react-icons/bs";
// import { BsArrowRight } from "react-icons/bs";
// import gsap from "gsap";
// import { SplitText } from "gsap/SplitText";
// import { CustomEase } from "gsap/CustomEase";
// gsap.registerPlugin(SplitText, CustomEase);


// const HomePage4 = () => {

//     const carouselRef = useRef(null);
//     const carouselImagesRef = useRef(null);
//     const prevBtnRef = useRef(null);
//     const nextBtnRef = useRef(null);

//     const carouselSlides = [
//         {
//             title: "Quiet Mastery",
//             image: "/Images/HomePage4/1.png"
//         },
//         {
//             title: "Earned Wisdom",
//             image: "/Images/HomePage4/2.png"
//         },
//         {
//             title: "Timeless Foundations",
//             image: "/Images/HomePage4/3.png"
//         },
//         {
//             title: "Purpose Before Power",
//             image: "/Images/HomePage4/4.png"
//         },
//         {
//             title: "Crafted, Not Rushed",
//             image: "/Images/HomePage4/5.png"
//         },
//     ];

//     useEffect(() => {
//         CustomEase.create(
//             "hop",
//             "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
//         );

//         let carousel, carouselImages, prevBtn, nextBtn;
//         let currentIndex = 0;
//         let carouselTextElements = [];
//         let splitTextInstances = [];
//         let isAnimating = false;

//         function initCarousel() {
//             // ✅ Use refs instead of querySelector
//             carousel = carouselRef.current;
//             carouselImages = carouselImagesRef.current;
//             prevBtn = prevBtnRef.current;
//             nextBtn = nextBtnRef.current;

//             createCarouselTitles();
//             createInitialSlide();
//             bindCarouselControls();

//             document.fonts.ready.then(() => {
//                 splitTitles();
//                 initFirstSlide();
//             });
//         }

//         function createCarouselTitles() {
//             carouselSlides.forEach((slide) => {
//                 const slideTitleContainer = document.createElement("div");
//                 slideTitleContainer.classList.add(styles["slide-title-container"]);

//                 const slideTitle = document.createElement("h1");
//                 slideTitle.classList.add(styles.title);
//                 slideTitle.textContent = slide.title;

//                 slideTitleContainer.appendChild(slideTitle);
//                 carousel.appendChild(slideTitleContainer);

//                 carouselTextElements.push(slideTitleContainer);
//             });
//         }

//         function createInitialSlide() {
//             const initialSlideImgContainer = document.createElement("div");
//             initialSlideImgContainer.classList.add(styles.img);

//             const initialSlideImg = document.createElement("img");
//             initialSlideImg.src = carouselSlides[0].image;

//             initialSlideImgContainer.appendChild(initialSlideImg);
//             carouselImages.appendChild(initialSlideImgContainer);
//         }

//         // function splitTitles() {
//         //     carouselTextElements.forEach((slide) => {
//         //         const slideTitle = slide.querySelector(`.${styles["title"]}`);
//         //         const splitText = new SplitText(slideTitle, {
//         //             type: "words",
//         //             wordsClass: "word",
//         //         });
//         //         splitTextInstances.push(splitText);
//         //     });
//         // }

//         function splitTitles() {
//             carouselTextElements.forEach((slide, index) => {
//                 const slideTitle = slide.querySelector(`.${styles["title"]}`);
//                 const splitText = new SplitText(slideTitle, {
//                     type: "words",
//                     wordsClass: "word",
//                 });
//                 splitTextInstances.push(splitText);

//                 // ✅ Immediately hide all words except first slide
//                 if (index !== 0) {
//                     const words = slide.querySelectorAll(".word");
//                     gsap.set(words, {
//                         filter: "blur(75px)",
//                         opacity: 0,
//                     });
//                 }
//             });
//         }

//         function bindCarouselControls() {
//             // ✅ Use refs directly and attach event listeners
//             nextBtn.addEventListener("click", () => {
//                 if (isAnimating) return;
//                 currentIndex = (currentIndex + 1) % carouselSlides.length;
//                 console.log("Next button clicked");
//                 animateSlide("right");
//             });

//             prevBtn.addEventListener("click", () => {
//                 if (isAnimating) return;
//                 currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
//                 console.log('Prev button clicked');
//                 animateSlide("left");
//             });
//         }

//         function initFirstSlide() {
//             const initialSlideWords = carouselTextElements[0].querySelectorAll(".word");
//             gsap.to(initialSlideWords, {
//                 filter: "blur(0px)",
//                 opacity: 1,
//                 duration: 2,
//                 ease: "power3.out",
//             });
//         }

//         function updateActiveTextSlide() {
//             carouselTextElements.forEach((textElement, index) => {
//                 if (index !== currentIndex) {
//                     const words = textElement.querySelectorAll(".word");
//                     gsap.to(words, {
//                         filter: "blur(75px)",
//                         opacity: 0,
//                         duration: 2.5,
//                         ease: "power1.out",
//                         overwrite: true,
//                     });
//                 }
//             });

//             const currentWords = carouselTextElements[currentIndex].querySelectorAll(".word");
//             gsap.to(currentWords, {
//                 filter: "blur(0px)",
//                 opacity: 1,
//                 duration: 2,
//                 ease: "power3.out",
//                 overwrite: true,
//                 onComplete: () => {
//                     gsap.set(currentWords, {
//                         filter: "blur(0px)",
//                         opacity: 1,
//                     });
//                 }
//             });
//         }

//         function animateSlide(direction) {
//             console.log("Animating in direction:", direction);
//             if (isAnimating) return;
//             isAnimating = true;

//             const viewportWidth = window.innerWidth;
//             const slideOffset = Math.min(viewportWidth * 0.5, 500);

//             const currentSlide = carouselImages.querySelector(`.${styles["img"]}:last-child`);
//             const currentSlideImage = currentSlide.querySelector("img");

//             const newSlideImgContainer = document.createElement("div");
//             newSlideImgContainer.classList.add(styles.img);

//             const newSlideImg = document.createElement("img");
//             newSlideImg.src = carouselSlides[currentIndex].image;

//             gsap.set(newSlideImg, {
//                 x: direction === "left" ? -slideOffset : slideOffset,
//             });

//             newSlideImgContainer.appendChild(newSlideImg);
//             carouselImages.appendChild(newSlideImgContainer);

//             gsap.to(currentSlideImage, {
//                 x: direction === "left" ? slideOffset : -slideOffset,
//                 duration: 1.5,
//                 ease: "hop",
//             });

//             gsap.fromTo(newSlideImgContainer,
//                 {
//                     clipPath:
//                         direction === "left"
//                             ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
//                             : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
//                 },
//                 {
//                     clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
//                     duration: 1.5,
//                     ease: "hop",
//                     onComplete: () => {
//                         cleanupCarouselSlides();
//                         isAnimating = false;
//                     },
//                 }
//             );

//             gsap.to(newSlideImg, {
//                 x: 0,
//                 duration: 1.5,
//                 ease: "hop",
//             });

//             updateActiveTextSlide();
//         }

//         function cleanupCarouselSlides() {
//             const imgElements = carouselImages.querySelectorAll(`.${styles["img"]}`);
//             if (imgElements.length > 1) {
//                 for (let i = 0; i < imgElements.length - 1; i++) {
//                     imgElements[i].remove();
//                 }
//             }
//         }

//         initCarousel();
//     }, [])



//     return (
//         <div className={`${styles["body"]}`}>
//             <div ref={carouselRef} className={`${styles["carousel"]}`}>
//                 <div ref={carouselImagesRef} className={`${styles["carousel-images"]}`}></div>
//             </div>
//             <div className={`${styles["slider-controls"]}`}>
//                 <button ref={prevBtnRef} className={`${styles["control-btn"]} ${styles["prev-btn"]}`}>
//                     <BsArrowLeft />
//                 </button>
//                 <button ref={nextBtnRef} className={`${styles["control-btn"]} ${styles["next-btn"]}`}>
//                     <BsArrowRight />
//                 </button>
//             </div>
//             <svg
//                 viewBox="0 0 1 1"
//                 aria-hidden="true"
//                 style={{
//                     position: "absolute",
//                     zIndex: 1,
//                     opacity: 0,
//                     pointerEvents: "none",
//                 }}
//             >
//                 <defs>
//                     <filter id="blur-matrix">
//                         <feColorMatrix
//                             in="SourceGraphic"
//                             type="matrix"
//                             values="
//           1 0 0 0 0
//           0 1 0 0 0
//           0 0 1 0 0
//           0 0 0 255 -140
//         "
//                         />
//                     </filter>
//                 </defs>
//             </svg>


//         </div>
//     )
// }

// export default HomePage4;

import React, { useEffect, useRef } from "react";
import styles from "@/Components/LandingPages/HomePage4/HomePage4.module.css";
import { BsArrowLeft } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { CustomEase } from "gsap/CustomEase";
gsap.registerPlugin(SplitText, CustomEase);


const HomePage4 = () => {

    const carouselRef = useRef(null);
    const carouselImagesRef = useRef(null);
    const prevBtnRef = useRef(null);
    const nextBtnRef = useRef(null);

    const carouselSlides = [
        {
            title: "Quiet Mastery",
            image: "/Images/HomePage4/1.png"
        },
        {
            title: "Earned Wisdom",
            image: "/Images/HomePage4/2.png"
        },
        {
            title: "Timeless Foundations",
            image: "/Images/HomePage4/7.jpg"
        },
        {
            title: "Purpose Before Power",
            image: "/Images/HomePage4/4.png"
        },
        {
            title: "Crafted, Not Rushed",
            image: "/Images/HomePage4/5.png"
        },
    ];

    useEffect(() => {
        CustomEase.create(
            "hop",
            "M0,0 C0.071,0.505 0.192,0.726 0.318,0.852 0.45,0.984 0.504,1 1,1"
        );

        let carousel, carouselImages, prevBtn, nextBtn;
        let currentIndex = 0;
        let carouselTextElements = [];
        let splitTextInstances = [];
        let isAnimating = false;

        function initCarousel() {
            carousel = carouselRef.current;
            carouselImages = carouselImagesRef.current;
            prevBtn = prevBtnRef.current;
            nextBtn = nextBtnRef.current;

            createCarouselTitles();
            createInitialSlide();
            bindCarouselControls();

            document.fonts.ready.then(() => {
                splitTitles();
                initFirstSlide();
            });
        }

        function createCarouselTitles() {
            carouselSlides.forEach((slide) => {
                const slideTitleContainer = document.createElement("div");
                slideTitleContainer.classList.add(styles["slide-title-container"]);

                const slideTitle = document.createElement("h1");
                slideTitle.classList.add(styles.title);
                slideTitle.textContent = slide.title;

                slideTitleContainer.appendChild(slideTitle);
                carousel.appendChild(slideTitleContainer);

                carouselTextElements.push(slideTitleContainer);
            });
        }

        function createInitialSlide() {
            const initialSlideImgContainer = document.createElement("div");
            initialSlideImgContainer.classList.add(styles.img);

            const initialSlideImg = document.createElement("img");
            initialSlideImg.src = carouselSlides[0].image;

            initialSlideImgContainer.appendChild(initialSlideImg);
            carouselImages.appendChild(initialSlideImgContainer);
        }

        function splitTitles() {
            carouselTextElements.forEach((slide, index) => {
                const slideTitle = slide.querySelector(`.${styles["title"]}`);
                const splitText = new SplitText(slideTitle, {
                    type: "words",
                    wordsClass: "word",
                });
                splitTextInstances.push(splitText);

                if (index !== 0) {
                    const words = slide.querySelectorAll(".word");
                    gsap.set(words, {
                        filter: "blur(75px)",
                        opacity: 0,
                    });
                }
            });
        }

        function bindCarouselControls() {
            nextBtn.addEventListener("click", () => {
                if (isAnimating) return;
                currentIndex = (currentIndex + 1) % carouselSlides.length;
                animateSlide("right");
            });

            prevBtn.addEventListener("click", () => {
                if (isAnimating) return;
                currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
                animateSlide("left");
            });
        }

        function initFirstSlide() {
            const initialSlideWords = carouselTextElements[0].querySelectorAll(".word");
            gsap.to(initialSlideWords, {
                filter: "blur(0px)",
                opacity: 1,
                duration: 2,
                ease: "power3.out",
            });
        }

        function updateActiveTextSlide() {
            carouselTextElements.forEach((textElement, index) => {
                if (index !== currentIndex) {
                    const words = textElement.querySelectorAll(".word");
                    gsap.to(words, {
                        filter: "blur(75px)",
                        opacity: 0,
                        duration: 2.5,
                        ease: "power1.out",
                        overwrite: true,
                    });
                }
            });

            const currentWords = carouselTextElements[currentIndex].querySelectorAll(".word");
            gsap.to(currentWords, {
                filter: "blur(0px)",
                opacity: 1,
                duration: 2,
                ease: "power3.out",
                overwrite: true,
                onComplete: () => {
                    gsap.set(currentWords, {
                        filter: "blur(0px)",
                        opacity: 1,
                    });
                }
            });
        }

        function animateSlide(direction) {
            if (isAnimating) return;
            isAnimating = true;

            const viewportWidth = window.innerWidth;
            const slideOffset = Math.min(viewportWidth * 0.5, 500);

            const currentSlide = carouselImages.querySelector(`.${styles["img"]}:last-child`);
            const currentSlideImage = currentSlide.querySelector("img");

            const newSlideImgContainer = document.createElement("div");
            newSlideImgContainer.classList.add(styles.img);

            const newSlideImg = document.createElement("img");
            newSlideImg.src = carouselSlides[currentIndex].image;

            // Optimize: Set will-change before animation
            gsap.set([currentSlideImage, newSlideImg, newSlideImgContainer], {
                willChange: "transform, clip-path"
            });

            gsap.set(newSlideImg, {
                x: direction === "left" ? -slideOffset : slideOffset,
            });

            newSlideImgContainer.appendChild(newSlideImg);
            carouselImages.appendChild(newSlideImgContainer);

            // Create timeline for better synchronization
            const tl = gsap.timeline({
                onComplete: () => {
                    // Remove will-change after animation
                    gsap.set([currentSlideImage, newSlideImg, newSlideImgContainer], {
                        willChange: "auto"
                    });
                    cleanupCarouselSlides();
                    isAnimating = false;
                }
            });

            tl.to(currentSlideImage, {
                x: direction === "left" ? slideOffset : -slideOffset,
                duration: 1.5,
                ease: "hop",
            }, 0)
            .fromTo(newSlideImgContainer,
                {
                    clipPath:
                        direction === "left"
                            ? "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"
                            : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
                },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1.5,
                    ease: "hop",
                }, 0)
            .to(newSlideImg, {
                x: 0,
                duration: 1.5,
                ease: "hop",
            }, 0);

            updateActiveTextSlide();
        }

        function cleanupCarouselSlides() {
            const imgElements = carouselImages.querySelectorAll(`.${styles["img"]}`);
            if (imgElements.length > 1) {
                // Use requestAnimationFrame for smoother DOM manipulation
                requestAnimationFrame(() => {
                    for (let i = 0; i < imgElements.length - 1; i++) {
                        imgElements[i].remove();
                    }
                });
            }
        }

        initCarousel();

        // Cleanup event listeners on unmount
        return () => {
            if (nextBtn) nextBtn.removeEventListener("click", bindCarouselControls);
            if (prevBtn) prevBtn.removeEventListener("click", bindCarouselControls);
        };
    }, [])



    return (
        <div className={`${styles["body"]}`}>
            <div ref={carouselRef} className={`${styles["carousel"]}`}>
                <div ref={carouselImagesRef} className={`${styles["carousel-images"]}`}></div>
            </div>
            <div className={`${styles["slider-controls"]}`}>
                <button ref={prevBtnRef} className={`${styles["control-btn"]} ${styles["prev-btn"]}`}>
                    <BsArrowLeft />
                </button>
                <button ref={nextBtnRef} className={`${styles["control-btn"]} ${styles["next-btn"]}`}>
                    <BsArrowRight />
                </button>
            </div>
            <svg
                viewBox="0 0 1 1"
                aria-hidden="true"
                style={{
                    position: "absolute",
                    zIndex: 1,
                    opacity: 0,
                    pointerEvents: "none",
                }}
            >
                <defs>
                    <filter id="blur-matrix">
                        <feColorMatrix
                            in="SourceGraphic"
                            type="matrix"
                            values="
          1 0 0 0 0
          0 1 0 0 0
          0 0 1 0 0
          0 0 0 255 -140
        "
                        />
                    </filter>
                </defs>
            </svg>


        </div>
    )
}

export default HomePage4;