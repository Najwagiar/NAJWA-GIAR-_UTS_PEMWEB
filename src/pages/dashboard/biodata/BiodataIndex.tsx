export default function BiodataIndex() {
  const myData = {
    nama: "Najwa Giar Eka Azzahra",
    nim: "24090082",
    kelas: "4 C",
    matkul: "Pemrograman Web",
    bio: "Membangun masa depan, satu baris kode dalam satu waktu. Fokus pada inovasi web yang solutif dan berdampak",
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex items-start gap-4 mb-10">
        <div className="pt-2">
          <h1 className="text-3xl font-bold text-rose-900">Biodata Saya</h1>
          <p className="text-rose-500 text-sm">Informasi detail mengenai biodata saya</p>
        </div>
      </div>
      
      {/* KARTU BIODATA */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-rose-100 w-full">
        <h2 className="text-3xl font-bold text-rose-950 mb-6">{myData.nama}</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-rose-50 p-4 rounded-xl flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-lg text-rose-900 font-bold">ID</div>
            <div>
              <p className="text-rose-500 text-[10px] font-bold uppercase">NIM</p>
              <p className="font-bold text-rose-900">{myData.nim}</p>
            </div>
          </div>
          
          <div className="bg-rose-50 p-4 rounded-xl flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-lg text-rose-900">📖</div>
            <div>
              <p className="text-rose-500 text-[10px] font-bold uppercase">Kelas</p>
              <p className="font-bold text-rose-900">{myData.kelas}</p>
            </div>
          </div>

          <div className="col-span-2 bg-rose-50 p-4 rounded-xl flex items-center gap-3">
            <div className="bg-rose-100 p-2 rounded-lg text-rose-900">💻</div>
            <div>
              <p className="text-rose-500 text-[10px] font-bold uppercase">Mata Kuliah</p>
              <p className="font-bold text-rose-900">{myData.matkul}</p>
            </div>
          </div>
        </div>

        <p className="text-gray-600 leading-relaxed border-t border-rose-50 pt-4">
          {myData.bio}
        </p>
      </div>
    </div>
  );
}