import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function DashboardIndex() {
  const speakers = useAuthStore((state) => state.speakers);
  const events = useAuthStore((state) => state.events);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://crudnajwagiarekaazzahra-production.up.railway.app/categories/")
      .then((res) => res.json())
      .then((data) => setCategories(data.data || data))
      .catch(() => {});
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-rose-900">Dashboard</h1>
      <p className="mb-6 text-gray-500">Selamat Datang di Halaman Dashboard</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-200">
          <h2 className="text-sm text-gray-500 mb-2">Total Category</h2>
          <p className="text-3xl font-bold text-rose-900">{categories.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-200">
          <h2 className="text-sm text-gray-500 mb-2">Total Pembicara</h2>
          <p className="text-3xl font-bold text-rose-900">{speakers.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-rose-200">
          <h2 className="text-sm text-gray-500 mb-2">Total Event</h2>
          <p className="text-3xl font-bold text-rose-900">{events.length}</p>
        </div>
      </div>
    </div>
  );
}