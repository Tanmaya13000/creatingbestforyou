import React, { useRef, useEffect, useState } from "react";

const GuitarString = () => {
  const canvasRef = useRef(null);
  const [isPlucking, setIsPlucking] = useState(false);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = 150;
    const startX = canvas.width * 0.1;
    const endX = canvas.width * 0.9;
    const startY = canvas.height / 2;

    const string = new Array(points).fill(0); // displacement
    const velocity = new Array(points).fill(0); // velocity

    const k = 0.2; // spring constant
    const damping = 0.98;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics
      for (let i = 1; i < points - 1; i++) {
        const force = k * (string[i - 1] + string[i + 1] - 2 * string[i]);
        velocity[i] += force;
      }

      for (let i = 0; i < points; i++) {
        velocity[i] *= damping;
        string[i] += velocity[i];
      }

      // Draw string
      ctx.beginPath();
      for (let i = 0; i < points; i++) {
        const x = startX + (i / (points - 1)) * (endX - startX);
        const y = startY + string[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#1E1E1E";
      ctx.lineWidth = 3;
      ctx.stroke();

      requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);

  }, []);

  // Pluck the string on mouse
  const handleMouseDown = (e) => {
    setIsPlucking(true);
    setMouseX(e.clientX);
    setMouseY(e.clientY);
  };

  const handleMouseMove = (e) => {
    if (!isPlucking) return;

    const canvas = canvasRef.current;
    const points = 150;
    const startX = canvas.width * 0.1;
    const endX = canvas.width * 0.9;

    const string = canvas.string || new Array(points).fill(0);
    const velocity = canvas.velocity || new Array(points).fill(0);

    let index = Math.floor(((e.clientX - startX) / (endX - startX)) * points);
    if (index < 0) index = 0;
    if (index >= points) index = points - 1;

    const force = e.clientY - canvas.height / 2;
    velocity[index] += force * 0.2;

    canvas.string = string;
    canvas.velocity = velocity;
  };

  const handleMouseUp = () => {
    setIsPlucking(false);
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ display: "block", background: "#F3EFEB" }}
    />
  );
};

export default GuitarString;
