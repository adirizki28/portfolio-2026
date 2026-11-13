import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavItem {
  label: string;
  to: string;
}

const navLinks: NavItem[] = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="relative mx-auto max-w-300 px-4">
        <nav className="py-3.5">
          <div className="flex items-center justify-between">
            {/* Brand / Nama */}
            <Link to="/" className="font-clash text-xl font-semibold tracking-tight text-black">
              Adi Rizki
            </Link>

            {/* Menu Desktop */}
            <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="hover:text-black transition">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Tombol CTA Desktop */}
            <Link
              to="/contact"
              className="hidden md:inline-flex items-center bg-black text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-neutral-800 transition"
            >
              Let&apos;s Talk
            </Link>

            {/* Tombol Hamburger Menu (Mobile) */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
              className="md:hidden p-2 rounded-lg text-black hover:bg-neutral-100 focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Dropdown Menu Mobile */}
        {isOpen && (
          <div className="md:hidden absolute left-4 right-4 top-full mt-2 bg-black/95 backdrop-blur-md text-white rounded-3xl p-6 border border-neutral-800 shadow-2xl z-50">
            <ul className="flex flex-col gap-4 text-base text-neutral-300">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className="block py-1 hover:text-white transition"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-neutral-800">
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center bg-white text-black font-medium py-3 rounded-full hover:bg-neutral-200 transition"
              >
                Let&apos;s Talk
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}