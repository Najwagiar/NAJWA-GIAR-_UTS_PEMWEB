import { useEffect, useState } from "react";

interface Props {
  id: number;
  onClose: () => void;
  onSuccess: () => void;
}

export default function EventEdit({ id, onClose, onSuccess }: Props) {
  const [formData, setFormData] = useState({ name: "", location: "", dateEvent: "", description: "" });

  useEffect(() => {
    fetch(`http://localhost:3000/events/${id}`)
      .then((res) => res.json())
      .then((data) => setFormData(data)); // Sesuaikan jika responnya {data: ...}
  }, [id]);

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    await fetch(`http://localhost:3000/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    alert("Event berhasil diupdate!");
    onSuccess();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <form onSubmit={handleUpdate} className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Edit Event</h2>
        <input className="border p-2 w-full mb-2" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Nama Event" />
        <input className="border p-2 w-full mb-2" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="Lokasi" />
        <input type="date" className="border p-2 w-full mb-2" value={formData.dateEvent} onChange={(e) => setFormData({...formData, dateEvent: e.target.value})} />
        <textarea className="border p-2 w-full mb-4" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Deskripsi" />
        <div className="flex gap-2 justify-end">
          <button type="button" onClick={onClose} className="bg-gray-300 px-4 py-2 rounded">Batal</button>
          <button type="submit" className="bg-red-900 text-white px-4 py-2 rounded">Simpan</button>
        </div>
      </form>
    </div>
  );
}