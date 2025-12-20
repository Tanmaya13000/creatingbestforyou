import React, { useState } from "react";
import Plans2 from "../../Components/LandingPages/Plan2.jsx";
import Page2 from "@/Components/Plans/Page2.jsx";
import Page3 from "@/Components/Plans/Page3.jsx";

const Plans = () => {
  // STATE

  // Tracks which plan item is currently hovered
  const [hovered, setHovered] = useState(null);

  // Individual hover states for each plan (used to show corresponding images & content)
  const [isFoundationHovered, setIsFoundationHovered] = useState(false);
  const [isElevationHovered, setIsElevationHovered] = useState(false);
  const [isDominanceHovered, setIsDominanceHovered] = useState(false);

  // Array of plan names to render dynamically
  const items = ["FOUNDATION", "ELEVATION", "DOMINANCE"];

  // CONTENT MAPPING
  // Each key corresponds to a plan and its detailed content
  // animate-fadeIn → applies a fade + slide-up animation when displayed
  const content = {
    FOUNDATION: (
      <div className="text-black px-[2vw] flex flex-col gap-[1.2vw] text-center animate-fadeIn">
        <h2 className="text-[3vw] font-[primaryfont]">FOUNDATION</h2>
        <p className="text-[1vw] opacity-80 font-[secondaryregularfont] italic">
          A refined and structured digital base.
        </p>

        {/* Website details */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">Website</h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            Elegant, responsive website
            <br />
            Essential, well-crafted pages
            <br />
            Clean foundational UI/UX
            <br />
            Smart lead capture with alerts
            <br />
            Customization available — pricing adjusts
          </p>
        </div>

        {/* Video Editing & Motion Graphics */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">
            Video Editing & Motion Graphics
          </h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            Branding intro/outro clips
            <br />
            Promotional reels & stories
            <br />
            Basic motion graphics
            <br />
            Custom styles available
            <br />4 reels / month
          </p>
        </div>

        {/* Poster & Graphic Design */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">
            Poster & Graphic Design
          </h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            2–4 premium posters monthly
            <br />
            Campaign & promotional graphics
            <br />
            Brand-aligned visuals
            <br />
            Customization available
            <br />4 posts / month
          </p>
        </div>

        {/* Automation (n8n) */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">Automation (n8n)</h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            Lead capture with alerts
            <br />
            Auto-save to Sheets/CRM
            <br />
            Basic welcome flows
            <br />
            Advanced automation available
          </p>
        </div>
      </div>
    ),

    ELEVATION: (
      <div className="text-black px-[2vw] flex flex-col gap-[1.2vw] text-center animate-fadeIn">
        <h2 className="text-[3vw] font-[primaryfont]">ELEVATION</h2>
        <p className="text-[1vw] opacity-80 font-[secondaryregularfont] italic">
          Strengthening your brand across every platform.
        </p>

        {/* Website */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">Website</h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            All features from Foundation
            <br />
            Additional pages (FAQs, Blog, Portfolio)
            <br />
            Enhanced UI/UX polish
            <br />
            Industry-specific tools
            <br />
            Fully customizable
          </p>
        </div>

        {/* Video Editing & Motion Graphics */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">
            Video Editing & Motion Graphics
          </h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            5–8 videos per month
            <br />
            Advanced animations
            <br />
            Campaign-focused videos
            <br />
            Customizable creative direction
            <br />8 reels / month
          </p>
        </div>

        {/* Poster & Graphic Design */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">
            Poster & Graphic Design
          </h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            6–8 posters per month
            <br />
            Festival & seasonal creatives
            <br />
            Promotional & referral designs
            <br />
            Custom requests accepted
            <br />8 posts / month
          </p>
        </div>

        {/* Automation */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">Automation (n8n)</h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            All Foundation features
            <br />
            Follow-up sequences
            <br />
            Reminder systems
            <br />
            Lead nurturing workflows
            <br />
            Advanced setups available
          </p>
        </div>
      </div>
    ),

    DOMINANCE: (
      <div className="text-black px-[2vw] flex flex-col gap-[1.2vw] text-center animate-fadeIn">
        <h2 className="text-[3vw] font-[primaryfont]">DOMINANCE</h2>
        <p className="text-[1vw] opacity-80 font-[secondaryregularfont] italic">
          A complete digital ecosystem built for scale.
        </p>

        {/* Website */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">Website</h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            Everything from Elevation
            <br />
            Premium high-polish UI/UX
            <br />
            Advanced systems & portals
            <br />
            Monthly website updates
            <br />
            Fully tailored to your scale
          </p>
        </div>

        {/* Video Editing & Motion Graphics */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">
            Video Editing & Motion Graphics
          </h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            10–12 videos per month
            <br />
            Advanced effects
            <br />
            Monthly brand highlight videos
            <br />
            Creative direction included
            <br />
            12 reels / month
          </p>
        </div>

        {/* Poster & Graphic Design */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">
            Poster & Graphic Design
          </h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            10–12 premium posters monthly
            <br />
            Referral & promo campaigns
            <br />
            Full brand design kit
            <br />
            Custom creative requests
            <br />
            12 posts / month
          </p>
        </div>

        {/* Automation */}
        <div>
          <h3 className="text-[2.3vw] font-[primaryfont]">Automation (n8n)</h3>
          <p className="text-[0.85vw] opacity-80 leading-[1.35] font-[secondaryregularfont]">
            Complete automation ecosystem
            <br />
            Lead scoring & segmentation
            <br />
            Drip campaigns & reminders
            <br />
            Custom WhatsApp flows
            <br />
            Advanced workflow design
          </p>
        </div>
      </div>
    ),
  };

  return (
    <div className="w-full h-full ">
      {/* Reusable Components */}
      <Plans2 />
      <Page2 />
      <Page3 />

      {/* PLANS SECTION */}
      <div className="relative w-full h-screen bg-[#1E1E1E] flex flex-col justify-between items-center">
        {/* Page Title */}
        <h1
          className={`absolute top-0 font-[primaryfont] text-[10vw] text-[#D9F4A0] z-20 ${
            isFoundationHovered || isElevationHovered || isDominanceHovered
              ? "hidden"
              : ""
          }`}
        >
          Plans
        </h1>

        {/* Hover Images */}
        <img
          src="/Images/1.png"
          className={`absolute w-full h-full object-cover z-5 ${
            isFoundationHovered ? "" : "hidden"
          }`}
          alt=""
        />
        <img
          src="/Images/3.jpg"
          className={`absolute w-full h-full object-cover z-5 ${
            isElevationHovered ? "" : "hidden"
          }`}
          alt=""
        />
        <img
          src="/Images/2.png"
          className={`absolute w-full h-full object-cover z-5 ${
            isDominanceHovered ? "" : "hidden"
          }`}
          alt=""
        />

        {/* PLAN ITEMS */}
        <div className="w-full h-full flex justify-between items-end z-10">
          {items.map((item, index) => (
            <div
              key={index}
              className="w-[40vw] h-full flex justify-center items-center relative z-10"
              onMouseEnter={() => {
                setHovered(index);
                if (item === "FOUNDATION") setIsFoundationHovered(true);
                if (item === "ELEVATION") setIsElevationHovered(true);
                if (item === "DOMINANCE") setIsDominanceHovered(true);
              }}
              onMouseLeave={() => {
                setHovered(null);
                setIsFoundationHovered(false);
                setIsElevationHovered(false);
                setIsDominanceHovered(false);
              }}
            >
              {/* SUNRAY EFFECT */}
              <div
                className="absolute top-0 left-0 w-full h-full bg-[#D9F4A0] transition-all duration-[800ms] ease-out z-20 overflow-hidden"
                style={{
                  clipPath:
                    hovered === index
                      ? "polygon(24% 0, 80% 0, 110% 100%, -14% 100%)" // Sunray expands when hovered
                      : "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", // Collapsed state
                }}
              >
                {/* Hovered plan content in center */}
                <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-30">
                  {hovered === index && content[item]}
                </div>
              </div>

              {/* PLAN TITLE */}
              <h1 className="font-[primaryfont] text-[7vw] underline decoration-3 text-[#E0FF98] underline-offset-[1vw] z-10 relative">
                {item}
              </h1>
            </div>
          ))}
        </div>

        {/* FADE-IN ANIMATION */}
        <style>{`
          @keyframes fadeIn {
            0% { opacity: 0; transform: translateY(1vw); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Plans;
