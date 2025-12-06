import "@/styles/globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/Components/CommonPages/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <div className="flex flex-col min-h-screen">
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
      {/* <Footer /> */}
    </div>
  );
}
