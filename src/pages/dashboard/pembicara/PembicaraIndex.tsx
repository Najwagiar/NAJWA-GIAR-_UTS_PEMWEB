import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SpeakerCard } from "../../../components/ui/SpeakerCard";
import PembicaraEdit from "./PembicaraEdit";

export default function PembicaraIndex() {
  const [speakers, setSpeakers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  async function fetchPembicara() {
    try {
      const response = await fetch("https://crudnajwagiarekaazzahra-production.up.railway.app/speakers");
      const result = await response.json();
      setSpeakers(result);
    } catch (error) {
      console.log(error);
      alert("Gagal mengambil data pembicara");
    }
  }

  useEffect(() => {
    fetchPembicara();
  }, []);

  async function handleDelete(id: number) {
    const yakin = confirm("Yakin mau hapus?");
    if (!yakin) return;
    try {
      await fetch(`https://crudnajwagiarekaazzahra-production.up.railway.app/speakers/${id}`, {
        method: "DELETE",
      });
      alert("Pembicara berhasil dihapus");
      fetchPembicara();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus pembicara");
    }
  }

  // Fungsi untuk buka modal edit
  const openEdit = (id: number) => {
    setEditingId(id);
    setIsEditOpen(true);
  };

  return (
  <div className="p-6">
    <div className="flex justify-between items-start mb-6">
      <div>
        <h1 className="text-2xl font-bold mb-2">Pembicara</h1>
        <p className="text-gray-500">Selamat Datang di Halaman Pembicara</p>
      </div>

      {/* Tombol digeser ke kanan secara natural tanpa membungkus kotak baru */}
      <Link 
        to="/dashboard/pembicara/create" 
        className="bg-red-900 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-red-950 transition-colors"
      >
        + Tambah Pembicara
      </Link>
    </div>

    {/* GRID UTAMA UNTUK CARD PEMBICARA */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {speakers.map((item: any) => (
        <div key={item.id} className="bg-pink-100 p-5 rounded-xl shadow border-l-8 border-red-900 relative">
          <SpeakerCard name={item.name} role={item.role} imageUrl={item.image} />
          
          <div className="flex gap-4 mt-2">
            <button onClick={() => handleDelete(item.id)} className="text-red-500 text-sm font-semibold hover:underline">
              Hapus
            </button>
            <button onClick={() => openEdit(item.id)} className="text-blue-600 text-sm font-semibold hover:underline">
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* MODAL POPUP EDIT */}
    {isEditOpen && editingId !== null && (
      <PembicaraEdit
        id={editingId}
        onClose={() => setIsEditOpen(false)}
        onSuccess={() => {
          fetchPembicara();
          setIsEditOpen(false);
        }}
      />
    )}
  </div>
);
}