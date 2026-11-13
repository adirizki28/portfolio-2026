import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import type { Project } from '../data/Project';

export default function Dashboard() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [link, setLink] = useState('#');
  const [featured, setFeatured] = useState(true);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Cek sesi login & ambil data
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate('/login');
      } else {
        fetchProjects();
      }
    });
  }, [navigate]);

  async function fetchProjects() {
    setLoading(true);
    const { data } = await supabase
      .from('portfolio_projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setProjects(data);
    setLoading(false);
  }

  // Tambah proyek baru + upload thumbnail
  async function handleAddProject(e: React.FormEvent) {
    e.preventDefault();
    if (!imageFile) {
      alert('Pilih gambar thumbnail terlebih dahulu!');
      return;
    }

    setSubmitting(true);

    // 1. Upload file gambar ke bucket 'project-thumbnail'
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project-thumbnail')
      .upload(fileName, imageFile);

    if (uploadError) {
      alert('Gagal upload gambar: ' + uploadError.message);
      setSubmitting(false);
      return;
    }

    // 2. Ambil Public URL gambar yang baru di-upload
    const { data: urlData } = supabase.storage
      .from('project-thumbnail')
      .getPublicUrl(fileName);

    // 3. Simpan data proyek ke tabel 'portfolio_projects'
    const { error: insertError } = await supabase
      .from('portfolio_projects')
      .insert([
        {
          title,
          category,
          image: urlData.publicUrl,
          link: link || '#',
          featured,
        },
      ]);

    if (insertError) {
      alert('Gagal menyimpan proyek: ' + insertError.message);
    } else {
      // Reset form & refresh daftar
      setTitle('');
      setCategory('');
      setLink('#');
      setImageFile(null);
      fetchProjects();
    }

    setSubmitting(false);
  }

  // Ubah status tampil/sembunyi di Featured Works
  async function toggleFeatured(id: string, currentStatus: boolean) {
    await supabase
      .from('portfolio_projects')
      .update({ featured: !currentStatus })
      .eq('id', id);
    fetchProjects();
  }

  // Hapus proyek
  async function handleDelete(id: string) {
    if (!confirm('Yakin ingin menghapus proyek ini?')) return;
    await supabase.from('portfolio_projects').delete().eq('id', id);
    fetchProjects();
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/login');
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Topbar Dashboard */}
      <header className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-clash text-xl font-semibold">Portfolio CMS</h1>
            <p className="text-xs text-neutral-500">Kelola karya tanpa bongkar kode</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="text-sm px-4 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100 transition"
            >
              Lihat Website ↗
            </a>
            <button
              onClick={handleLogout}
              className="text-sm px-4 py-2 rounded-xl bg-neutral-900 text-white hover:bg-neutral-800 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Tambah Proyek (Kolom Kiri) */}
        <section className="bg-white p-6 rounded-3xl border border-neutral-200 h-fit">
          <h2 className="font-clash text-lg font-medium mb-4">Tambah Proyek Baru</h2>
          <form onSubmit={handleAddProject} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Judul Proyek</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Misal: Desa Pasirsuren App"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">Kategori</label>
              <input
                type="text"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Misal: UI/UX Design"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Link Case Study / Live Demo
              </label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://dribbble.com/..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 text-sm focus:border-black focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-600 mb-1">
                Thumbnail Gambar (Rasio 4:3)
              </label>
              <input
                type="file"
                accept="image/*"
                required
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="w-full text-xs text-neutral-500 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-neutral-100 file:text-neutral-800 hover:file:bg-neutral-200"
              />
            </div>

            <label className="flex items-center gap-2 text-sm text-neutral-700 cursor-pointer mt-1">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded accent-orange-500"
              />
              Tampilkan di Featured Works
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="mt-2 w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-medium text-sm transition disabled:opacity-50"
            >
              {submitting ? 'Mengupload...' : '+ Simpan Proyek'}
            </button>
          </form>
        </section>

        {/* Daftar Proyek (Kolom Kanan) */}
        <section className="lg:col-span-2 flex flex-col gap-4">
          <h2 className="font-clash text-lg font-medium">
            Daftar Proyek ({projects.length})
          </h2>

          {loading ? (
            <p className="text-sm text-neutral-500">Memuat data...</p>
          ) : projects.length === 0 ? (
            <div className="bg-white p-8 rounded-3xl border border-neutral-200 text-center text-sm text-neutral-500">
              Belum ada proyek di database. Tambahkan proyek pertamamu lewat form di samping!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {projects.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-3xl border border-neutral-200 flex flex-col justify-between gap-4"
                >
                  <div>
                    <div className="aspect-4/3 rounded-2xl overflow-hidden bg-neutral-100 mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-neutral-900">{item.title}</h3>
                    <p className="text-xs text-neutral-500">{item.category}</p>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                    <button
                      onClick={() => toggleFeatured(item.id, item.featured)}
                      className={`text-xs px-3 py-1.5 rounded-full font-medium transition ${
                        item.featured
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-neutral-100 text-neutral-500'
                      }`}
                    >
                      {item.featured ? '● Featured' : '○ Hidden'}
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1"
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}