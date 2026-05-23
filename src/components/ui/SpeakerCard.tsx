interface SpeakerCardProps {
  name: string;
  role: string;
  imageUrl: string;
}

export const SpeakerCard: React.FC<SpeakerCardProps> = ({
  name,
  role,
  imageUrl,
}) => {
  return (
    <div className="cursor-pointer flex flex-col items-center gap-4 group">
      <div className="relative z-10">
        <img
          src={imageUrl}
          alt={name}
          className="h-64 w-64 rounded-full border-10px border-red-900 mx-auto group-hover:scale-105 transition-transform duration-300 object-cover bg-gray-200"
          // fallback jika gambar gagal dimuat
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/256?text=No+Image";
          }}
        />
      </div>
      
      <div className="flex flex-col items-center border-4 border-red-900 w-full p-4 rounded-lg relative py-10 shadow-xl shadow-black/20 group-hover:shadow-2xl group-hover:shadow-black/40 transition-all duration-300">
        {/* Card overlay dengan z-index agar tidak menutupi teks */}
        <div className="absolute inset-0 rounded-lg group-hover:bg-red-200/50 transition-all duration-300 pointer-events-none"></div>
        
        <div className="relative flex flex-col gap-2 text-center">
          <h3 className="text-2xl text-red-900 font-semibold">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default SpeakerCard;