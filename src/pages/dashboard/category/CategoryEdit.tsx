import { useEffect, useState } from "react";

interface Props {
  id: number;           // ID kategori yang akan diedit
  onClose: () => void;  // Fungsi untuk menutup modal
  onSuccess: () => void;// Fungsi untuk refresh list setelah sukses
}

export default function CategoryEdit({ id, onClose, onSuccess }: Props) {
  const [name, setName] = useState("");

  // Ambil data lama
  useEffect(() => {
    fetch(`https://crudnajwagiarekaazzahra-production.up.railway.app/categories/${id}`)
      .then((res) => res.json())
      .then((res) => setName(res.data.name)); // Sesuaikan jika backend membungkus di 'data'
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`https://crudnajwagiarekaazzahra-production.up.railway.app/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    alert("Berhasil diupdate!");
    onSuccess(); // Refresh data di halaman Index
    onClose();   // Tutup modal
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl w-full max-w-md shadow-2xl">
        <h1 className="text-xl font-bold mb-4">Edit Category</h1>
        <input 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          className="border p-2 w-full mb-4 rounded"
        />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Batal</button>
          <button type="submit" className="bg-blue-900 text-white px-4 py-2 rounded">Simpan</button>
        </div>
      </form>
    </div>
  );
}