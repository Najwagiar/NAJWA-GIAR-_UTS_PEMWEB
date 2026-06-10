import { useEffect, useState } from "react";

export default function DashboardIndex() {
  const [speakers, setSpeakers] = useState([]);
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch Data Category
    fetch("http://localhost:3000/category/")
      .then((res) => res.json())
      .then((data) => setCategories(data.data || data))
      .catch((err) => console.error("Error fetching categories:", err));

    // Fetch Data Pembicara (Sesuaikan URL jika berbeda, misal: /pembicara)
    fetch("http://localhost:3000/speakers/")
      .then((res) => res.json())
      .then((data) => setSpeakers(data.data || data))
      .catch((err) => console.error("Error fetching speakers:", err));

    // Fetch Data Event
    fetch("http://localhost:3000/Events/")
      .then((res) => res.json())
      .then((data) => setEvents(data.data || data))
      .catch((err) => console.error("Error fetching events:", err));
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