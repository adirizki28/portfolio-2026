import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import comingSoonGif from '../assets/images/coming-soon.gif';

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center py-12">
        <h1 className="font-clash text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-300 leading-[1.15] max-w-3xl">
          Ooops Halaman ini
          <br />
          Belum Selesai di Coding
          <br />
          hehe...
        </h1>

        <img
          src={comingSoonGif}
          alt="Sedang proses coding"
          className="w-64 sm:w-80 md:w-96 mt-8 select-none pointer-events-none"
        />

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 transition"
        >
          ← Kembali ke Home
        </Link>
      </main>
    </div>
  );
}