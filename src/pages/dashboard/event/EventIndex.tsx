import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export default function EventIndex() {
  const events = useAuthStore((state) => state.events);
  const deleteEvent = useAuthStore((state) => state.deleteEvent);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Event</h1>
      <p className="mb-6 text-gray-500">Selamat Datang di Halaman Event</p>

      <Link
        to="/dashboard/event/create"
        className="inline-block mb-6 px-4 py-2 bg-red-900 text-white rounded"
      >
        + Tambah Event
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {events.map((item, index) => (
          <div
            key={index}
            className="bg-pink-100 p-4 rounded shadow border-l-4 border-red-900"
          >
            <h3 className="font-bold text-red-900 text-lg">
              {item.namaEvent}
            </h3>

            <p>Pembicara: {item.pembicara}</p>
            <p>Tanggal: {item.tanggal}</p>
            <p>Jam: {item.jam}</p>

            <button
              onClick={() => deleteEvent(index)}
              className="text-red-600 text-sm mt-2"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}