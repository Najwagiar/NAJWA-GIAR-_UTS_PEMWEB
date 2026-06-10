import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate, Link } from "react-router-dom";
import { InputText } from "../../../components/ui/InputText";

const schema = z.object({
  name: z.string().min(1, "Nama pembicara harus diisi"),

  role: z.string().min(1, "role harus diisi"),

  image: z.any().optional(),
});

type FormData = {
  name: string;
  role: string;
  image?: string;
};

export default function PembicaraCreate() {
  const navigate = useNavigate();

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
        role: data.role,
        image: data.image?.trim() || undefined,
      };

      const response = await fetch("http://localhost:3000/speakers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      // Jika server backend mengembalikan error (seperti 500 atau 400)
      if (!response.ok) {
        throw new Error("Gagal menyimpan ke server backend");
      }

      alert("Pembicara berhasil ditambahkan");

      navigate("/dashboard/pembicara");
    } catch (error) {
      console.log(error);

      alert("Gagal menambahkan pembicara");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className="bg-[#fdf3f6] shadow-lg rounded-2xl p-10 w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">
          Tambah Pembicara Baru
        </h1>

        <p className="text-center mb-6 text-red-800">
          Silahkan isi data pembicara di bawah ini
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText
            label="Nama Pembicara"
            nama="name"
            register={register}
            error={errors.name?.message}
          />

          <InputText
            label="role / Jabatan"
            nama="role"
            register={register}
            error={errors.role?.message}
          />

          {/* image */}

          <div>
            <label className="text-red-900 font-semibold">Image URL</label>

            <input
              type="text"
              placeholder="Masukkan URL gambar"
              {...register("image")}
              className="w-full bg-white border rounded p-2"
            />
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="submit"
              className="bg-red-900 text-white px-4 py-2 rounded"
            >
              Simpan
            </button>

            <Link
              to="/dashboard/pembicara"
              className="bg-gray-500 text-white px-5 py-2 rounded"
            >
              Batal
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
