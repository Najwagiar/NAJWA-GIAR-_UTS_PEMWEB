import { Link } from "react-router-dom";
import { useAuthStore } from "../../../store/useAuthStore";

export default function CategoryIndex() {
  const categories = useAuthStore((state) => state.categories);
  const deleteCategory = useAuthStore((state) => state.deleteCategory);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-2">Category</h1>
      <p className="mb-6 text-gray-500">Selamat Datang di Halaman Category</p>

      <Link
        to="/dashboard/category/create"
        className="inline-block mb-6 px-4 py-2 bg-red-900 text-white rounded-lg"
      >
        + Tambah Category
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((item, index) => (
          <div
            key={index}
            className="bg-pink-100 p-5 rounded-xl shadow border-l-8 border-red-900 relative"
          >
            <h3 className="text-lg font-bold text-red-900 mb-2">
              {item.title}
            </h3>

            <p className="text-gray-700 mb-4">{item.description}</p>

            {/*DELETE BUTTON */}
            <button
              onClick={() => {
                const yakin = confirm("Yakin mau hapus?");
                if (yakin) {
                  deleteCategory(index);
                }
              }}
              className="text-red-600 text-sm hover:underline"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
