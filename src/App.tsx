import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Lenis from "lenis";
import "./style.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AboutIntro from "./components/AboutIntro";
import FeaturedWork from "./components/FeaturedWork";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComingSoon from "./pages/ComingSoon";

function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutIntro />
      <FeaturedWork />
    </>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      // Nilai lerp lebih kecil = gerakan lebih lambat, berat, dan meluncur halus (default 0.1)
      lerp: 0.055,
      // Membatasi pengali kecepatan scroll mouse & sentuhan layar agar tidak loncat jauh
      wheelMultiplier: 0.65,
      touchMultiplier: 0.75,
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Dashboard />} />

        {/* Semua rute lain yang belum jadi otomatis masuk ke sini */}
        <Route path="*" element={<ComingSoon />} />
      </Routes>
    </BrowserRouter>
  );
}
