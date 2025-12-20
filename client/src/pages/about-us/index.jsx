import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const Card3D = ({ children, className }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Get mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Calculate rotation based on mouse position
    // Divide by dimensions to normalize, multiply by max tilt
    const maxTilt = 20;
    const rotateY = (x / (rect.width / 2)) * maxTilt;
    const rotateX = -(y / (rect.height / 2)) * maxTilt;
    
    // Apply smooth GSAP animation
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: "power2.out",
      transformPerspective: 1000
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.8,
      ease: "power3.out"
    });
  };

  return (
    <div 
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
};

const Index = () => {
  const shapeRef = useRef(null);
  const centerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const sectionRef = useRef(null);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  const startingClipPaths = {
    center: "polygon(45% 0px, 55% 0px, 52% 100%, 48% 100%)",
    right: "polygon(48% 0px, 52% 0px, 200% 100%, 130% 100%)",
    left: "polygon(48% 0px, 52% 0px, -38% 100%, -100% 100%)",
  };

  const endingClipPaths = {
    center: "polygon(40% 0px, 60% 0px, 51% 100%, 49% 100%)",
    right: "polygon(49% 0px, 51% 0px, 250% 100%, 0% 100%)",
    left: "polygon(49% 0px, 51% 0px, 90% 100%, -150% 100%)",
  };

  useEffect(() => {
    const tl = gsap.timeline({
      defaults: { duration: 2.6, ease: "power4.out" },
    });
    tl.fromTo(shapeRef.current, { rotate: -180 }, { rotate: 0 });
    tl.fromTo(
      centerRef.current,
      { clipPath: startingClipPaths.center },
      { clipPath: endingClipPaths.center },
      0
    );
    tl.fromTo(
      rightRef.current,
      { clipPath: startingClipPaths.right },
      { clipPath: endingClipPaths.right },
      0
    );
    tl.fromTo(
      leftRef.current,
      { clipPath: startingClipPaths.left },
      { clipPath: endingClipPaths.left },
      0
    );
  }, []);

  const handleMouseMove = (e) => {
    const centerX = window.innerWidth / 2;
    const offsetX = e.clientX - centerX;
    const maxTilt = 6;
    const tilt = (offsetX / centerX) * maxTilt;

    gsap.to(shapeRef.current, {
      rotateZ: tilt,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(shapeRef.current, {
      rotateZ: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  };

  return (
    <div className="page1 w-full h-full">
      <div
        ref={sectionRef}
        className="relative h-screen bg-[#F3EFEB] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="absolute top-0 left-0 h-screen w-screen">
          <div
            className="absolute w-[150vw] h-[150vw]"
            style={{
              left: "65%",
              top: "60%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              ref={shapeRef}
              className="absolute top-1/2 left-1/2 w-full h-full"
              style={{
                transform: "translate(-50%, -50%)",
                filter: "url(#goo)",
              }}
            >
              {/* Center */}
              <div
                ref={centerRef}
                className="absolute left-0 w-full h-full bg-[#9C93E8]"
                style={{ bottom: "49.2%" }}
              />
              {/* Right */}
              <div
                ref={rightRef}
                className="absolute left-0 w-full h-full bg-[#9C93E8]"
                style={{
                  top: "50%",
                  transformOrigin: "50% 0%",
                  transform: "rotate(60deg)",
                }}
              />
              {/* Left */}
              <div
                ref={leftRef}
                className="absolute left-0 w-full h-full bg-[#9C93E8]"
                style={{
                  top: "50%",
                  transformOrigin: "50% 0%",
                  transform: "rotate(-60deg)",
                }}
              />
            </div>
          </div>
        </div>

        <p
          className={`font-[spacebold] text-[2.6vw] leading-[2.5vw] absolute top-[20vw] left-[10vw] transition-transform duration-[900ms] ease-out ${
            visible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          Where creativity meets strategy to <br /> drive real-world results
        </p>

        {/* Single-line animated H1 */}
        <h1
          className={`text-[13.3vw] text-[#1E1E1E] font-[primaryfont] absolute bottom-0 w-full text-center leading-[0.7] transition-transform duration-[900ms] ease-out ${
            visible ? "translate-y-0" : "translate-y-full"
          }`}
        >
          CREATING BEST FOR YOU
        </h1>

        {/* Goo Filter */}
        <svg style={{ position: "absolute", width: 0, height: 0 }}>
          <defs>
            <filter id="goo">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="25"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -18"
                result="goo"
              />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </div>
      <div className="page2 w-full h-[137vh] bg-[#1E1E1E] flex flex-col pb-[5vh] pt-[10vh] px-[1vh] gap-[2vw] ">
        <div className="w-full h-[25vw] text-[#FFFFFF] flex justify-between items-center ">
          <div className="w-[27vw] h-full text-[#FFFFFF] flex justify-center items-center pl-[2vw] ">
            <p className=" font-[sohnelight] leading-[1.5vw] text-[1.3vw]  ">
              Every brand has a story worth telling. We shape that story through
              thoughtful design, engaging content, and seamless technology —
              turning ideas into experiences that build trust, spark emotion,
              and drive real business results.
            </p>
          </div>
          <div className="w-[43vw] h-full text-[#FFFFFF] flex justify-center items-center pt-[7vw] ">
            <h1 className="font-[roxhead] text-[13vw] leading-[11vw] ">
              Creativity That <br /> Drives Results
            </h1>
          </div>
          <div className="w-[20vw] h-full text-[#FFFFFF] "></div>
        </div>
        <div className="w-full h-[78vh] flex justify-between items-center p-[2vw] ">
          <Card3D className="card1 w-[30vw] h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[2vw] rounded-[2vw]">
            <div className="w-full h-[13vw] flex justify-between items-center ">
              <div className="w-[12vw] h-full  flex justify-start items-center ml-[1vw]">
                <h1 className="font-[roxhead] text-[10vw] text-[#1E1E1E] ">
                  1
                </h1>
              </div>
              <div className="w-[14vw] h-full ">
                <p className=" font-[spacelight] text-[0.9vw] text-[#1E1E1E] ">
                  We start with people, not platforms. Understanding human
                  behavior shapes every design, message, and system we create —
                  because meaningful experiences aren't just seen, they're felt
                  and remembered.
                </p>
              </div>
            </div>
            <div className="w-full h-[13vw] flex justify-start items-end ">
              <h1 className="font-[primaryfont] text-[4vw] text-[#1E1E1E] ">
                {" "}
                Designed for People{" "}
              </h1>
            </div>
          </Card3D>
          <Card3D className="card2 w-[30vw] h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[2vw] rounded-[2vw]">
            <div className="w-full h-[13vw] flex justify-between items-center ">
              <div className="w-[12vw] h-full flex justify-start items-center ml-[1vw]">
                <h1 className="font-[roxhead] text-[10vw] text-[#1E1E1E] ">
                  2
                </h1>
              </div>
              <div className="w-[14vw] h-full ">
                <p className=" font-[spacelight] text-[0.9vw] text-[#1E1E1E] ">
                  No shortcuts. No empty trends. We blend strategic thinking
                  with sharp creativity to deliver work that has clarity,
                  purpose, and measurable impact — crafted to stand out and
                  stand strong over time.
                </p>
              </div>
            </div>
            <div className="w-full h-[13vw] flex justify-start items-end ">
              <h1 className="font-[primaryfont] text-[4vw]  text-[#1E1E1E] ">
                Ideas With Purpose
              </h1>
            </div>
          </Card3D>
          <Card3D className="card3 w-[30vw] h-full bg-[#F3EFEB] flex flex-col justify-between items-center p-[2vw] rounded-[2vw]">
            <div className="w-full h-[13vw] flex justify-between items-center ">
              <div className="w-[12vw] h-full  flex justify-start items-center ml-[1vw]">
                <h1 className="font-[roxhead] text-[10vw] text-[#1E1E1E] ">
                  3
                </h1>
              </div>
              <div className="w-[14vw] h-full ">
                <p className=" font-[spacelight] text-[0.9vw] text-[#1E1E1E] ">
                  Nothing is accidental. From the first idea to the final
                  execution, every detail is deliberate — aligned to flow
                  seamlessly, perform flawlessly, and elevate the experience at
                  every touchpoint.
                </p>
              </div>
            </div>
            <div className="w-full h-[13vw] flex justify-start items-end ">
              <h1 className="font-[primaryfont] text-[4vw] text-[#1E1E1E] ">
                {" "}
                Built to Perform{" "}
              </h1>
            </div>
          </Card3D>
        </div>
      </div>
      <div className="page3 w-full h-[50vh] bg-[#E0FF98] flex justify-center items-center ">
        <h1 className="font-[roxhead] text-[6vw] leading-[4vw] text-center ">
          Nobody is good - they're only good at showing they're good. <br /> and
          that's where we come in.
        </h1>
      </div>
    </div>
  );
};

export default Index;