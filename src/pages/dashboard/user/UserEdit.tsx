import { useEffect } from "react";
import { useForm, type UseFormRegister } from "react-hook-form";
// Hapus import { Link } jika tidak digunakan lagi untuk navigasi halaman

interface UserFormValues {
  name: string;
  email: string;
  password?: string;
  foto: string;
}

interface InputTextProps {
  label: string;
  nama: keyof UserFormValues;
  register: UseFormRegister<UserFormValues>;
  error?: string;
}

function InputText({ label, nama, register, error }: InputTextProps) {
  return (
    <div>
      <label className="text-red-900 font-semibold block mb-1 text-sm">{label}</label>
      <input
        type="text"
        placeholder={label}
        {...register(nama)}
        className="w-full bg-white border border-gray-200 rounded p-2 text-sm focus:outline-red-900"
      />
      {error && <p className="text-xs text-red-700 mt-1">{error}</p>}
    </div>
  );
}

// 1. Definisikan Interface Props agar bisa menerima data dari UserIndex
interface UserEditProps {
  id: number;
  onClose: () => void;     // Fungsi untuk menutup modal
  onSuccess: () => void;   // Fungsi untuk merefresh data & menutup modal setelah save
}

export default function UserEdit({ id, onClose, onSuccess }: UserEditProps) {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserFormValues>();

  // 2. Mengambil data lama User dari API berdasarkan ID saat modal terbuka
  useEffect(() => {
    async function getUserDetail() {
      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${baseUrl}/users/${id}`); // Sesuaikan endpoint backend kamu
        if (response.ok) {
          const result = await response.json();
          // Set nilai awal form dengan data dari backend
          setValue("name", result.name);
          setValue("email", result.email);
          setValue("foto", result.foto);
        }
      } catch (error) {
        console.error("Gagal mengambil detail user", error);
      }
    }
    getUserDetail();
  }, [id, setValue]);

  // 3. Fungsi Submit ketika tombol "Simpan Perubahan" diklik
  const onSubmit = async (data: UserFormValues) => {
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      
      // Jika password kosong, hapus properti password agar tidak ikut terupdate jadi string kosong
      if (!data.password) {
        delete data.password;
      }

      const response = await fetch(`${baseUrl}/users/${id}`, {
        method: "PUT", // atau PATCH sesuai backend kamu
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Gagal mengupdate user");

      alert("User berhasil diperbarui!");
      onSuccess(); // 🔥 Memicu refresh data tabel dan tutup modal otomatis
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan perubahan");
    }
  };

  return (
    /* 4. MENGUBAH CONTAINER MENJADI LAYER FIXED OVERLAY (POPUP) */
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex justify-center items-center z-50 p-4 animate-fadeIn">
      
      {/* Isi Kotak Modal Form */}
      <div className="bg-[#fdf3f6] shadow-2xl rounded-2xl p-8 w-full max-w-lg relative border border-red-100">
        
        {/* Tombol Silang (X) di pojok kanan atas untuk menutup modal (Opsional) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl"
        >
          ✕
        </button>

        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">Edit Informasi User</h1>
        <p className="text-xs text-center text-gray-500 mb-6">Mengedit pengguna dengan ID: {id}</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText label="Nama Lengkap" nama="name" register={register} error={errors.name?.message} />
          <InputText label="Alamat Email" nama="email" register={register} error={errors.email?.message} />
          
          <div>
            <label className="text-red-900 font-semibold block mb-1 text-sm">Password Baru (Kosongkan jika tak diubah)</label>
            <input type="password" placeholder="••••••••" {...register("password")} className="w-full bg-white border border-gray-200 rounded p-2 text-sm focus:outline-red-900" />
          </div>
          
          <div>
            <label className="text-red-900 font-semibold block mb-1 text-sm">Foto URL</label>
            <input type="text" {...register("foto")} className="w-full bg-white border border-gray-200 rounded p-2 text-sm focus:outline-red-900" />
          </div>
          
          {/* ACTION BUTTONS */}
          <div className="flex gap-4 mt-6 pt-2">
            <button type="submit" className="bg-red-900 hover:bg-red-950 text-white px-4 py-2 rounded font-semibold text-sm transition-colors flex-1">
              Simpan Perubahan
            </button>
            {/* 🔥 Mengubah <Link> menjadi <button type="button"> yang menjalankan fungsi onClose */}
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded font-semibold text-sm transition-colors"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}