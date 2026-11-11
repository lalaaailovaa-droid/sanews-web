'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X, Radio, UserPlus, BookOpen, Users, Calendar } from 'lucide-react';

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo SANews */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="bg-red-600 text-white p-2 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer">
              <Radio className="w-5 h-5 animate-pulse" />
              <span className="tracking-widest">SANEWS</span>
            </Link>
            <span className="hidden sm:inline text-[10px] font-black px-2.5 py-1 bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400 rounded-lg uppercase tracking-wider">
              LIVE RP
            </span>
          </div>

          {/* Menu Desktop untuk Warga */}
          <div className="hidden md:flex items-center space-x-5 font-bold text-sm text-neutral-600 dark:text-neutral-300">
            <Link href="/" className="hover:text-red-600 dark:hover:text-red-500 transition">
              Beranda
            </Link>
            <Link href="/recruitment" className="hover:text-red-600 dark:hover:text-red-500 transition flex items-center gap-1.5">
              <UserPlus className="w-4 h-4 text-red-600" /> Recruitment
            </Link>
            <Link href="/rules" className="hover:text-red-600 dark:hover:text-red-500 transition flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-red-600" /> Rules
            </Link>
            <Link href="/roster" className="hover:text-red-600 dark:hover:text-red-500 transition flex items-center gap-1.5">
              <Users className="w-4 h-4 text-red-600" /> Struktur Jabatan
            </Link>
            <Link href="/schedule" className="hover:text-red-600 dark:hover:text-red-500 transition flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-red-600" /> Jadwal Siaran
            </Link>
          </div>

          {/* Tombol Dark Mode & Hamburger HP */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition shadow-sm cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-neutral-700" />}
            </button>

            {/* Tombol Hamburger HP */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200 shadow-sm cursor-pointer"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Menu Dropdown untuk HP */}
      {isOpen && (
        <div className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 px-4 pt-4 pb-6 space-y-2 shadow-2xl">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="block py-3 px-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold text-sm"
          >
            🏠 Beranda Portal
          </Link>
          <Link 
            href="/recruitment" 
            onClick={() => setIsOpen(false)}
            className="block py-3 px-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold text-sm"
          >
            📝 Recruitment Faksi
          </Link>
          <Link 
            href="/rules" 
            onClick={() => setIsOpen(false)}
            className="block py-3 px-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold text-sm"
          >
            📜 Rules & Kebijakan
          </Link>
          <Link 
            href="/roster" 
            onClick={() => setIsOpen(false)}
            className="block py-3 px-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold text-sm"
          >
            👥 Struktur Jabatan / Roster
          </Link>
          <Link 
            href="/schedule" 
            onClick={() => setIsOpen(false)}
            className="block py-3 px-4 rounded-xl hover:bg-neutral-100 dark:hover:bg-neutral-900 font-bold text-sm"
          >
            📅 Jadwal Siaran (Schedule)
          </Link>
        </div>
      )}
    </nav>
  );
}