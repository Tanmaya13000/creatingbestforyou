import React from "react";

const index = () => {
  return (
    <div className="w-full h-full ">
      {/* ================= Page 1 ================= */}
      <div className="relative w-full h-screen bg-[#9C93E8] flex flex-col p-[3vw]">
        {/* Main heading */}
        <h1 className=" font-[primaryfont] text-[10vw] ">
          Proof Over Promises
        </h1>

        {/* Subtext paragraph positioned at the bottom-right */}
        <h6 className=" absolute bottom-[3vw] right-[3vw] font-[galgo] text-[5vw] leading-[4vw] w-[70vw] ">
          In every great story, power isn’t claimed — it’s proven. This page is
          not about hype. It’s about capability. Each project below represents a
          problem faced, a strategy chosen, and a solution executed. Some are
          live projects, others are concept builds — created to demonstrate
          thinking, design depth, and execution quality. We believe ideas are
          worth nothing without structure. And structure is built through
          deliberate work.
        </h6>
      </div>

      {/* ================= Page 2 ================= */}
      <div className="w-full h-screen bg-[#1F1F1F] flex flex-col justify-between items-center p-[3vw] ">
        {/* Small heading at the top of the page */}
        <div className="w-full h-[10vw] bg-red-200  flex justify-center items-center">
          <h1 className="font-[primaryfont] text-[9vw] ">
            Work that speaks before we do
          </h1>
        </div>

        {/* Center video section */}
        <div className="w-full h-full flex items-center justify-center">
          <video
            autoPlay
            loop
            muted
            className="w-[60vw] rounded-[2vw] "
            src="/videos/v1.mp4"
          ></video>
        </div>
      </div>

      {/* ================= Page 3 ================= */}
      <div className="page3 w-full h-[70vh] bg-[#F3EFE9] flex flex-col justify-between gap-[2vw] items-center p-[3vw] ">
        {/* Page heading */}
        <div className="w-full h-[15vw] flex justify-center items-center ">
          <h1 className="font-[primaryfont] text-[10vw] text-[#DACEC1] ">
            Concept Projects
          </h1>
        </div>

        {/* Page paragraph describing the concept projects */}
        <div className="w-full h-full flex justify-center items-center ">
          <h6 className="font-[galgo] text-[4vw] text-[#DACEC1] leading-[2.5vw] text-center w-[60vw] ">
            Not all battles are fought in public. Some are prepared in silence.
            Our concept work explores ideas for brands, startups, and industries
            — showcasing how we approach design, storytelling, and systems
            before the first client ever clicks “launch.” These concepts reflect
            how we think, not just what we deliver.
          </h6>
        </div>
      </div>

      {/* ================= Page 4 ================= */}
      <div className="w-full h-screen bg-[#E0FF98] flex flex-col justify-between p-[3vw] ">
        {/* Small heading at the top */}
        <div className="w-full h-[10vw] bg-red-200  flex justify-center items-center">
          <h1 className="font-[primaryfont] text-[9vw] ">
            Work that speaks before we do
          </h1>
        </div>

        {/* Row of images */}
        <div className="flex justify-between items-center">
          {/* Individual images */}
          <img src="/Images/ps1.png" className="w-[27vw] " alt="" />
          <img src="/Images/ps2.png" className="w-[27vw] " alt="" />
          <img src="/Images/ps3.png" className="w-[27vw] " alt="" />
        </div>
      </div>

      {/* ================= Page 5 ================= */}
      <div className="page5 w-full h-[70vh] bg-[#F3EFE9] flex flex-col justify-between gap-[2vw] items-center p-[3vw] ">
        {/* Page heading */}
        <div className="w-full h-[10vw] flex justify-center items-center ">
          <h1 className="font-[primaryfont] text-[7vw] text-[#DACEC1] ">
            The Standard We Follow
          </h1>
        </div>

        {/* Paragraph explaining design philosophy */}
        <div className="w-full h-full flex justify-center items-center ">
          <h6 className="font-[galgo] text-[5vw] text-[#DACEC1] leading-[3.5vw] text-center w-[60vw] ">
            Every layout serves a purpose. <br /> Every motion carries meaning. <br /> Every
            decision earns its place. <br /> This is not decoration. <br /> This is design
            with consequence.
          </h6>
        </div>
      </div>
    </div>
  );
};

export default index;
