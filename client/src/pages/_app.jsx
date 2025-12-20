import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/Components/CommonPages/Navbar";
import Footer from "@/Components/CommonPages/Footer";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
// import Loading from "@/Components/LandingPages/Loading"; ❌ commented

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }) {
  // const [isLoading, setIsLoading] = useState(true); ❌ commented
  const cursorRef = useRef(null);
  const mainRef = useRef(null);
  const footerRef = useRef(null);

  // ===================== Loading Screen Effect =====================
  /*
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);
  */

  // ===================== Footer Scroll Animation =====================
  useEffect(() => {
    if (!mainRef.current || !footerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(footerRef.current, { yPercent: 100 });

      ScrollTrigger.create({
        trigger: mainRef.current,
        start: "bottom bottom",
        end: "+=100%",
        pin: true,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          gsap.to(footerRef.current, {
            yPercent: 100 - self.progress * 100,
            ease: "none",
          });
        },
      });
    });

    return () => ctx.revert();
  }, []);

  // ===================== Custom Cursor =====================
  useEffect(() => {
    const cursor = cursorRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ballX = 0;
    let ballY = 0;
    const speed = 0.15;

    const mouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const animate = () => {
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
      {/* ===================== Custom Cursor ===================== */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          backgroundColor: "#E0FF98",
          position: "fixed",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />

      {/* ===================== App Content ===================== */}
      <>
        <Navbar />

        <main ref={mainRef} className="flex-1 w-full">
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 4000,
              style: { background: "#363636", color: "#fff" },
              success: {
                iconTheme: { primary: "#4ade80", secondary: "#fff" },
              },
              error: {
                iconTheme: { primary: "#ef4444", secondary: "#fff" },
              },
            }}
          />
          <Component {...pageProps} />
        </main>

        <Footer ref={footerRef} />
      </>
    </div>
  );
}
