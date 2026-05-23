import { useEffect, useState } from "react";

interface Props {
  id: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PembicaraEdit({ id, onClose, onSuccess }: Props) {
  const [nama, setNama] = useState("");
  const [role, setRole] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    fetch(`https://crudnajwagiarekaazzahra-production.up.railway.app/speakers/${id}`)
      .then((res) => res.json())
      .then((res) => {
        const data = res.data || res;
        setNama(data.Nama);
        setRole(data.Role);
        setFoto(data.Foto);
      });
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
  e.preventDefault();
  
  try {
    const response = await fetch(`https://crudnajwagiarekaazzahra-production.up.railway.app/speakers/${id}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json" 
      },
      // FIELD HARUS SAMA PERSIS DENGAN CONTROLLER: name, role, image
      body: JSON.stringify({ 
        name: nama, 
        role: role, 
        image: foto 
      }),
    });

    if (response.ok) {
      alert("Berhasil diupdate!");
      onSuccess(); // Ini akan menutup modal dan refresh data
    } else {
      const errorData = await response.json();
      console.error("Error dari server:", errorData);
      alert("Gagal update: " + (errorData.message || "Terjadi kesalahan"));
    }
  } catch (error) {
    console.error("Error network:", error);
    alert("Terjadi kesalahan koneksi");
  }
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <form onSubmit={handleUpdate} className="bg-white p-8 rounded-2xl w-full max-w-lg shadow-2xl space-y-4">
        <h1 className="text-xl font-bold">Edit Pembicara</h1>
        <input value={nama} onChange={(e) => setNama(e.target.value)} className="border p-2 w-full" placeholder="Nama" />
        <input value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 w-full" placeholder="Role" />
        <input value={foto} onChange={(e) => setFoto(e.target.value)} className="border p-2 w-full" placeholder="URL Foto" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Batal</button>
          <button type="submit" className="bg-red-900 text-white px-4 py-2 rounded">Simpan</button>
        </div>
      </form>
    </div>
  );
}