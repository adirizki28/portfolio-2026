import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './style.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutIntro from './components/AboutIntro';
import FeaturedWork from './components/FeaturedWork';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

// Gabungan seluruh section halaman utama portfolio
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
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute publik utama: http://localhost:5173/ */}
        <Route path="/" element={<HomePage />} />

        {/* Rute login admin: http://localhost:5173/login */}
        <Route path="/login" element={<Login />} />

        {/* Rute dashboard CMS: http://localhost:5173/admin */}
        <Route path="/admin" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}