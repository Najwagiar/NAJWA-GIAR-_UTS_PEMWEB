import { useAuthStore } from "../../../store/useAuthStore";
import { Link } from "react-router-dom";

export default function PembicaraIndex() {
  const speakers = useAuthStore((state) => state.speakers);
  const deleteSpeaker = useAuthStore((state) => state.deleteSpeaker);

  return (
    <div className="p-6 ">

      <h1 className="text-2xl font-bold mb-2">Pembicara</h1>
      <p className="mb-6 text-gray-500">Selamat Datang di Halaman Pembicara</p>

      <Link
        to="/dashboard/pembicara/create"
        className="bg-red-900 text-white px-4 py-2 rounded mb-6 inline-block"
      >
        + Tambah Pembicara
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {speakers.map((item, index) => (
          <div key={index} className="bg-pink-100 p-5 rounded-xl shadow border-l-8 border-red-900 relative">

            {item.Foto && (
              <img
                src={item.Foto}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}

            <h3 className="font-bold">{item.Nama}</h3>
            <p className="text-gray-600">{item.Role}</p>

            <button
              onClick={() => deleteSpeaker(index)}
              className="text-red-500 mt-2 text-sm"
            >
              Hapus
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}