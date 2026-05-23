import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

// 1. Ubah Schema: Email jadi NIM (string atau number sesuai kebutuhan)
const schema = z.object({
    nim: z.string().min(8, { message: "NIM harus 8 karakter" }),
    password: z.string().min(8, { message: "Password minimal 8 karakter" })
});

interface FormData {
    nim: string;
    password: string;
}

export default function LoginForm() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    });

    const onSubmit = (data: FormData) => {
        // 2. Ubah pengecekan logika (sesuaikan dengan NIM kamu)
        if(data.nim == "24090082" && data.password == "24090082"){
            alert("Login Berhasil");
            login(data.nim); // Simpan NIM ke state auth
            navigate("/dashboard");
        } else {
            alert("NIM atau password anda salah!");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* 3. Ubah InputText menjadi NIM */}
                <InputText
                    label="NIM"
                    nama="nim"
                    register={register}
                    error={errors.nim?.message}
                />

                <InputPassword
                    label="Password"
                    nama="password"
                    register={register}
                    error={errors.password?.message}
                />

                <div>
                    <Button label="Login" variant="primary"/>
                </div>

                <div>
                    Belum punya akun? <Link to="/register">Daftar Disini</Link>
                </div>
            </form>
        </div>
    );
}