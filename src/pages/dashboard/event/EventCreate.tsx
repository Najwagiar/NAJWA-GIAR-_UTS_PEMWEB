import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export default function EventCreate() {
  const navigate = useNavigate();
  const addEvent = useAuthStore((state) => state.addEvent);

  const [namaEvent, setNamaEvent] = useState("");
  const [pembicara, setPembicara] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!namaEvent || !pembicara || !tanggal || !jam) {
      alert("Semua field wajib diisi!");
      return;
    }

    addEvent({
      namaEvent,
      pembicara,
      tanggal,
      jam,
    });

    navigate("/dashboard/event");
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Tambah Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Nama Event"
          value={namaEvent}
          onChange={(e) => setNamaEvent(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Pembicara"
          value={pembicara}
          onChange={(e) => setPembicara(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="time"
          value={jam}
          onChange={(e) => setJam(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <button className="bg-red-900 text-white px-4 py-2 rounded">
          Simpan
        </button>

      </form>
    </div>
  );
}