import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export default function CategoryCreate() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const addCategory = useAuthStore((state) => state.addCategory);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Harus diisi semua!");
            return;
        }

        addCategory({
            title,
            description,
        });

        navigate("/dashboard/category");
    };

    return (
        <div className="p-6 max-w-md">
            <h1 className="text-2xl font-bold mb-2">
                Tambah Category
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">

                <div>
                    <label>Judul</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label>Deskripsi</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button className="bg-red-900 text-white px-4 py-2 rounded">
                    Simpan
                </button>
            </form>
        </div>
    );
}