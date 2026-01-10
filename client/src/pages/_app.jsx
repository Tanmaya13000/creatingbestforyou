import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/Components/CommonPages/Navbar";
import Footer from "@/Components/CommonPages/Footer";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Loading from "@/Components/LandingPages/Loading.jsx";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

export default function App({ Component, pageProps }) {
  const [isLoading, setIsLoading] = useState(true);
  const cursorRef = useRef(null);
  const mainRef = useRef(null);
  const footerRef = useRef(null);
  const container = useRef(null);
  const router = useRouter();

  // ===================== Loading Screen Effect =====================
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      lerp: 0.08,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    return () => lenis.destroy();
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
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-S77ECMESJQ"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-S77ECMESJQ');
      </script>
      <div ref={container} className="flex flex-col min-h-screen">
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

        {isLoading ? (
          <Loading />
        ) : (
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
                  error: { iconTheme: { primary: "#ef4444", secondary: "#fff" } },
                }}
              />
              <Component {...pageProps} />
            </main>
            <footer ref={footerRef} className="relative z-0">
              <Footer />
            </footer>
          </>
        )}
      </div>
    </>
  );
}