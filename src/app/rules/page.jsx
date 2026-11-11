'use client';

import Navbar from '@/components/Navbar';
import { BookOpen, ShieldCheck, AlertTriangle, FileText, CheckCircle, XCircle } from 'lucide-react';

export default function RulesPage() {
  return (
    <main className="min-h-screen pb-20 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-12 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-neutral-900 text-white p-8 rounded-3xl shadow-xl border border-neutral-800 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <BookOpen className="w-48 h-48" />
          </div>
          <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
            Official Guidelines & SOP
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-3 mb-2">
            Buku Panduan & Rules SANews
          </h1>
          <p className="text-neutral-400 text-sm max-w-2xl leading-relaxed">
            Dokumen resmi standar operasional prosedur (SOP), kode etik jurnalistik, regulasi kunjungan publik, dan penegakan hukum yang wajib dipatuhi oleh seluruh staf internal maupun warga kota San Andreas.
          </p>
        </div>

        {/* BAB I: KETENTUAN UMUM & PASANG IKLAN (/AD) */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="p-3 bg-red-600/10 text-red-600 rounded-2xl">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-red-600 font-bold uppercase">Bab I</span>
              <h2 className="text-xl font-black">Regulasi & Kebijakan Iklan Publik (/ad)</h2>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Iklan warga adalah layanan utama SANews untuk mempermudah transaksi jual-beli, promosi bisnis legal, atau pencarian jasa di Los Santos. Berikut adalah rincian ketentuannya:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" /> Iklan yang Diperbolehkan
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li>• Jual-beli kendaraan legal (mobil, motor, kapal, helikopter).</li>
                <li>• Promosi kepemilikan properti (rumah, ruko, apartemen).</li>
                <li>• Rekrutmen pegawai bisnis resmi / workshop kota.</li>
                <li>• Pencarian relasi, komunitas hobi, atau event publik yang sah.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-red-600">
                <XCircle className="w-4 h-4" /> Iklan yang Dilarang (Blacklist)
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li>• Promosi senjata api ilegal, komponen rakitan, atau narkotika.</li>
                <li>• Mengandung unsur SARA, hinaan, provokasi antar geng/faksi.</li>
                <li>• Menyertakan informasi berbau Meta-Gaming (MG) atau OOC.</li>
                <li>• Pesan spam berulang dalam waktu singkat (Flooding /ad).</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BAB II: KUNJUNGAN PUBLIK & KEAMANAN KANTOR */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="p-3 bg-red-600/10 text-red-600 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-red-600 font-bold uppercase">Bab II</span>
              <h2 className="text-xl font-black">Regulasi Kunjungan Publik & Pengamanan Kantor SANews</h2>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Kantor Pusat SANews adalah fasilitas publik dan zona netral yang dilindungi undang-undang kota. Seluruh warga sipil maupun anggota faksi lain yang ingin memasuki area gedung wajib mematuhi protokol keamanan ketat berikut:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-blue-600">
                <CheckCircle className="w-4 h-4" /> Prosedur Identitas & Masuk Gedung
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li>• <strong>Wajib Menunjukkan ID Card:</strong> Setiap warga yang datang ke kantor SANews untuk keperluan melapor, memasang iklan khusus, atau wawancara wajib memperlihatkan Kartu Identitas Resmi (*ID Card / License*) kepada petugas resepsionis atau security yang bertugas.</li>
                <li>• <strong>Pemeriksaan Barang (Security Check):</strong> Dilarang membawa senjata api, senjata tajam, atau benda berbahaya ke dalam area lobi dan ruang studio tanpa izin khusus dari petugas keamanan internal SANews.</li>
                <li>• <strong>Kepatuhan Zona:</strong> Pengunjung hanya diperbolehkan berada di area publik lantai 1 (Lobby / Resepsionis). Akses ke ruang redaksi, ruang server, dan studio siaran lantai atas hanya diizinkan bagi staf internal berlisensi.</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800">
              <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-red-600">
                <XCircle className="w-4 h-4" /> Larangan Ketat Bagi Publik
              </h4>
              <ul className="space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                <li>• Dilarang membuat keonaran, keributan, atau provokasi di dalam area kantor berita.</li>
                <li>• Dilarang memasuki area steril tanpa pendampingan staf SANews (dianggap sebagai tindakan trespassing / pelanggaran properti).</li>
                <li>• Dilarang merusak fasilitas kantor, komputer publik, atau mengganggu jalannya siaran langsung radio maupun televisi.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* BAB III: KODE ETIK JURNALIS STAF */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="p-3 bg-red-600/10 text-red-600 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-red-600 font-bold uppercase">Bab III</span>
              <h2 className="text-xl font-black">Kode Etik Jurnalis & Reporter Lapangan</h2>
            </div>
          </div>

          <div className="space-y-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <div className="flex gap-3">
              <span className="font-mono font-bold text-red-600">01.</span>
              <p><strong>Netralitas Mutlak:</strong> Staf SANews tidak boleh memihak atau menjadi bagian dari sindikat kriminal tertentu saat melakukan peliputan konflik bersenjata atau investigasi kriminal.</p>
            </div>
            <div className="flex gap-3">
              <span className="font-mono font-bold text-red-600">02.</span>
              <p><strong>Akurasi Fakta Berita:</strong> Setiap berita breaking news atau liputan harian wajib diverifikasi kebenarannya melalui narasumber terpercaya (SAPD, SAFD, atau saksi mata valid).</p>
            </div>
            <div className="flex gap-3">
              <span className="font-mono font-bold text-red-600">03.</span>
              <p><strong>Atribut Resmi:</strong> Wartawan wajib mengenakan seragam, ID Card pers, atau menggunakan kendaraan operasional (News Chopper / News Van) saat meliput zona merah.</p>
            </div>
          </div>
        </div>

        {/* BAB IV: SANKSI DAN PELANGGARAN (PUBLIK & STAF) */}
        <div className="bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div className="p-3 bg-yellow-500/10 text-yellow-500 rounded-2xl">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-mono text-yellow-500 font-bold uppercase">Bab IV</span>
              <h2 className="text-xl font-black">Sanksi & Tindakan Hukum (Publik & Staf)</h2>
            </div>
          </div>

          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            Pelanggaran terhadap aturan kunjungan publik, penolakan menunjukkan ID Card, atau pelanggaran internal faksi akan dikenakan tindakan tegas berikut:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-center">
              <span className="text-xs font-bold text-yellow-500 bg-yellow-500/10 px-2.5 py-1 rounded-full uppercase">Tindakan 1</span>
              <h4 className="font-bold text-sm mt-3 mb-1">Pengusiran & Skorsing</h4>
              <p className="text-xs text-neutral-500">Pengusiran paksa bagi publik yang melanggar, atau skorsing tugas bagi staf internal.</p>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-center">
              <span className="text-xs font-bold text-orange-500 bg-orange-500/10 px-2.5 py-1 rounded-full uppercase">Tindakan 2</span>
              <h4 className="font-bold text-sm mt-3 mb-1">Blacklist Akses /ad</h4>
              <p className="text-xs text-neutral-500">Pencabutan hak akses pengiriman iklan publik bagi warga yang membuat keonaran.</p>
            </div>

            <div className="bg-white dark:bg-neutral-950 p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-center">
              <span className="text-xs font-bold text-red-600 bg-red-600/10 px-2.5 py-1 rounded-full uppercase">Tindakan 3</span>
              <h4 className="font-bold text-sm mt-3 mb-1">Panggilan SAPD</h4>
              <p className="text-xs text-neutral-500">Melaporkan pelaku ke pihak San Andreas Police Department (SAPD) untuk penahanan dan denda hukum.</p>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}