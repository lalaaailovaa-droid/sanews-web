'use client';

import Navbar from '@/components/Navbar';
import { UserPlus, CheckCircle2, AlertCircle } from 'lucide-react';

export default function RecruitmentPage() {
  return (
    <main className="min-h-screen pb-20 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-12">
        <div className="bg-red-600 text-white p-8 rounded-3xl shadow-xl mb-8">
          <span className="bg-black/30 text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
            Open Faction Recruitment
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3 mb-2">
            Bergabung dengan Tim SANews
          </h1>
          <p className="text-red-100 text-sm max-w-xl">
            Punya bakat menulis, suka meliput berita, atau ingin jadi pembawa acara siaran langsung di Los Santos? Daftarkan dirimu sekarang!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="font-extrabold text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> Syarat Pendaftaran
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• Minimal level 3 di dalam server.</li>
              <li>• Memiliki pemahaman dasar tentang Roleplay (RP).</li>
              <li>• Aktif, sopan, dan memiliki jam terbang yang baik.</li>
              <li>• Bisa menggunakan Discord untuk koordinasi instansi.</li>
            </ul>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800">
            <h3 className="font-extrabold text-lg mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-yellow-500" /> Posisi yang Dibuka
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
              <li>• <strong>Junior Reporter:</strong> Meliput berita lapangan.</li>
              <li>• <strong>Editor:</strong> Menyunting koran & artikel kota.</li>
              <li>• <strong>Broadcaster:</strong> Mengatur siaran langsung di kota.</li>
            </ul>
          </div>
        </div>

        <div className="text-center bg-neutral-100 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800">
          <h3 className="font-extrabold text-lg mb-2">Formulir Pendaftaran In-Game / Forum</h3>
          <p className="text-xs text-neutral-500 mb-6">
            Klik tombol di bawah untuk melakukan pendaftaran diri melalui formulir yang tersedia di Discord SANews Westoria Side.
          </p>
          <a
            href="https://bit.ly/sanews-wsrp" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition text-sm"
          >
            Buka Formulir Pendaftaran ➔
          </a>
        </div>
      </div>
    </main>
  );
}