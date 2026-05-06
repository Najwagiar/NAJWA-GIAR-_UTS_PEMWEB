import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../../components/ui/InputText";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

const schema = z.object({
  Nama: z.string().min(1, "Nama pembicara harus diisi"),
  Role: z.string().min(1, "Role harus diisi"),
  Foto: z.any().optional(),
});

type FormData = {
  Nama: string;
  Role: string;
  Foto?: any;
};

export default function PembicaraCreate() {
  const navigate = useNavigate();
  const addSpeaker = useAuthStore((state) => state.addSpeaker);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    // ambil file jadi URL
    let imageUrl = "";
    if (data.Foto && data.Foto[0]) {
      imageUrl = URL.createObjectURL(data.Foto[0]);
    }

    // simpan ke store
    addSpeaker({
      Nama: data.Nama,
      Role: data.Role,
      Foto: imageUrl,
    });

    alert("Pembicara Berhasil Ditambahkan");

    navigate("/dashboard/pembicara");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <div className=" bg-[#fdf3f6] shadow-lg rounded-2xl p-10">
        <h1 className="text-2xl font-bold mb-2 text-center text-red-900">
          Tambah Pembicara Baru
        </h1>

        <p className="text-center mb-6 text-red-800">
          Silahkan isi data pembicara di bawah ini
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText
            label="Nama Pembicara"
            nama="Nama"
            register={register}
            error={errors.Nama?.message}
          />

          <InputText
            label="Role / Jabatan"
            nama="Role"
            register={register}
            error={errors.Role?.message}
          />

          {/* FOTO */}
          <div>
            <label className="text-red-900 font-semibold">Foto Pembicara</label>

            <input
              type="file"
              {...register("Foto")}
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

            {/* FIX BATAL */}
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
