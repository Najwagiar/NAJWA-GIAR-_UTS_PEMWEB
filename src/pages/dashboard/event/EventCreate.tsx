import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../store/useAuthStore";

export default function EventCreate() {
  const navigate = useNavigate();

  const addEvent = useAuthStore((state) => state.addEvent);

  // State untuk input form

  const [name, setName] = useState("");

  const [location, setLocation] = useState("");

  const [dateEvent, setDateEvent] = useState("");

  const [description, setDescription] = useState("");

  // State untuk menampung daftar pilihan dari database

  const [categories, setCategories] = useState([]);

  const [pembicaras, setPembicaras] = useState([]);

  // State untuk menyimpan ID yang dipilih user

  const [categoryId, setCategoryId] = useState("");

  const [pembicaraId, setPembicaraId] = useState("");

  // Ambil data kategori dan pembicara dari API saat halaman dibuka

  useEffect(() => {
    async function fetchData() {
      try {
        // Ambil Kategori

        const resCat = await fetch(
          "https://crudnajwagiarekaazzahra-production.up.railway.app/categories",
        );

        const dataCat = await resCat.json();

        console.log("Kategori:", dataCat);

        setCategories(dataCat);

        setCategories(dataCat.data || []);

        // Ambil Pembicara

        const resPem = await fetch(
          "https://crudnajwagiarekaazzahra-production.up.railway.app/speakers",
        );

        const dataPem = await resPem.json();

        setPembicaras(dataPem.data || dataPem);

        setPembicaras(dataPem);
      } catch (error) {
        console.error("Gagal mengambil data pendukung:", error);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryId || !pembicaraId) {
      alert("Silahkan pilih kategori dan pembicara terlebih dahulu");

      return;
    }

    try {
      await addEvent({
        name,

        categoryId: Number(categoryId), // Ubah kembali ke angka saat kirim ke backend

        location,

        dateEvent,

        description,

        pembicaraId: Number(pembicaraId), // Ubah kembali ke angka saat kirim ke backend
      });

      alert("Event Berhasil Ditambahkan!");

      navigate("/dashboard/event");
    } catch (error) {
      console.error(error);

      alert("Gagal menambahkan event");
    }
  };

  return (
    <div className="p-6 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Tambah Event</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* INPUT NAMA EVENT */}

        <input
          type="text"
          placeholder="Nama Event"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* DROPDOWN */}

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">
            Pilih Kategori
          </label>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border p-2 rounded bg-white"
            required
          >
            <option value="">-- Pilih Kategori --</option>

            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* DROPDOWN */}

        <div className="space-y-1">
          <label className="text-sm font-semibold text-gray-600">
            Pilih Pembicara
          </label>

          <select
            value={pembicaraId}
            onChange={(e) => setPembicaraId(e.target.value)}
            className="w-full border p-2 rounded bg-white"
            required
          >
            <option value="">-- Pilih Pembicara --</option>

            {pembicaras.map((pem: any) => (
              <option key={pem.id} value={pem.id}>
                {pem.name}
              </option>
            ))}
          </select>
        </div>

        {/* LOKASI */}

        <input
          type="text"
          placeholder="Lokasi"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* TANGGAL */}

        <input
          type="date"
          value={dateEvent}
          onChange={(e) => setDateEvent(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />

        {/* DESKRIPSI */}

        <textarea
          placeholder="Deskripsi"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded h-32"
          required
        />

        <button
          type="submit"
          className="bg-red-900 text-white px-4 py-2 rounded w-full font-bold hover:bg-red-800 transition"
        >
          Simpan Event
        </button>
      </form>
    </div>
  );
}
