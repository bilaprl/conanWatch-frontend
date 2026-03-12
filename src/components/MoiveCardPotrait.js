import Link from 'next/link';

export default function MovieCardPortrait({ movie }) {
  // Jika ini movie 29 (Coming Soon)
  if (movie.isComingSoon) {
    return (
      <div className="group relative flex flex-col w-full aspect-[2/3] bg-black border border-white/5 overflow-hidden transition-all duration-500">
        <div className="absolute inset-0 bg-secondary/5 group-hover:bg-secondary/10 transition-colors"></div>
        
        {/* Konten Terkunci */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-6 text-center">
          <span className="material-icons text-3xl md:text-4xl text-secondary mb-2 md:mb-3 animate-pulse">lock</span>
          <h3 className="text-white font-heading font-black text-xs md:text-sm uppercase tracking-widest leading-tight">
            Case 029: <br /> <span className="text-secondary">Classified</span>
          </h3>
          <p className="mt-3 md:mt-4 text-[8px] md:text-[10px] text-white/40 font-bold uppercase tracking-widest italic">Target Release: 2026</p>
        </div>

        {/* Glitch Overlay Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity">
          <div className="h-1 w-full bg-white animate-scanline"></div>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/movies/${movie.id}`} className="group flex flex-col w-full">
      {/* Poster Area */}
      <div className="relative aspect-[2/3] w-full bg-gray-900 overflow-hidden border border-white/5 transition-all duration-500 group-hover:border-secondary/50 group-hover:shadow-[0_0_30px_rgba(200,16,46,0.15)]">
        {/* Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center grayscale-[0.3] md:grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
          style={{ backgroundImage: `url('${movie.bg}')` }}
        ></div>
        
        {/* Case Number Badge - Ukuran Lebih Pas di Mobile */}
        <div className="absolute top-0 left-0 bg-secondary px-2 md:px-3 py-1 z-20">
          <p className="text-[8px] md:text-[10px] font-black text-white italic tracking-tighter">M-{movie.id}</p>
        </div>

        {/* Overlay on Hover (Desktop) & Permanent Soft Gradient (Mobile) */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Info on Hover - Penyesuaian untuk Layar Sentuh */}
        <div className="absolute inset-x-0 bottom-0 p-3 md:p-4 translate-y-full md:translate-y-full group-hover:translate-y-0 transition-transform duration-500 hidden md:block">
          <button className="w-full bg-white text-primary py-2 text-[10px] font-black uppercase tracking-widest active:scale-95 transition-transform">
            Open File
          </button>
        </div>
        
        {/* Mobile Indicator (Hanya muncul di layar sentuh sebagai pengganti hover button) */}
        <div className="absolute bottom-2 right-2 md:hidden">
            <span className="material-icons text-white/50 text-sm">open_in_new</span>
        </div>
      </div>

      {/* Meta Data (Below Poster) */}
      <div className="mt-3 md:mt-4 px-1 md:px-0">
        <h3 className="font-heading font-bold text-xs md:text-sm text-white/90 group-hover:text-accent transition-colors truncate uppercase tracking-tighter">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <p className="text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-widest">{movie.year}</p>
          <div className="flex items-center gap-1 text-accent scale-90 md:scale-75 origin-right">
            <span className="material-icons text-[10px] md:text-xs">star</span>
            <span className="text-xs font-black tracking-tighter">{movie.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}