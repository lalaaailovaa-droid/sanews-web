'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { 
  Radio, ShieldAlert, Plus, Trash2, Edit3, Newspaper, 
  Megaphone, Tv, Flame, Lock, LogOut, KeyRound, Upload, X, Calendar, User, Tag 
} from 'lucide-react';

const CATEGORIES = [
  'Breaking News',
  'Vandalism',
  'Criminality',
  'Sport',
  'Event',
  'Vacation',
  'Culture',
  'Wedding'
];

const INITIAL_NEWS = [
  {
    id: 1,
    title: 'Baku Tembak Sengit di Idlewood, LSPD Amankan Senjata Rakitan',
    category: 'Criminality',
    author: 'Marcus Vance',
    date: 'Hari ini, 14:30',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=800&q=80',
    content: `Aksi saling tembak antar kelompok terjadi di area perkampungan Idlewood tadi siang. Pihak LSPD bergerak cepat mengepung lokasi dan mengamankan beberapa tersangka beserta barang bukti berupa senjata api rakitan.\n\nMenurut keterangan saksi mata di lokasi kejadian, letusan senjata terdengar lebih dari sepuluh kali sebelum unit kepolisian tiba. Saat ini area Idlewood telah diamankan dan lalu lintas kembali normal.`,
    isBreaking: true,
  },
  {
    id: 2,
    title: 'Resepsi Pernikahan Mewah Anggota Faksi Berlangsung Meriah di Vinewood',
    category: 'Wedding',
    author: 'Sarah Jenkins',
    date: 'Kemarin, 18:00',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    content: 'Pesta pernikahan megah digelar di kawasan Vinewood Hills malam ini. Acara dihhadiri oleh berbagai jajaran pejabat kota dan tokoh penting masyarakat San Andreas.',
    isBreaking: false,
  }
];

const ADMIN_PIN = 'SANWEST-144'; 

export default function Home() {
  const [articles, setArticles] = useState(INITIAL_NEWS);
  const [activeTab, setActiveTab] = useState('berita');
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Auth State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Form State Admin Editor
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Criminality');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [isBreaking, setIsBreaking] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Filter Kategori State
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Simulator Iklan State
  const [adText, setAdText] = useState('');
  const [adPhone, setAdPhone] = useState('');

  useEffect(() => {
    const savedArticles = localStorage.getItem('sanews_articles');
    if (savedArticles) {
      setArticles(JSON.parse(savedArticles));
    }
    const authStatus = localStorage.getItem('sanews_admin_logged');
    if (authStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const saveArticlesToStorage = (updatedArticles) => {
    setArticles(updatedArticles);
    localStorage.setItem('sanews_articles', JSON.stringify(updatedArticles));
  };

  // Handler Upload Foto dari HP / Komputer
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

  const handleLogin = (e) => {
    e.preventDefault();
    if (inputPin === ADMIN_PIN) {
      setIsLoggedIn(true);
      localStorage.setItem('sanews_admin_logged', 'true');
      setShowLoginModal(false);
      setInputPin('');
      setLoginError('');
      setActiveTab('admin');
    } else {
      setLoginError('PIN Staff SANews salah!');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('sanews_admin_logged');
    setActiveTab('berita');
  };

  const handleTabChange = (tab) => {
    if (tab === 'admin' && !isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setActiveTab(tab);
    }
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!title || !content) return alert('Judul dan Isi berita wajib diisi!');

    const newArticle = {
      id: editingId || Date.now(),
      title,
      category,
      author: author || 'SANews Editorial',
      date: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
      image: imagePreview || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=800&q=80',
      content,
      isBreaking: category === 'Breaking News' ? true : isBreaking
    };

    let updated;
    if (editingId) {
      updated = articles.map(item => item.id === editingId ? newArticle : item);
    } else {
      updated = [newArticle, ...articles];
    }

    saveArticlesToStorage(updated);
    resetForm();
    alert(editingId ? 'Berita berhasil diperbarui!' : 'Berita baru terbit!');
  };

  const handleEdit = (article) => {
    setEditingId(article.id);
    setTitle(article.title);
    setCategory(article.category);
    setAuthor(article.author);
    setContent(article.content);
    setImagePreview(article.image);
    setIsBreaking(article.isBreaking);
    setActiveTab('admin');
  };

  const handleDelete = (id) => {
    if (confirm('Yakin ingin menghapus berita ini?')) {
      const updated = articles.filter(item => item.id !== id);
      saveArticlesToStorage(updated);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('Criminality');
    setAuthor('');
    setContent('');
    setImagePreview('');
    setIsBreaking(false);
  };

  const breakingNews = articles.filter(a => a.isBreaking || a.category === 'Breaking News');
  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  return (
    <main className="min-h-screen pb-20 bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
      <Navbar />

      {/* Breaking News Ticker */}
      {breakingNews.length > 0 && (
        <div className="bg-red-600 text-white py-2.5 px-4 overflow-hidden flex items-center shadow-lg">
          <div className="flex items-center gap-2 font-black tracking-wider text-xs bg-black/40 px-3 py-1 rounded-full uppercase shrink-0">
            <Flame className="w-4 h-4 text-yellow-400 animate-bounce" />
            Breaking News
          </div>
          <div className="ml-4 font-semibold text-sm truncate animate-pulse">
            {breakingNews.map(b => b.title).join(' • ')}
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-between items-center mb-8 border-b border-neutral-200 dark:border-neutral-800 pb-4 gap-4">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleTabChange('berita')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                activeTab === 'berita' 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              <Newspaper className="w-4 h-4" /> Portal Berita
            </button>

            <button
              onClick={() => handleTabChange('iklan')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                activeTab === 'iklan' 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' 
                  : 'bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              <Megaphone className="w-4 h-4" /> Simulator Iklan (/ad)
            </button>

            <button
              onClick={() => handleTabChange('admin')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition ${
                activeTab === 'admin' 
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-lg' 
                  : 'bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800'
              }`}
            >
              {isLoggedIn ? <Edit3 className="w-4 h-4" /> : <Lock className="w-4 h-4" />} 
              {isLoggedIn ? 'Admin Panel' : 'Login Staff'}
            </button>
          </div>

          {isLoggedIn && (
            <div className="flex items-center gap-3 bg-neutral-100 dark:bg-neutral-900 px-4 py-2 rounded-xl text-xs font-bold border border-neutral-200 dark:border-neutral-800">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
              <span>Staff Mode</span>
              <button 
                onClick={handleLogout}
                className="ml-2 text-red-600 hover:underline flex items-center gap-1 font-semibold"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: PORTAL BERITA */}
        {activeTab === 'berita' && (
          <div className="space-y-8">
            
            {/* Filter Kategori Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('All')}
                className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  selectedCategory === 'All' 
                    ? 'bg-red-600 text-white' 
                    : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200'
                }`}
              >
                Semua Kategori
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                    selectedCategory === cat 
                      ? 'bg-red-600 text-white' 
                      : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {filteredArticles.length === 0 ? (
                  <div className="p-8 text-center bg-neutral-100 dark:bg-neutral-900 rounded-2xl text-neutral-500">
                    Tidak ada berita dalam kategori ini.
                  </div>
                ) : (
                  filteredArticles.map((item) => (
                    <div key={item.id} className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl overflow-hidden hover:shadow-2xl transition group">
                      <div className="md:flex">
                        <div className="md:w-1/3 h-52 md:h-auto overflow-hidden relative">
                          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow">
                            {item.category}
                          </span>
                        </div>
                        <div className="p-6 md:w-2/3 flex flex-col justify-between">
                          <div>
                            <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2 flex items-center gap-3 font-medium">
                              <span>Oleh {item.author}</span> • <span>{item.date}</span>
                            </div>
                            <h3 className="text-xl font-black mb-3 group-hover:text-red-600 transition leading-snug">
                              {item.title}
                            </h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4">
                              {item.content}
                            </p>
                          </div>
                          <button
                            onClick={() => setSelectedArticle(item)}
                            className="inline-flex items-center gap-2 text-xs font-extrabold text-red-600 hover:text-red-700 uppercase tracking-wider"
                          >
                            Baca Selengkapnya →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-neutral-900 text-white p-5 rounded-3xl border border-neutral-800 shadow-xl">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      <Tv className="w-4 h-4 text-red-500 animate-pulse" /> SANews Helicam Live
                    </div>
                    <span className="text-[10px] bg-red-600 px-2 py-0.5 rounded font-black tracking-widest">LIVE</span>
                  </div>
                  <div className="bg-neutral-950 aspect-video rounded-2xl flex flex-col items-center justify-center border border-neutral-800 relative overflow-hidden">
                    <Radio className="w-10 h-10 text-neutral-700 animate-pulse mb-2" />
                    <span className="text-xs text-neutral-500 font-mono">SAN-CAM 01 // VINEWOOD FLYOVER</span>
                  </div>
                  <p className="text-xs text-neutral-400 mt-3">
                    Pantauan langsung siaran helikopter SANews di area konflik kota.
                  </p>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-red-800 text-white p-6 rounded-3xl shadow-xl">
                  <ShieldAlert className="w-8 h-8 mb-3 text-yellow-300" />
                  <h3 className="font-black text-lg mb-1">Punya Bocoran Berita?</h3>
                  <p className="text-xs text-red-100 mb-4">
                    Kirim informasi, rekaman foto, atau aksi kriminal di sekitar lokasi kamu.
                  </p>
                  <div className="bg-white/10 text-white text-xs p-3 rounded-xl font-mono text-center font-bold">
                    HOTLINE /call 555-SANEWS
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SIMULATOR IKLAN */}
        {activeTab === 'iklan' && (
          <div className="max-w-2xl mx-auto bg-neutral-50 dark:bg-neutral-900 p-8 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
            <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
              <Megaphone className="w-6 h-6 text-red-600" /> Simulator Pasang Iklan Warga
            </h2>
            <p className="text-sm text-neutral-500 mb-6">
              Uji coba format iklan `/ad` kamu sebelum dipublikasikan di game.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Teks Iklan</label>
                <textarea
                  rows="3"
                  placeholder="Contoh: DIJUAL Sultan 3 Asuransi Full Modif. Minat? Hubungi saya!"
                  value={adText}
                  onChange={(e) => setAdText(e.target.value)}
                  className="w-full p-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-red-600 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-2">Nomor Telepon In-Game</label>
                <input
                  type="text"
                  placeholder="Contoh: 887123"
                  value={adPhone}
                  onChange={(e) => setAdPhone(e.target.value)}
                  className="w-full p-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 focus:ring-2 focus:ring-red-600 outline-none text-sm"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
                <label className="block text-xs font-bold uppercase mb-2 text-neutral-400">Preview Live Chat:</label>
                <div className="bg-black p-4 rounded-xl font-mono text-xs text-green-400 leading-relaxed shadow-inner">
                  {adText ? (
                    <span>[AD] {adText} | Ph: {adPhone || 'XXXXXX'}</span>
                  ) : (
                    <span className="text-neutral-600">[AD] Tulis iklan kamu di atas...</span>
                  )}
                </div>
                <div className="flex justify-between text-xs font-bold text-neutral-500 mt-2">
                  <span>Panjang Teks: {adText.length} Karakter</span>
                  <span>Estimasi Biaya: ${adText.length * 5}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADMIN EDITOR (CMS) */}
        {activeTab === 'admin' && isLoggedIn && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 bg-neutral-50 dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-xl">
              <h3 className="font-extrabold text-lg mb-4 flex items-center justify-between">
                <span>{editingId ? '📝 Edit Berita' : '➕ Tambah Berita Baru'}</span>
                {editingId && (
                  <button onClick={resetForm} className="text-xs text-red-600 underline">Batal</button>
                )}
              </h3>

              <form onSubmit={handleSaveArticle} className="space-y-4 text-sm">
                <div>
                  <label className="block text-xs font-bold mb-1">Judul Berita</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Judul liputan..."
                    className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold mb-1">Kategori Berita</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none"
                    >
                      {CATEGORIES.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold mb-1">Penulis / Reporter</label>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      placeholder="Nama wartawan..."
                      className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-red-600"
                    />
                  </div>
                </div>

                {/* Upload Foto dari Perangkat */}
                <div>
                  <label className="block text-xs font-bold mb-1">Upload Foto Berita</label>
                  <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 p-4 rounded-2xl text-center bg-white dark:bg-neutral-950 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    {imagePreview ? (
                      <div className="relative">
                        <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-xl" />
                        <span className="text-[10px] text-neutral-400 mt-1 block">Klik untuk mengganti foto</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center py-2">
                        <Upload className="w-6 h-6 text-neutral-400 mb-1" />
                        <span className="text-xs text-neutral-500 font-medium">Pilih Foto dari Galeri / Komputer</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1">Isi Artikel Berita</label>
                  <textarea
                    rows="4"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tulis lengkap detail kejadian..."
                    className="w-full p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-red-600"
                  />
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="breaking"
                    checked={isBreaking}
                    onChange={(e) => setIsBreaking(e.target.checked)}
                    className="w-4 h-4 text-red-600 rounded"
                  />
                  <label htmlFor="breaking" className="text-xs font-bold text-red-600">Set sebagai Breaking News Ticker</label>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition shadow-lg shadow-red-600/30 mt-4"
                >
                  {editingId ? 'Simpan Perubahan' : 'Terbitkan Berita'}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-extrabold text-lg mb-4">Daftar Artikel Published ({articles.length})</h3>
              
              <div className="space-y-3">
                {articles.map((item) => (
                  <div key={item.id} className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 truncate">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                      <div className="truncate">
                        <span className="text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-500 uppercase">
                          {item.category}
                        </span>
                        <h4 className="font-bold text-sm truncate mt-1">{item.title}</h4>
                        <span className="text-xs text-neutral-400">{item.date} • oleh {item.author}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-blue-600 hover:text-white transition text-neutral-600 dark:text-neutral-300"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 hover:bg-red-600 hover:text-white transition text-neutral-600 dark:text-neutral-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* MODAL LOGIN STAFF */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-neutral-900 max-w-md w-full rounded-3xl p-6 shadow-2xl border border-neutral-200 dark:border-neutral-800">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-950 text-red-600 rounded-2xl flex items-center justify-center mb-4 mx-auto">
              <KeyRound className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-center mb-1">Akses Staff SANews</h3>
            <p className="text-xs text-neutral-500 text-center mb-6">
              Masukkan PIN Staff untuk membuka editor.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <input
                  type="password"
                  placeholder="PIN Staff"
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  className="w-full text-center tracking-widest text-lg p-3 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-950 outline-none focus:ring-2 focus:ring-red-600 font-mono"
                  autoFocus
                />
              </div>

              {loginError && (
                <p className="text-xs text-red-600 font-bold text-center">{loginError}</p>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowLoginModal(false);
                    setInputPin('');
                    setLoginError('');
                  }}
                  className="w-1/2 py-3 bg-neutral-100 dark:bg-neutral-800 font-bold rounded-xl text-sm"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-red-600/30"
                >
                  Masuk Staff
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* POPUP BACA BERITA MODERN (NEW LOOK & FEEL) */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
          <div className="bg-white dark:bg-neutral-900 max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border border-neutral-200 dark:border-neutral-800 my-auto relative animate-in fade-in zoom-in duration-200">
            
            {/* Tombol Close Pop-up */}
            <button 
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black text-white p-2 rounded-full backdrop-blur-md transition"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Banner Foto Berita */}
            <div className="relative h-64 sm:h-96 w-full">
              <img 
                src={selectedArticle.image} 
                alt={selectedArticle.title} 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="bg-red-600 text-white text-[11px] font-black px-3 py-1 rounded-lg uppercase tracking-widest inline-block mb-3 shadow-lg">
                  {selectedArticle.category}
                </span>
                <h1 className="text-2xl sm:text-4xl font-black leading-tight drop-shadow-md">
                  {selectedArticle.title}
                </h1>
              </div>
            </div>

            {/* Info Penulis & Isi Berita */}
            <div className="p-6 sm:p-10 space-y-6">
              <div className="flex flex-wrap items-center justify-between pb-6 border-b border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 dark:text-neutral-400 gap-4">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-red-600" />
                  <span className="font-bold text-neutral-800 dark:text-neutral-200">{selectedArticle.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-red-600" />
                  <span>{selectedArticle.date}</span>
                </div>
              </div>

              <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-base leading-relaxed whitespace-pre-line font-serif">
                {selectedArticle.content}
              </div>

              <div className="pt-6 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-6 py-3 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-bold rounded-xl text-sm transition hover:opacity-90"
                >
                  Tutup Liputan
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </main>
  );
}