import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "../../../components/ui/InputText";
import { useAuthStore } from "../../../store/useAuthStore";

const schema = z.object({
  name: z.string().min(1, "Nama user harus diisi"),
  email: z.string().email("Format email tidak valid").min(1, "Email harus diisi"),
  password: z.string().min(6, "Password minimal harus 6 karakter"),
  foto: z.string().optional().or(z.literal("")), 
});

type FormData = z.infer<typeof schema>;

export default function UserCreate() {
  const navigate = useNavigate();
  const addUser = useAuthStore((state: any) => state.addUser); 

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.name,
        email: data.email,
        password: data.password,
        foto: data.foto && data.foto.trim() !== "" 
          ? data.foto.trim() 
          : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
      };

      await addUser(payload);
      alert("User berhasil ditambahkan");
      navigate("/dashboard/user");
    } catch (error: any) {
      console.log(error);
      alert(error.message || "Gagal menambahkan user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-[#fdf3f6] shadow-lg rounded-2xl p-10 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">
          Tambah User Baru
        </h1>
        <p className="text-center mb-6 text-red-800">
          Silahkan isi data user di bawah ini
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText
            label="Nama Lengkap"
            nama="name"
            register={register}
            error={errors.name?.message}
          />
          <InputText
            label="Alamat Email"
            nama="email"
            register={register}
            error={errors.email?.message}
          />
          <div>
            <label className="text-red-900 font-semibold text-sm">Password</label>
            <input
              type="password"
              placeholder="Masukkan password"
              {...register("password")}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-900 text-sm"
            />
            {errors.password && (
              <p className="text-sm text-red-700 mt-1">{errors.password.message}</p>
            )}
          </div>
          <div>
            <label className="text-red-900 font-semibold text-sm">Foto URL</label>
            <input
              type="text"
              placeholder="Masukkan URL foto profile"
              {...register("foto")}
              className="w-full bg-white border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-red-900 text-sm"
            />
          </div>
          <div className="flex gap-4 mt-6">
            <button type="submit" className="bg-red-900 hover:bg-red-950 transition-colors text-white px-4 py-2 rounded-lg font-semibold text-sm">
              Simpan
            </button>
            <Link to="/dashboard/user" className="bg-gray-500 hover:bg-gray-600 transition-colors text-white px-5 py-2 rounded-lg font-semibold text-sm text-center">
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}