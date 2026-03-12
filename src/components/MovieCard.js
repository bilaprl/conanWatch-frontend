import Link from 'next/link';

export default function MovieCard({ movie }) {
  return (
    <Link 
      href={`/movies/${movie.id}`} 
      className="group relative flex flex-col w-full aspect-[16/9] bg-gray-900 overflow-hidden rounded-none border border-white/5 hover:border-secondary/50 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
    >
      {/* Background Image - Cinematic Landscape */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.5s] ease-out group-hover:scale-110 opacity-70 group-hover:opacity-100"
        style={{ backgroundImage: `url('${movie.bg}')` }}
      ></div>
      
      {/* Dynamic Overlays */}
      {/* Di mobile, gradient kita buat lebih pekat di bawah agar teks putih selalu terbaca */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 md:via-primary/20 to-transparent opacity-95 md:opacity-90 group-hover:opacity-80 transition-opacity duration-500"></div>
      <div className="absolute inset-0 bg-black/30 md:bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>

      {/* Content Info */}
      {/* Penyesuaian Padding: p-5 di mobile, p-8 di desktop */}
      <div className="relative mt-auto p-5 md:p-8 z-10">
        <div className="flex items-center gap-3 mb-2 md:mb-3 translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="bg-secondary text-[9px] md:text-[11px] font-black text-white px-2 md:px-3 py-1 uppercase italic tracking-tighter">
            CASE M-{movie.id}
          </span>
          <div className="flex items-center gap-1 text-accent">
            <span className="material-icons text-base md:text-lg">star</span>
            <span className="text-xs md:text-sm font-black tracking-tighter">{movie.rating}</span>
          </div>
        </div>

        {/* Font Size: text-xl di mobile, text-3xl di desktop */}
        <h3 className="font-heading font-black text-xl md:text-3xl text-white leading-tight md:leading-none uppercase tracking-tighter mb-1 md:mb-2 translate-y-2 md:translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 group-hover:text-accent drop-shadow-lg">
          {movie.title}
        </h3>

        <div className="flex items-center gap-3 md:gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 translate-y-2 md:translate-y-4 group-hover:translate-y-0">
          <p className="text-[8px] md:text-[10px] text-white/60 font-bold uppercase tracking-[0.2em] md:tracking-[0.3em]">
            Year: {movie.year}
          </p>
          <span className="w-4 md:w-8 h-[1px] bg-white/20"></span>
          <p className="text-[8px] md:text-[10px] text-secondary font-black uppercase tracking-[0.2em] md:tracking-[0.3em]">
            Open File
          </p>
        </div>
      </div>

      {/* Decorative Scanner Line Effect - Disesuaikan agar tidak terlalu jauh di mobile */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-secondary/50 -translate-y-full group-hover:translate-y-[100px] md:group-hover:translate-y-[180px] transition-all duration-[2s] opacity-0 group-hover:opacity-100"></div>
    </Link>
  );
}