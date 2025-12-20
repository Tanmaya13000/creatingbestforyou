import React, { useState, useEffect, useRef } from "react";

const Index = () => {
  // STATE AND REFS

  // Controls hover effect on vertical "Contact" text
  const [ishovered, setIsHovered] = useState(false);

  // Ref for heading and paragraph text section
  const textSectionRef = useRef(null);

  // State to trigger text animation when section comes into view
  const [textVisible, setTextVisible] = useState(false);

  // Ref for form section
  const formRef = useRef(null);

  // State to trigger form animation when section comes into view
  const [formVisible, setFormVisible] = useState(false);

  // State to indicate that the page has loaded (used for initial clip-path animation)
  const [pageLoaded, setPageLoaded] = useState(false);

  // State to store form input values
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    projectType: "Corporate Event",
    message: "",
  });

  // DROPDOWN STATE
  // Controls visibility of the project type dropdown
  const [showDropdown, setShowDropdown] = useState(false);

  // Options for project type dropdown
  const projectTypes = [
    "Corporate Event",
    "Exhibition / Trade Show",
    "Roadshow",
    "Brand Activation",
    "Congress / Meeting",
    "Destination Management",
    "Sports Events",
    "Other (please specify)",
  ];

  // LINES FOR HEADING AND PARAGRAPH
  const headingLines = ["Have something in", "mind?"];
  const paragraphLines = [
    "We collaborate closely to understand",
    "your goals, refine your vision, and build",
    "digital experiences that perform as",
    "beautifully as they look.",
    "Tell us about your project, and let's",
    "create something exceptional.",
  ];

  // EFFECTS

  // Trigger page load animation after 200ms
  useEffect(() => {
    setTimeout(() => setPageLoaded(true), 200);
  }, []);

  // Observe heading/paragraph section to trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTextVisible(true);
        }
      },
      { threshold: 0.3 } // Trigger when 30% of section is visible
    );

    if (textSectionRef.current) {
      observer.observe(textSectionRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (textSectionRef.current) {
        observer.unobserve(textSectionRef.current);
      }
    };
  }, []);

  // Observe form section to trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setFormVisible(true);
        }
      },
      { threshold: 0.2 } // Trigger when 20% of form is visible
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    // Cleanup observer on unmount
    return () => {
      if (formRef.current) {
        observer.unobserve(formRef.current);
      }
    };
  }, []);

  // HANDLERS

  // Updates form state when input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Updates projectType field when an option is selected from dropdown
  const handleProjectTypeSelect = (type) => {
    setFormData((prev) => ({
      ...prev,
      projectType: type,
    }));
    setShowDropdown(false); // Close dropdown after selection
  };

  // Handles form submission
  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    // You can add API call or other logic here
  };

  return (
    // MAIN CONTAINER
    <div
      className={`relative w-full h-screen bg-[#F3EFEB] overflow-hidden z-0`}
    >
      {/* Custom CSS for hiding scrollbars */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* VERTICAL "CONTACT" TEXT ON RIGHT SIDE */}
      <h1
        className="font-[primaryfont] text-[11vw] absolute bottom-[14vw] left-[82vw] leading-0 z-0 text-[#1E1E1E] "
        onMouseEnter={() => setIsHovered(true)} // Trigger clip-path animation
        onMouseLeave={() => setIsHovered(false)}
        style={{
          transform: "rotate(-90deg)", // Rotates text vertically
        }}
      >
        Contact
      </h1>

      {/* MAIN CONTENT AREA WITH CLIP-PATH ANIMATION */}
      <div
        className="w-full h-full bg-[#E4E1DD] transition-all duration-700 ease-out z-10 gap-[2vw] flex items-center"
        style={{
          clipPath: !pageLoaded
            ? "polygon(0 0, 100% 0, 100% 100%, 0 100%)" // Full screen on load
            : ishovered
            ? "polygon(0 0, 93% 0, 90% 100%, 0 100%)" // Shrinks when hovered
            : "polygon(0 0, 94.5% 0, 92% 100%, 0 100%)", // Default clip
        }}
      >
        {/* LEFT COLUMN - Vertical text */}
        <div className="w-[11vw] h-full relative">
          <h1
            className="font-[primaryfont] text-[6vw] tracking-tight absolute bottom-[21vw] left-[-20vw] whitespace-nowrap text-[#1E1E1E] "
            style={{
              transform: "rotate(-90deg)", // Rotates text vertically
            }}
          >
            Let's Build Something Great
          </h1>
        </div>

        {/* MIDDLE COLUMN - Heading and description */}
        <div className="w-[34vw] h-full flex justify-center items-start py-[10vw]">
          <div className="w-full h-[21vw] flex flex-col justify-between items-start text-[#1E1E1E] ">
            {/* MAIN HEADING */}
            <h1
              ref={textSectionRef} // Ref observed by IntersectionObserver
              className="font-[roxhead] text-[5vw] leading-[4vw]"
            >
              {headingLines.map((line, index) => (
                <div key={index} className="overflow-hidden">
                  <div
                    className={`transition-transform duration-[900ms] ease-out ${
                      textVisible ? "translate-y-0" : "translate-y-full"
                    }`} // Slide up animation
                    style={{ transitionDelay: `${index * 200}ms` }} // Staggered effect
                  >
                    {line}
                  </div>
                </div>
              ))}
            </h1>

            {/* DESCRIPTION PARAGRAPH */}
            <h6 className="font-[secondaryregularfont] text-[1.5vw] leading-[1.8vw]">
              {paragraphLines.map((line, index) => (
                <div key={index} className="overflow-hidden">
                  <div
                    className={`transition-transform duration-[900ms] ease-out ${
                      textVisible ? "translate-y-0" : "translate-y-full"
                    }`} // Slide up animation
                    style={{ transitionDelay: `${(index + 2) * 100}ms` }} // Staggered
                  >
                    {line}
                  </div>
                </div>
              ))}
            </h6>
          </div>
        </div>

        {/* RIGHT COLUMN - FORM SECTION */}
        <div
          ref={formRef} // Ref observed by IntersectionObserver
          className={`transition-transform duration-[900ms] ease-out ${
            formVisible ? "translate-y-0" : "translate-y-[80px]"
          }`} // Slide up animation when form comes into view
        >
          <div className="w-[37vw] h-full py-[10vw] pr-[4vw] overflow-y-auto scrollbar-hide">
            <div className="w-full h-full flex flex-col gap-[2vw]">
              {/* FULL NAME INPUT */}
              <div className="relative">
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full bg-transparent hover:border-[#1E1E1E] border-b-2 border-[#B8B6B3] py-[0.8vw] text-[1vw] outline-none focus:border-[#1E1E1E] transition-all duration-300"
                />
                {/* FLOATING LABEL */}
                <label className="absolute left-0 top-[0.8vw] text-[1vw] text-[#B8B6B3] transition-all duration-300 peer-placeholder-shown:top-[0.8vw] peer-placeholder-shown:text-[1vw] peer-focus:top-[-0.8vw] peer-focus:text-[0.75vw] peer-focus:text-[#1E1E1E] peer-[:not(:placeholder-shown)]:top-[-0.8vw] peer-[:not(:placeholder-shown)]:text-[0.75vw]">
                  Full name*
                </label>
              </div>

              {/* EMAIL INPUT */}
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full bg-transparent hover:border-[#1E1E1E] border-b-2 border-[#B8B6B3] py-[0.8vw] text-[1vw] outline-none focus:border-[#1E1E1E] transition-all duration-300"
                />
                <label className="absolute left-0 top-[0.8vw] text-[1vw] text-[#B8B6B3] transition-all duration-300 peer-placeholder-shown:top-[0.8vw] peer-placeholder-shown:text-[1vw] peer-focus:top-[-0.8vw] peer-focus:text-[0.75vw] peer-focus:text-[#1E1E1E] peer-[:not(:placeholder-shown)]:top-[-0.8vw] peer-[:not(:placeholder-shown)]:text-[0.75vw]">
                  Email address*
                </label>
              </div>

              {/* PHONE INPUT */}
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full bg-transparent hover:border-[#1E1E1E] border-b-2 border-[#B8B6B3] py-[0.8vw] text-[1vw] outline-none focus:border-[#1E1E1E] transition-all duration-300"
                />
                <label className="absolute left-0 top-[0.8vw] text-[1vw] text-[#B8B6B3] transition-all duration-300 peer-placeholder-shown:top-[0.8vw] peer-placeholder-shown:text-[1vw] peer-focus:top-[-0.8vw] peer-focus:text-[0.75vw] peer-focus:text-[#1E1E1E] peer-[:not(:placeholder-shown)]:top-[-0.8vw] peer-[:not(:placeholder-shown)]:text-[0.75vw]">
                  Phone number
                </label>
              </div>

              {/* COMPANY INPUT */}
              <div className="relative">
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b-2 border-[#B8B6B3] py-[0.8vw] text-[1vw] outline-none focus:border-[#1E1E1E] hover:border-[#1E1E1E] transition-all duration-300"
                />
                <label className="absolute left-0 top-[0.8vw] text-[1vw] text-[#B8B6B3] transition-all duration-300 peer-placeholder-shown:top-[0.8vw] peer-placeholder-shown:text-[1vw] hover:border-[#1E1E1E] peer-focus:top-[-0.8vw] peer-focus:text-[0.75vw] peer-focus:text-[#1E1E1E] peer-[:not(:placeholder-shown)]:top-[-0.8vw] peer-[:not(:placeholder-shown)]:text-[0.75vw]">
                  Company name*
                </label>
              </div>

              {/* DROPDOWN FOR PROJECT TYPE */}
              <div className="relative">
                <label className="text-[0.75vw] text-[#B8B6B3] mb-[0.5vw] block">
                  Project type
                </label>
                <div
                  className="relative cursor-pointer"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {/* SELECTED VALUE AND ARROW */}
                  <div className="w-full bg-transparent border-b-2 border-[#B8B6B3] py-[0.8vw] text-[1vw] flex items-center justify-between hover:border-[#1E1E1E] transition-all duration-300">
                    <span>{formData.projectType}</span>
                    <svg
                      className={`w-[1vw] h-[1vw] transition-transform duration-300 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 16 16"
                      fill="currentColor"
                    >
                      <path d="M8 11L3 6h10l-5 5z" />
                    </svg>
                  </div>

                  {/* DROPDOWN OPTIONS */}
                  {showDropdown && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg z-50 max-h-[15vw] overflow-y-auto">
                      {projectTypes.map((type, index) => (
                        <div
                          key={index}
                          className="px-[1vw] py-[0.6vw] text-[0.9vw] hover:bg-[#B8B6B3] cursor-pointer transition-colors duration-200"
                          onClick={() => handleProjectTypeSelect(type)}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* MESSAGE TEXTAREA */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us more about your project's vision, location, size, timing, and audience."
                  rows="4"
                  className="w-full bg-transparent border-b-2 border-[#B8B6B3] p-[0.8vw] text-[1vw] outline-none hover:border-[#1E1E1E] focus:border-[#1E1E1E] transition-all duration-300 resize-none"
                />
              </div>

              {/* SUBMIT BUTTON */}
              <button
                onClick={handleSubmit}
                className="self-start bg-[#E0FF98] text-[#1E1E1E] px-[2.5vw] py-[0.8vw] text-[0.7vw] cursor-pointer font-semibold transition-all duration-300 mt-[1vw]"
              >
                NEXT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
