import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryCreate() {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description) {
            alert("Harus diisi semua!");
            return;
        }

        try {

            const response = await fetch("http://localhost:3000/category", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    name: title,
                    description: description,
                }),
            });

            const result = await response.json();

            console.log(result);

            alert("Category berhasil ditambahkan!");

            navigate("/dashboard/category");

        } catch (error) {
            console.log(error);

            alert("Gagal menambahkan category");
        }
    };

    return (
        <div className="p-6 max-w-md">

            <h1 className="text-2xl font-bold mb-2">
                Tambah Category
            </h1>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >

                <div>
                    <label className="block mb-1">
                        Judul
                    </label>

                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label className="block mb-1">
                        Deskripsi
                    </label>

                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-red-900 text-white px-4 py-2 rounded"
                >
                    Simpan
                </button>

            </form>
        </div>
    );
}