import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { USER_CONTACT } from "../../Components/Context/constants";

const Index = () => {
  // STATE AND REFS

  // Controls hover effect on vertical "Contact" text
  const [ishovered, setIsHovered] = useState(false);

  // Ref for heading and paragraph text section
  const textSectionRef = useRef(null);
  const [errors, setErrors] = useState({});

  // State to trigger text animation when section comes into view
  const [textVisible, setTextVisible] = useState(false);

  // Ref for form section
  const formRef = useRef(null);
  const desktopTextRef = useRef(null);
  const mobileTextRef = useRef(null);

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
          setFormVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (formRef.current) {
      observer.observe(formRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSubmit = async () => {
    const newErrors = {};

    // Full name required
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";

    // Email required + valid format
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone required + basic validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?\d{7,15}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Company required
    if (!formData.company.trim())
      newErrors.company = "Company name is required";

    // Message required
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty";

    // Set errors
    setErrors(newErrors);

    // Stop submission if there are errors
    if (Object.keys(newErrors).length > 0) return;

    // Otherwise, submit the form

    try {
      const response = await axios.post(USER_CONTACT, {
        name: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phone,
        companyName: formData.company,
        message: formData.message,
      });
      if (response.status === 201) {
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          company: "",
          message: "",
        })
      } // Your axios call here
    } catch (error) {
      console.error(error);
    }
  };

  // Observe form section to trigger animation when in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTextVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (window.innerWidth >= 1024 && desktopTextRef.current) {
      observer.observe(desktopTextRef.current);
    }

    if (window.innerWidth < 1024 && mobileTextRef.current) {
      observer.observe(mobileTextRef.current);
    }

    return () => observer.disconnect();
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

  return (
    // MAIN CONTAINER
    <div className="w-full h-full ">
      <div
        className={`relative w-full h-screen bg-[#F3EFEB] overflow-hidden z-0 max-lg:hidden  `}
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
                ref={desktopTextRef}
                // Ref observed by IntersectionObserver
                className="font-[roxhead] text-[5vw] leading-[4vw]"
              >
                {headingLines.map((line, index) => (
                  <div key={index} className="overflow-hidden">
                    <div
                      className={`transition-transform duration-[900ms] ease-out ${textVisible ? "translate-y-0" : "translate-y-full"
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
                      className={`transition-transform duration-[900ms] ease-out ${textVisible ? "translate-y-0" : "translate-y-full"
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
            className={`transition-transform duration-[900ms] ease-out ${formVisible ? "translate-y-0" : "translate-y-[80px]"
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
                  {errors.fullName && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.fullName}
                    </p>
                  )}
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
                  {errors.email && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.email}
                    </p>
                  )}
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
                  {errors.phone && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.phone}
                    </p>
                  )}
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
                  {errors.company && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.company}
                    </p>
                  )}
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
                  {errors.message && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.message}
                    </p>
                  )}
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
      <div
        className={`relative w-full h-full bg-[#F3EFEB] overflow-hidden z-0 lg:hidden`}
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
          className="font-[primaryfont] text-[8vw] md:text-[7vw] absolute top-[36vw] md:top-[38vw] left-[4vw] md:left-[3vw] leading-0 z-0 text-[#DACEC1] "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          Contact
        </h1>
        <div className="w-[65vw] md:w-[30vw] h-[0.2vw] bg-[#1F1F1F] absolute top-[30vw] md:top-[33vw] left-[4vw] md:left-[3vw]"></div>

        {/* MAIN CONTENT AREA WITH CLIP-PATH ANIMATION */}
        <div className="w-full md:h-full h-auto bg-[#E4E1DD] transition-all duration-700 ease-out z-10 max-sm:gap-[20vw] md:gap-[2vw] flex flex-col md:items-end items-start md:px-0 px-[4vw] md:py-0 py-[20vw]">
          {/* LEFT COLUMN - Vertical text */}
          <div className="w-[11vw] h-full relative hidden md:block">
            <h1 className="font-[primaryfont] text-[3.7vw] tracking-tight absolute top-[27vw] right-[65vw] whitespace-nowrap text-[#1E1E1E]">
              Let's Build Something Great
            </h1>
          </div>

          {/* MOBILE HEADING - VISIBLE ONLY ON MOBILE */}
          <div className="md:hidden w-full mb-[8vw]">
            <h1 className="font-[primaryfont] text-[8vw] tracking-tight text-[#1E1E1E] whitespace-wrap">
              Let's Build Something Great
            </h1>
          </div>

          {/* MIDDLE COLUMN - Heading and description */}
          <div className="w-full md:w-[60vw] h-auto md:h-full flex justify-center md:items-start items-start md:py-[10vw] py-0">
            <div className="w-full md:h-[21vw] h-auto flex flex-col md:justify-between justify-start items-start text-[#1E1E1E] gap-[6vw] md:gap-0">
              {/* MAIN HEADING */}
              <h1
                ref={mobileTextRef}
                className="font-[roxhead] text-[7vw] md:text-[9vw] leading-[7vw] md:leading-[6vw]"
              >
                {headingLines.map((line, index) => (
                  <div key={index} className="overflow-hidden">
                    <div
                      className={`transition-transform duration-[900ms] ease-out ${textVisible ? "translate-y-0" : "translate-y-full"
                        }`}
                      style={{ transitionDelay: `${index * 200}ms` }}
                    >
                      {line}
                    </div>
                  </div>
                ))}
              </h1>

              {/* DESCRIPTION PARAGRAPH */}
              <h6 className="font-[secondaryregularfont] text-[4vw] md:text-[2.5vw] leading-[5vw] md:leading-[2.5vw]  ">
                {paragraphLines.map((line, index) => (
                  <div key={index} className="overflow-hidden">
                    <div
                      className={`transition-transform duration-[900ms] ease-out ${textVisible ? "translate-y-0" : "translate-y-full"
                        }`}
                      style={{ transitionDelay: `${(index + 2) * 100}ms` }}
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
            ref={formRef}
            className={`transition-transform duration-[900ms] ease-out w-full md:w-[60vw] ${formVisible ? "translate-y-0" : "translate-y-[80px]"
              }`}
          >
            <div className="w-full h-full md:py-[10vw] py-0 md:pr-[7vw] pr-0 overflow-y-auto scrollbar-hide">
              <div className="w-full h-full flex flex-col gap-[2vw] md:gap-[2vw]">
                {/* FULL NAME INPUT */}
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="peer w-full bg-transparent hover:border-[#1E1E1E] border-b-2 border-[#B8B6B3] py-[3vw] md:py-[0.8vw] text-[4.5vw] md:text-[1vw] outline-none focus:border-[#1E1E1E] transition-all duration-300"
                  />
                  {/* FLOATING LABEL */}
                  <label className="absolute left-0 top-[3vw] md:top-[0.8vw] text-[4.5vw] md:text-[1vw] text-[#B8B6B3] transition-all duration-300 peer-placeholder-shown:top-[3vw] md:peer-placeholder-shown:top-[0.8vw] peer-placeholder-shown:text-[4.5vw] md:peer-placeholder-shown:text-[1vw] peer-focus:top-[-2vw] md:peer-focus:top-[-0.8vw] peer-focus:text-[3.5vw] md:peer-focus:text-[0.75vw] peer-focus:text-[#1E1E1E] peer-[:not(:placeholder-shown)]:top-[-2vw] md:peer-[:not(:placeholder-shown)]:top-[-0.8vw] peer-[:not(:placeholder-shown)]:text-[3.5vw] md:peer-[:not(:placeholder-shown)]:text-[0.75vw]">
                    Full name*
                  </label>
                  {errors.fullName && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* EMAIL INPUT */}
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="peer w-full bg-transparent hover:border-[#1E1E1E] border-b-2 border-[#B8B6B3] py-[3vw] md:py-[0.8vw] text-[4.5vw] md:text-[1vw] outline-none focus:border-[#1E1E1E] transition-all duration-300"
                  />
                  <label className="absolute left-0 top-[3vw] md:top-[0.8vw] text-[4.5vw] md:text-[1vw] text-[#B8B6B3] transition-all duration-300 peer-placeholder-shown:top-[3vw] md:peer-placeholder-shown:top-[0.8vw] peer-placeholder-shown:text-[4.5vw] md:peer-placeholder-shown:text-[1vw] peer-focus:top-[-2vw] md:peer-focus:top-[-0.8vw] peer-focus:text-[3.5vw] md:peer-focus:text-[0.75vw] peer-focus:text-[#1E1E1E] peer-[:not(:placeholder-shown)]:top-[-2vw] md:peer-[:not(:placeholder-shown)]:top-[-0.8vw] peer-[:not(:placeholder-shown)]:text-[3.5vw] md:peer-[:not(:placeholder-shown)]:text-[0.75vw]">
                    Email address*
                  </label>
                  {errors.email && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* PHONE INPUT */}
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="peer w-full bg-transparent hover:border-[#1E1E1E] border-b-2 border-[#B8B6B3] py-[3vw] md:py-[0.8vw] text-[4.5vw] md:text-[1vw] outline-none focus:border-[#1E1E1E] transition-all duration-300"
                  />
                  <label className="absolute left-0 top-[3vw] md:top-[0.8vw] text-[4.5vw] md:text-[1vw] text-[#B8B6B3] transition-all duration-300 peer-placeholder-shown:top-[3vw] md:peer-placeholder-shown:top-[0.8vw] peer-placeholder-shown:text-[4.5vw] md:peer-placeholder-shown:text-[1vw] peer-focus:top-[-2vw] md:peer-focus:top-[-0.8vw] peer-focus:text-[3.5vw] md:peer-focus:text-[0.75vw] peer-focus:text-[#1E1E1E] peer-[:not(:placeholder-shown)]:top-[-2vw] md:peer-[:not(:placeholder-shown)]:top-[-0.8vw] peer-[:not(:placeholder-shown)]:text-[3.5vw] md:peer-[:not(:placeholder-shown)]:text-[0.75vw]">
                    Phone number
                  </label>
                  {errors.phone && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* COMPANY INPUT */}
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b-2 border-[#B8B6B3] py-[3vw] md:py-[0.8vw] text-[4.5vw] md:text-[1vw] outline-none focus:border-[#1E1E1E] hover:border-[#1E1E1E] transition-all duration-300"
                  />
                  <label className="absolute left-0 top-[3vw] md:top-[0.8vw] text-[4.5vw] md:text-[1vw] text-[#B8B6B3] transition-all duration-300 peer-placeholder-shown:top-[3vw] md:peer-placeholder-shown:top-[0.8vw] peer-placeholder-shown:text-[4.5vw] md:peer-placeholder-shown:text-[1vw] hover:border-[#1E1E1E] peer-focus:top-[-2vw] md:peer-focus:top-[-0.8vw] peer-focus:text-[3.5vw] md:peer-focus:text-[0.75vw] peer-focus:text-[#1E1E1E] peer-[:not(:placeholder-shown)]:top-[-2vw] md:peer-[:not(:placeholder-shown)]:top-[-0.8vw] peer-[:not(:placeholder-shown)]:text-[3.5vw] md:peer-[:not(:placeholder-shown)]:text-[0.75vw]">
                    Company name*
                  </label>
                  {errors.company && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* MESSAGE TEXTAREA */}
                <div className="relative">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us more about your project's vision, location, size, timing, and audience."
                    rows="4"
                    className="w-full bg-transparent border-b-2 border-[#B8B6B3] p-[3vw] md:p-[0.8vw] text-[4.5vw] md:text-[1vw] outline-none hover:border-[#1E1E1E] focus:border-[#1E1E1E] transition-all duration-300 resize-none"
                  />
                  {errors.message && (
                    <p className="text-red-500 text-[0.7vw] mt-[0.2vw]">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  onClick={handleSubmit}
                  className="self-start bg-[#E0FF98] text-[#1E1E1E] px-[6vw] md:px-[2.5vw] py-[2.5vw] md:py-[0.8vw] text-[3.5vw] md:text-[0.7vw] cursor-pointer font-semibold transition-all duration-300 mt-[3vw] md:mt-[1vw]"
                >
                  NEXT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
