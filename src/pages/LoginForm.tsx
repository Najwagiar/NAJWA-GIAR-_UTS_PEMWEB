import { useForm } from "react-hook-form";
import { InputText } from "../components/ui/InputText";
import { InputPassword } from "../components/ui/InputPassword";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Button from "../components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";

const schema = z.object({
    email: z.string().email({ message: "Email harus diisi dengan benar" }),
    password: z.string().min(8, { message: "Password minimal 8 karakter" })
});

interface FormData {
    email: string;
    password: string;
}

export default function LoginForm() {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login)

    // const [email, setEmail] = useState<string>("");
    // const [password, setPassword] = useState<string>("");
    const { register, handleSubmit, formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(schema)
    });


    const onSubmit = (data: FormData) => {
        console.log(data);
        if(data.email == "najwagiar@gmail.com" && data.password == "24090082"){
            alert("Login Berhasil");

            login(data.email);

        // Redirect ke halaman dashboard
        navigate("/dashboard");
        } else {
            alert("Email atau password anda salah!");
        }

    };


    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputText
                    label="Email"
                    nama="email"
                    register={register}
                    error={errors.email?.message}
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
            {/* <div style={{marginTop: "80px"}}>
                <DaftarForm/>
            </div> */}
        </div>
    );
}