import { useEffect, useState, type ComponentType } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore"; 
import UserEdit from "./UserEdit"; 

export default function UserIndex() {
  // 1. Ambil State global & Actions dari useAuthStore
  const { users, fetchUsers, deleteUser, loadingUser } = useAuthStore();

  // 2. State Lokal untuk mengontrol PopUp Modal Edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const UserEditComponent = UserEdit as ComponentType<{
    id: number;
    onClose: () => void;
    onSuccess: () => void;
  }>;

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number, name: string) => {
    if (confirm(`Apakah kamu yakin ingin menghapus user "${name}"?`)) {
      try {
        await deleteUser(id);
        alert("User berhasil dihapus");
      } catch (error) {
        console.error(error);
        alert("Gagal menghapus user");
      }
    }
  };

  // 3. Fungsi untuk mentrigger terbukanya Modal Popup
  const openEdit = (id: number) => {
    setEditingId(id);
    setIsEditOpen(true);
  };

  // Validasi pengaman array dari store
  const safeUsers = Array.isArray(users) ? users : [];

  return (
    <div className="p-6">
      <div className="bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Users</h1>
            <p className="text-sm text-gray-500">Selamat Datang di Halaman Users</p>
          </div>
          
          <Link 
            to="/dashboard/user/create" 
            className="bg-red-900 hover:bg-red-950 text-white px-4 py-2 rounded-lg font-semibold text-sm transition-colors"
          >
            + Tambah User
          </Link>
        </div>

        {/* LOADING STATE */}
        {loadingUser ? (
          <p className="text-gray-500 animate-pulse text-sm">Sedang memuat data...</p>
        ) : safeUsers.length === 0 ? (
          <p className="text-gray-400 italic text-sm">Belum ada pengguna terdaftar.</p>
        ) : (
          /* TABEL DATA USER */
          <div className="overflow-x-auto border border-gray-100 rounded-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-red-50 text-red-950 text-sm font-semibold border-b border-red-100">
                  <th className="p-4">Profil</th>
                  <th className="p-4">Email</th>
                  <th className="p-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {safeUsers.map((user: any) => (
                  <tr key={user.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 flex items-center space-x-3">
                      <img
                        src={user.foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150"}
                        alt={user.name}
                        className="w-10 h-10 object-cover rounded-full border border-gray-200"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150";
                        }}
                      />
                      <span className="font-semibold text-gray-900">{user.name || "No Name"}</span>
                    </td>
                    <td className="p-4 text-gray-600">{user.email || "-"}</td>
                    <td className="p-4 text-center space-x-4">
                      <button 
                        onClick={() => openEdit(user.id)} 
                        className="text-amber-600 font-bold hover:underline text-sm"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id, user.name)} 
                        className="text-red-600 font-bold hover:underline text-sm"
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL POPUP EDIT USER */}
      {isEditOpen && editingId !== null && (
        <UserEditComponent
          id={editingId}
          onClose={() => setIsEditOpen(false)}
          onSuccess={() => {
            fetchUsers(); // Refresh data biar langsung terupdate di tabel setelah disave
            setIsEditOpen(false);
          }}
        />
      )}
    </div>
  );
}