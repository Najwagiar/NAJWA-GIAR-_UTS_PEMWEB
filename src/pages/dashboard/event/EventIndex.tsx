import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";
import EventEdit from "./EventEdit"; 

export default function EventIndex() {
  const events = useAuthStore((state) => state.events);
  const fetchEvents = useAuthStore((state) => state.fetchEvents);
  const deleteEvent = useAuthStore((state) => state.deleteEvent);

  // State untuk Modal Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Event</h1>
          <p className="text-gray-500">Selamat Datang di Halaman Event</p>
        </div>

        {/* Tombol digeser ke kanan atas secara natural */}
        <Link
          to="/dashboard/event/create"
          className="bg-red-900 hover:bg-red-950 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
        >
          + Tambah Event
        </Link>
      </div>

      {/* GRID LAYOUT DATA EVENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.length > 0 ? (
          events.map((item: any) => (
            <div
              key={item.id}
              className="bg-pink-100 p-4 rounded-xl shadow border-l-8 border-red-900"
            >
              <h3 className="font-bold text-red-900 text-lg">{item.name}</h3>
              <p className="text-sm">Lokasi: {item.location}</p>
              <p className="text-sm">Tanggal: {formatDate(item.dateEvent)}</p>
              <p className="text-sm mt-2 line-clamp-2">Deskripsi: {item.description}</p>

              <div className="flex gap-4 mt-4">
                <button
                  onClick={() => { setEditingId(item.id); setIsEditOpen(true); }}
                  className="text-blue-700 text-sm font-semibold hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEvent(item.id)}
                  className="text-red-600 text-sm font-semibold hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">Tidak ada event yang ditemukan.</p>
        )}
      </div>

      {/* Modal Edit akan muncul hanya jika isEditOpen true */}
      {isEditOpen && editingId && (
        <EventEdit
          id={editingId}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            setIsEditOpen(false);
            fetchEvents(); // Refresh data setelah berhasil edit
          }}
        />
      )}
    </div>
  );
}