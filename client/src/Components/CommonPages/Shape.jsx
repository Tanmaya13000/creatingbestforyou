import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

export default function MenuShape() {
  const [isOpen, setIsOpen] = useState(false);
  const shapeRef = useRef(null);

  // CLOSED → Invisible (collapsed to a point)
  const closedPolygon = "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)";

  // OPEN → Your custom shape like your screenshot
  const openPolygon =
    "polygon(100% 69%, 0% 0%, 64% 100%, 100% 100%)";

  useEffect(() => {
    if (!shapeRef.current) return;

    gsap.to(shapeRef.current, {
      clipPath: isOpen ? openPolygon : closedPolygon,
      duration: 1.1,
      ease: "power3.inOut",
    });
  }, [isOpen]);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">
      
      {/* Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-6 left-6 z-50 bg-white px-4 py-2 rounded-lg shadow"
      >
        Toggle Menu
      </button>

      {/* Shape */}
      <div ref={shapeRef} className="menu-shape"></div>

      {/* Content */}
      <h1 className="text-white text-5xl font-bold p-10">Your Page Here</h1>
    </div>
  );
}
