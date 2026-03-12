'use client';

export default function SearchBar({ value, onChange, placeholder = "Search Case..." }) {
  return (
    <div className="relative group w-full">
      {/* Efek Cahaya di Belakang (Glow) - Dibuat lebih halus di mobile agar tidak berat */}
      <div className="absolute -inset-0.5 bg-secondary opacity-0 group-focus-within:opacity-10 md:group-focus-within:opacity-20 blur transition duration-500"></div>
      
      <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 px-3 md:px-4 py-3 transition-all duration-300 group-focus-within:border-secondary/50 group-focus-within:bg-black/60 shadow-2xl">
        
        {/* Ikon Pencarian */}
        <div className="relative mr-2 md:mr-3 flex items-center justify-center shrink-0">
          <span className="material-icons text-gray-500 text-lg md:text-xl group-focus-within:text-secondary transition-colors duration-300">
            manage_search
          </span>
          {/* Garis Vertikal Kecil Pemisah */}
          <div className="ml-2 md:ml-3 h-4 w-[1px] bg-white/10 group-focus-within:bg-secondary/30 transition-colors"></div>
        </div>

        {/* Input Field - text-xs di mobile agar tidak overflow */}
        <input
          type="text"
          placeholder={placeholder}
          className="w-full bg-transparent text-xs md:text-sm text-white placeholder:text-white/20 focus:outline-none font-body tracking-wide"
          value={value}
          onChange={onChange}
        />

        {/* Shortcut Hint - Otomatis hilang di mobile/tablet */}
        <div className="hidden lg:flex items-center gap-1 ml-2 opacity-20 group-focus-within:opacity-0 transition-opacity shrink-0">
          <span className="text-[9px] font-black border border-white/30 px-1.5 py-0.5 rounded text-white uppercase">CTRL</span>
          <span className="text-[9px] font-black border border-white/30 px-1.5 py-0.5 rounded text-white uppercase">K</span>
        </div>

        {/* Dekorasi Sudut - Khas UI Detektif */}
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-focus-within:border-secondary transition-colors"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-focus-within:border-secondary transition-colors"></div>
      </div>

      {/* Status Text di Bawah */}
      <div className="absolute -bottom-5 right-0 overflow-hidden pointer-events-none">
        <p className={`text-[7px] md:text-[8px] font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase transition-all duration-500 ${value ? 'text-secondary translate-y-0' : 'text-transparent translate-y-full'}`}>
          Filtering Database...
        </p>
      </div>
    </div>
  );
}