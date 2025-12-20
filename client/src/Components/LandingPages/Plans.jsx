import React, { useState } from "react";

const Plans = () => {
  const [hovered, setHovered] = useState(null);

  const items = ["Basic", "Standard", "Premium"];

  const content = {
    Basic: (
      <div className="text-black px-[2vw] flex flex-col gap-[1vw] text-center animate-fadeIn">
        <div>
          <h2 className="text-[4vw] font-[primaryfont] mb-[0.4vw]">Website</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            Clean modern website<br />
            SIP & goal calculators<br />
            Lead form to WhatsApp<br />
            Risk profile form<br />
            FundzBazar login<br />
            WhatsApp chat button<br />
            Booking & Blog pages
          </p>
        </div>

        <div>
          <h2 className="text-[4vw] font-[primaryfont] mb-[0.4vw]">Social Media</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            4 posts per month<br />
            4 reels per month<br />
            4 stories per month<br />
            High-quality content
          </p>
        </div>

        <div>
          <h2 className="text-[4vw] font-[primaryfont] mb-[0.4vw]">Automation</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            Lead alerts<br />
            Auto save to Sheet<br />
            Auto welcome message
          </p>
        </div>
      </div>
    ),

    Standard: (
      <div className="text-black px-[2vw] flex flex-col gap-[1vw] text-center animate-fadeIn">
        <div>
          <h2 className="text-[4vw] font-[primaryfont] mb-[0.4vw]">Website</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            Everything in Basic<br />
            Extra pages (FAQs & Guides)<br />
            Additional calculators
          </p>
        </div>

        <div>
          <h2 className="text-[4vw] font-[primaryfont] mb-[0.4vw]">Social Media</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            8 posts per month<br />
            8 reels per month<br />
            8 stories per month<br />
            Festival posts included
          </p>
        </div>

        <div>
          <h2 className="text-[4vw] font-[primaryfont] mb-[0.4vw]">Video Quality</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            High-quality videos<br />
            More quantity<br />
            Animated content
          </p>
        </div>

        <div>
          <h2 className="text-[4vw] font-[primaryfont] mb-[0.4vw]">Automation</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            All Basic features<br />
            SIP reminders<br />
            Follow-up messages<br />
            Occasion wishes
          </p>
        </div>
      </div>
    ),

    Premium: (
      <div className="text-black px-[2vw] flex flex-col gap-[1vw] text-center animate-fadeIn">
        <div>
          <h2 className="text-[4vw] font-[primaryfont] mb-[0.4vw]">Website</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            Everything in Standard<br />
            Premium polish<br />
            Extra blogs<br />
            More calculators
          </p>
        </div>

        <div>
          <h2 className="text-[4vw] leading-[5vw] font-[primaryfont] mb-[0.4vw]">Social Media</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            12 posts per month<br />
            12 reels per month<br />
            12 stories per month<br />
            Referral posters<br />
            WhatsApp content pack
          </p>
        </div>

        <div>
          <h2 className="text-[4vw] leading-[5vw] font-[primaryfont] mb-[0.4vw]">Video Quality</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            Best-quality reels<br />
            Advanced animations<br />
            Monthly market video
          </p>
        </div>

        <div>
          <h2 className="text-[4vw] leading-[5vw] font-[primaryfont] mb-[0.4vw]">Automation</h2>
          <p className="text-[1.15vw] font-[secondaryregularfont] leading-[1.4] opacity-80">
            Full automation suite<br />
            SIP reminders<br />
            Review reminders<br />
            Follow-up system<br />
            WhatsApp flows
          </p>
        </div>
      </div>
    ),
  };

  return (
    <div className="w-full h-screen bg-[#1E1E1E] flex flex-col justify-between items-center">
      <div className="w-full h-full flex justify-between items-end">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-[40vw] h-full flex justify-center items-center relative z-0"
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* SUNRAY */}
            <div
              className="absolute top-0 left-0 w-full h-full bg-[#D9F4A0] transition-all duration-[800ms] ease-out z-20 overflow-hidden"
              style={{
                clipPath:
                  hovered === index
                    ? "polygon(24% 0, 80% 0, 110% 100%, -14% 100%)"
                    : "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
              }}
            >
              {/* CONTENT WRAPPER — Centered */}
              <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 z-30">
                {hovered === index && content[item]}
              </div>
            </div>

            {/* TITLE */}
            <h1 className="font-[primaryfont] text-[7vw] underline decoration-3 text-[#E0FF98] underline-offset-[1vw] z-10 relative">
              {item}
            </h1>
          </div>
        ))}
      </div>

      {/* ANIMATION KEYFRAME */}
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
  );
};

export default Plans;
