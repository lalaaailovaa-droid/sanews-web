'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Users, ShieldCheck, UserCheck, Briefcase, Plus, Trash2, Edit3, Upload, Lock, Unlock, X } from 'lucide-react';

const INITIAL_ROSTER = {
  highCommand: [
    {
      id: 1,
      name: 'Ailaa Yaverlyn',
      role: 'Chief Executive Officer',
      division: 'Editorial Division',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Sarah Jenkins',
      role: 'Editor-in-Chief',
      division: 'Journalism Division',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    }
  ],
  executive: [
    { id: 101, name: 'David Miller', role: 'Head of Station', division: 'Broadcasting' },
    { id: 102, name: 'Elena Rostova', role: 'Head of Public Relations', division: 'Public Relation' },
  ],
  operational: [
    { id: 201, name: 'Alex Rivera', role: 'Senior Reporter', division: 'Journalism' },
    { id: 202, name: 'Chloe Bennett', role: 'Junior Reporter', division: 'Journalism' },
    { id: 203, name: 'Lucas Hayes', role: 'Cameraman & Helicopter Pilot', division: 'Broadcasting' },
    { id: 204, name: 'Rayan Cooper', role: 'Intern / Apprentice', division: 'General' },
  ]
};

export default function RosterPage() {
  const [roster, setRoster] = useState(INITIAL_ROSTER);
  const [isHCAuthenticated, setIsHCAuthenticated] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [showForm, setShowForm] = useState(false);

  // Form state
  const [team, setTeam] = useState('highCommand');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [division, setDivision] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const savedRoster = localStorage.getItem('sanews_roster');
    if (savedRoster) {
      setRoster(JSON.parse(savedRoster));
    }
    const hcAuth = localStorage.getItem('sanews_hc_auth');
    if (hcAuth === 'true') {
      setIsHCAuthenticated(true);
    }
  }, []);

  const handleLoginHC = (e) => {
    e.preventDefault();
    // PIN khusus High Command: HCT1980
    if (pinInput === 'HCT1980') {
      setIsHCAuthenticated(true);
      localStorage.setItem('sanews_hc_auth', 'true');
      setShowPinModal(false);
      setPinInput('');
      alert('Akses High Command Diterima!');
    } else {
      alert('PIN High Command Salah!');
    }
  };

  const handleLogoutHC = () => {
    setIsHCAuthenticated(false);
    localStorage.removeItem('sanews_hc_auth');
    alert('Mode Edit High Command Ditutup.');
  };

  const saveRosterToStorage = (updatedRoster) => {
    setRoster(updatedRoster);
    localStorage.setItem('sanews_roster', JSON.stringify(updatedRoster));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !role) return alert('Nama dan Rank/Jabatan wajib diisi!');

    const newItem = {
      id: editingId || Date.now(),
      name,
      role,
      division: division || 'General Division',
      ...(team === 'highCommand' && {
        image: imagePreview || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=600&q=80'
      })
    };

    let updatedTeam = [...roster[team]];
    if (editingId) {
      updatedTeam = updatedTeam.map(item => item.id === editingId ? newItem : item);
    } else {
      updatedTeam.push(newItem);
    }

    const newRoster = { ...roster, [team]: updatedTeam };
    saveRosterToStorage(newRoster);
    resetForm();
  };

  const handleDelete = (targetTeam, id) => {
    if (confirm('Yakin ingin menghapus anggota ini dari roster?')) {
      const updatedTeam = roster[targetTeam].filter(item => item.id !== id);
      const newRoster = { ...roster, [targetTeam]: updatedTeam };
      saveRosterToStorage(newRoster);
    }
  };

  const handleEdit = (targetTeam, item) => {
    setTeam(targetTeam);
    setEditingId(item.id);
    setName(item.name);
    setRole(item.role);
    setDivision(item.division);
    setImagePreview(item.image || '');
    setShowForm(true);
  };

  const resetForm = () => {
    setEditingId(null);
    setName('');
    setRole('');
    setDivision('');
    setImagePreview('');
    setShowForm(false);
  };

  return (
    <main className="min-h-screen pb-20 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 pt-12 space-y-12">
        
        {/* Header Banner */}
        <div className="bg-neutral-900 text-white p-8 rounded-3xl shadow-xl border border-neutral-800 flex flex-wrap justify-between items-center gap-4">
          <div>
            <span className="bg-red-600 text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider">
              Westoria Side RP Faction
            </span>
            <h1 className="text-3xl sm:text-4xl font-black mt-3 mb-2">
              Struktur Jabatan & Roster Staf
            </h1>
            <p className="text-neutral-400 text-sm max-w-xl">
              Daftar resmi jajaran High Command, Executive, dan Operational San Andreas News Network.
            </p>
          </div>

          {/* Tombol Kontrol High Command */}
          <div className="flex items-center gap-3">
            {isHCAuthenticated ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { resetForm(); setShowForm(true); }}
                  className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition flex items-center gap-2 shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Tambah Anggota
                </button>
                <button
                  onClick={handleLogoutHC}
                  className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl text-xs transition flex items-center gap-2 cursor-pointer"
                >
                  <Unlock className="w-4 h-4 text-green-400" /> Keluar HC
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowPinModal(true)}
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold rounded-xl text-xs transition flex items-center gap-2 border border-neutral-700 cursor-pointer"
              >
                <Lock className="w-4 h-4 text-red-500" /> Login High Command (PIN)
              </button>
            )}
          </div>
        </div>

        {/* Modal PIN High Command */}
        {showPinModal && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-3xl max-w-md w-full shadow-2xl relative">
              <button onClick={() => setShowPinModal(false)} className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-red-600/20 text-red-500 rounded-2xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-black text-lg">Otorisasi High Command</h3>
                  <p className="text-xs text-neutral-400">Masukkan PIN khusus petinggi (Default: 9999)</p>
                </div>
              </div>

              <form onSubmit={handleLoginHC} className="space-y-4">
                <input
                  type="password"
                  maxLength={10}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Masukkan PIN HC..."
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-center text-lg tracking-widest font-mono text-white outline-none focus:border-red-600"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition shadow-lg shadow-red-600/30 cursor-pointer"
                >
                  Verifikasi PIN
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Form Modal Tambah / Edit Anggota */}
        {showForm && isHCAuthenticated && (
          <div className="bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 relative shadow-2xl">
            <button onClick={resetForm} className="absolute top-4 right-4 text-neutral-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-extrabold text-lg mb-4">
              {editingId ? '📝 Edit Anggota Roster' : '➕ Tambah Anggota Roster Baru'}
            </h3>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <label className="block text-xs font-bold mb-1">Pilih Tingkat / Team</label>
                <select
                  value={team}
                  onChange={(e) => setTeam(e.target.value)}
                  className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none"
                >
                  <option value="highCommand">High Command Team (Dengan Foto)</option>
                  <option value="executive">Executive Team (Teks)</option>
                  <option value="operational">Operational Team (Teks)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Nama Karakter (IC)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Contoh: Ailaa Yaverlyn"
                  className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Rank / Jabatan Utama</label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="Contoh: Chief Executive Officer"
                  className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1">Divisi (Tampil di Bawah Nama)</label>
                <input
                  type="text"
                  value={division}
                  onChange={(e) => setDivision(e.target.value)}
                  placeholder="Contoh: Editorial Division"
                  className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none"
                />
              </div>

              {/* Upload Foto Full Portrait */}
              {team === 'highCommand' && (
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold mb-1">Upload Foto Profil High Command (Full Portrait)</label>
                  <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-4 rounded-2xl text-center bg-white dark:bg-neutral-950 relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {imagePreview ? (
                      <div className="flex items-center gap-4 justify-center">
                        <img src={imagePreview} alt="Preview" className="w-16 h-20 rounded-xl object-cover bg-neutral-900" />
                        <span className="text-xs text-neutral-400">Foto terpilih. Klik untuk mengganti.</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 py-2 text-xs text-neutral-500">
                        <Upload className="w-4 h-4" /> Upload Foto dari HP / Komputer
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div className="md:col-span-2 flex gap-3 pt-2">
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-xs transition cursor-pointer"
                >
                  {editingId ? 'Simpan Perubahan' : 'Tambahkan ke Roster'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 bg-neutral-200 dark:bg-neutral-800 font-bold rounded-xl text-xs cursor-pointer"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* SEKSI 1: HIGH COMMAND TEAM (FOTO FULL UTUH & FORMAT NAMA -> DIVISI -> RANK) */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <ShieldCheck className="w-6 h-6 text-red-600" />
            <div>
              <h2 className="text-xl font-black">High Command Team</h2>
              <span className="text-xs text-neutral-500">Petinggi & Direksi Faksi SANews</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {roster.highCommand.map((item) => (
              <div key={item.id} className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden shadow-lg group relative flex flex-col">
                
                {/* Area Foto Full Portrait (Menggunakan object-cover supaya memenuhi card tanpa terpotong aneh) */}
                <div className="h-80 w-full bg-neutral-950 relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  {/* Efek Gradasi Halus di Bawah Foto */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Informasi Teks: Nama -> Divisi -> Rank */}
                <div className="p-5 flex justify-between items-start bg-neutral-50 dark:bg-neutral-900 flex-1">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lg text-neutral-900 dark:text-neutral-50">{item.name}</h3>
                    <div className="inline-block bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-[10px] font-black px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {item.division}
                    </div>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 font-bold pt-1">{item.role}</p>
                  </div>

                  {isHCAuthenticated && (
                    <div className="flex gap-1">
                      <button onClick={() => handleEdit('highCommand', item)} className="p-1.5 text-neutral-400 hover:text-blue-500 cursor-pointer">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete('highCommand', item.id)} className="p-1.5 text-neutral-400 hover:text-red-500 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEKSI 2: EXECUTIVE TEAM (TEKS TEBAL & RAPI) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <UserCheck className="w-6 h-6 text-red-600" />
            <div>
              <h2 className="text-xl font-black">Executive Team</h2>
              <span className="text-xs text-neutral-500">Kepala Divisi & Manajemen Menengah</span>
            </div>
          </div>

          <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-4 divide-y divide-neutral-200 dark:divide-neutral-800">
            {roster.executive.map((item) => (
              <div key={item.id} className="py-3 flex items-center justify-between gap-4 px-2">
                <div>
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <div className="text-[11px] text-red-600 font-bold">{item.division}</div>
                  <span className="text-xs text-neutral-500">{item.role}</span>
                </div>

                {isHCAuthenticated && (
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit('executive', item)} className="p-1.5 text-neutral-400 hover:text-blue-500 cursor-pointer">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete('executive', item.id)} className="p-1.5 text-neutral-400 hover:text-red-500 cursor-pointer">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SEKSI 3: OPERATIONAL TEAM (LIST TEKS CLEAN) */}
        <div className="space-y-4">
          <div className="flex items-center gap-3 border-b border-neutral-200 dark:border-neutral-800 pb-3">
            <Briefcase className="w-6 h-6 text-red-600" />
            <div>
              <h2 className="text-xl font-black">Operational Team</h2>
              <span className="text-xs text-neutral-500">Staf Lapangan, Reporter, & Magang</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {roster.operational.map((item) => (
              <div key={item.id} className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-4 rounded-2xl flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <div className="text-[11px] text-red-600 font-bold">{item.division}</div>
                  <span className="text-xs text-neutral-500">{item.role}</span>
                </div>

                {isHCAuthenticated && (
                  <div className="flex gap-1">
                    <button onClick={() => handleEdit('operational', item)} className="p-1.5 text-neutral-400 hover:text-blue-500 cursor-pointer">
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete('operational', item.id)} className="p-1.5 text-neutral-400 hover:text-red-500 cursor-pointer">
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