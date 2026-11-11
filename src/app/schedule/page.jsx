'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Calendar, Radio, Clock, User, Plus, Trash2, Edit3, Lock, Unlock, X } from 'lucide-react';

const INITIAL_SCHEDULE = [
  {
    id: 1,
    time: '16:00 - 18:00 WIB',
    program: 'Los Santos Morning News & Weather',
    host: 'Ailaa Yaverlyn',
    frequency: '94.6 FM Radio',
    category: 'News'
  },
  {
    id: 2,
    time: '20:00 - 22:00 WIB',
    program: 'Vinewood Music Hour & Requests',
    host: 'Marcus Vance',
    frequency: '94.6 FM Radio',
    category: 'Entertainment'
  },
  {
    id: 3,
    time: '21:30 - Selesai',
    program: 'Special Report: SAPD Crime Update',
    host: 'Sarah Jenkins',
    frequency: 'Live TV & Radio',
    category: 'Breaking'
  }
];

export default function SchedulePage() {
  const [schedule, setSchedule] = useState(INITIAL_SCHEDULE);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [time, setTime] = useState('');
  const [program, setProgram] = useState('');
  const [host, setHost] = useState('');
  const [frequency, setFrequency] = useState('94.6 FM Radio');
  const [category, setCategory] = useState('News');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('sanews_schedule');
    if (saved) setSchedule(JSON.parse(saved));
    const auth = localStorage.getItem('sanews_admin_logged');
    if (auth === 'true') setIsLoggedIn(true);
  }, []);

  const saveToStorage = (updated) => {
    setSchedule(updated);
    localStorage.setItem('sanews_schedule', JSON.stringify(updated));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (pinInput === 'SANWEST-144') {
      setIsLoggedIn(true);
      localStorage.setItem('sanews_admin_logged', 'true');
      setShowPinModal(false);
      setPinInput('');
      alert('Login Staff Berhasil!');
    } else {
      alert('PIN Salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sanews_admin_logged');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!time || !program || !host) return alert('Waktu, Nama Program, dan Penyiar wajib diisi!');

    const newItem = {
      id: editingId || Date.now(),
      time,
      program,
      host,
      frequency,
      category
    };

    let updated;
    if (editingId) {
      updated = schedule.map(item => item.id === editingId ? newItem : item);
    } else {
      updated = [...schedule, newItem];
    }

    saveToStorage(updated);
    resetForm();
  };

  const handleDelete = (id) => {
    if (confirm('Hapus jadwal siaran ini?')) {
      const updated = schedule.filter(item => item.id !== id);
      saveToStorage(updated);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setTime(item.time);
    setProgram(item.program);
    setHost(item.host);
    setFrequency(item.frequency);
    setCategory(item.category);
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setTime('');
    setProgram('');
    setHost('');
    setFrequency('94.6 FM Radio');
    setCategory('News');
    setShowForm(false);
  };

  return (
    <main className="min-h-screen pb-20 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-12 space-y-8">
        
        {/* Header Banner */}
        <div className="bg-neutral-900 text-white p-8 rounded-3xl shadow-xl border border-neutral-800 flex flex-wrap justify-between items-center gap-4 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-10">
            <Radio className="w-48 h-48" />
          </div>
          <div>
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
              Live Broadcast Schedule
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mt-3 mb-2">
              Jadwal Siaran & Program SANews
            </h1>
            <p className="text-neutral-400 text-sm max-w-xl leading-relaxed">
              Daftar jam tayang siaran radio 94.6 FM, program bincang-bincang, dan liputan khusus kota Los Santos.
            </p>
          </div>

          {/* Tombol Kontrol Staff */}
          <div className="flex items-center gap-2 z-10">
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { resetForm(); setShowForm(true); }}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Tambah Jadwal
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Keluar Staff
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPinModal(true)}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl text-xs flex items-center gap-2 border border-neutral-700 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-red-500" /> Login Staff (PIN)
              </button>
            )}
          </div>
        </div>

        {/* Modal PIN Staff */}
        {showPinModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl max-w-sm w-full shadow-2xl relative">
              <button onClick={() => setShowPinModal(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              <h3 className="font-black text-lg text-white mb-1">Otorisasi Staff</h3>
              <p className="text-xs text-neutral-400 mb-4">Masukkan PIN Admin</p>
              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="PIN..."
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center text-lg font-mono text-white outline-none focus:border-red-600"
                  autoFocus
                />
                <button type="submit" className="w-full py-3 bg-red-600 text-white font-bold rounded-xl text-xs cursor-pointer">
                  Masuk
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Form Modal Tambah / Edit Jadwal */}
        {showForm && isLoggedIn && (
          <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 relative shadow-2xl space-y-4">
            <button onClick={resetForm} className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-extrabold text-lg">{editingId ? 'Edit Jadwal Siaran' : 'Tambah Jadwal Siaran Baru'}</h3>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold mb-1">Waktu Siaran</label>
                <input type="text" value={time} onChange={(e) => setTime(e.target.value)} placeholder="Contoh: 16:00 - 18:00 WIB" className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1">Nama Program Acara</label>
                <input type="text" value={program} onChange={(e) => setProgram(e.target.value)} placeholder="Contoh: Los Santos Morning News" className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1">Nama Penyiar / Host (IC)</label>
                <input type="text" value={host} onChange={(e) => setHost(e.target.value)} placeholder="Contoh: Ailaa Yaverlyn" className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none" />
              </div>
              <div>
                <label className="block font-bold mb-1">Frekuensi / Saluran</label>
                <input type="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder="Contoh: 94.6 FM Radio" className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none" />
              </div>
              <div className="sm:col-span-2 flex gap-2 pt-2">
                <button type="submit" className="px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl cursor-pointer">Simpan Jadwal</button>
                <button type="button" onClick={resetForm} className="px-5 py-2.5 bg-neutral-200 dark:bg-neutral-800 font-bold rounded-xl cursor-pointer">Batal</button>
              </div>
            </form>
          </div>
        )}

        {/* LIST JADWAL SIARAN */}
        <div className="space-y-4">
          <h2 className="text-xl font-black flex items-center gap-2 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <Calendar className="w-5 h-5 text-red-600" /> Agenda Siaran Aktif
          </h2>

          <div className="space-y-3">
            {schedule.map((item) => (
              <div key={item.id} className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-5 rounded-2xl flex flex-wrap items-center justify-between gap-4 shadow-sm">
                
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-600/10 text-red-600 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-950 px-2.5 py-0.5 rounded-md uppercase">
                      {item.time}
                    </span>
                    <h3 className="font-extrabold text-base mt-1">{item.program}</h3>
                    <div className="flex items-center gap-3 text-xs text-neutral-500 mt-1">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> Host: {item.host}</span>
                      <span>• {item.frequency}</span>
                    </div>
                  </div>
                </div>

                {/* Tombol Edit/Hapus (Khusus Staff) */}
                {isLoggedIn && (
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(item)} className="p-2 bg-blue-600/10 text-blue-600 rounded-xl hover:bg-blue-600/20 cursor-pointer">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-600/10 text-red-600 rounded-xl hover:bg-red-600/20 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}