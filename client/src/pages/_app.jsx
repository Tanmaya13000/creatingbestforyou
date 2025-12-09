import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/Components/CommonPages/Navbar";
import Footer from "@/Components/CommonPages/Footer";
import { useEffect, useRef } from "react";

export default function App({ Component, pageProps }) {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ballX = 0;
    let ballY = 0;
    const speed = 0.15; // lower = smoother / more delay

    const mouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
      // smooth follow effect
      ballX += (mouseX - ballX) * speed;
      ballY += (mouseY - ballY) * speed;

      cursor.style.transform = `translate(${ballX - 10}px, ${ballY - 10}px)`;

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", mouseMove);
    animate();

    return () => window.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Smooth custom cursor ball */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 20,        // smaller size
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#E0FF98",
          position: "fixed",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />

      {/* Navbar */}
      <Navbar />

      {/* Main content */}
      <main className="flex-1 w-full">
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: { background: "#363636", color: "#fff" },
            success: { iconTheme: { primary: "#4ade80", secondary: "#fff" } },
            error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
          }}
        />
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
