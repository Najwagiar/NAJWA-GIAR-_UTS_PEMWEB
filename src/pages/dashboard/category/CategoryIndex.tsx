import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryEdit from "./CategoryEdit"; 

export default function CategoryIndex() {
  const [categories, setCategories] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // 1. GET DATA CATEGORY
  async function fetchCategories() {
    try {
      const response = await fetch("http://localhost:3000/category/");
      const result = await response.json();
      setCategories(result.data || result);
    } catch (error) {
      console.log(error);
      alert("Gagal mengambil data category");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  // 2. DELETE CATEGORY
  async function handleDelete(id: number) {
    const yakin = confirm("Yakin mau hapus?");
    if (!yakin) return;

    try {
      await fetch(`http://localhost:3000/category/${id}`, {
        method: "DELETE",
      });
      alert("Category berhasil dihapus!");
      fetchCategories();
    } catch (error) {
      console.log(error);
      alert("Gagal menghapus category");
    }
  }

  // 3. FUNGSI UNTUK MEMBUKA MODAL
  const openEdit = (id: number) => {
    setEditingId(id);
    setIsEditOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Category</h1>
          <p className="text-gray-500">Selamat Datang di Halaman Category</p>
        </div>

        {/* Tombol digeser ke kanan atas secara natural tanpa terpisah kotak baru */}
        <Link
          to="/dashboard/category/create"
          className="bg-red-900 hover:bg-red-950 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
        >
          + Tambah Category
        </Link>
      </div>

      {/* LIST DATA GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories?.map((item: any) => (
          <div
            key={item?.id}
            className="bg-pink-100 p-5 rounded-xl shadow border-l-8 border-red-900 relative"
          >
            <h3 className="text-lg font-bold text-red-900 mb-2">{item?.name}</h3>
            <p className="text-gray-700 mb-4">{item?.description}</p>

            <div className="flex gap-4">
              <button
                onClick={() => handleDelete(item.id)}
                className="text-red-600 text-sm font-semibold hover:underline"
              >
                Hapus
              </button>

              <button
                onClick={() => openEdit(item.id)}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL EDIT */}
      {isEditOpen && editingId !== null && (
        <CategoryEdit
          id={editingId}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            fetchCategories();
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
}