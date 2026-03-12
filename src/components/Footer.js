"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "ConanWatch - Database Detektif",
          text: "Lacak dan ulas semua movie Detective Conan di sini!",
          url: window.location.href,
        });
      } catch (err) {
        console.log("Share failed:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link disalin! Bagikan berkas rahasia ini ke rekan detektif lainnya.");
    }
  };

  return (
    <footer className="bg-primary text-gray-400 py-12 border-t border-white/5 mt-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-secondary/30 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-10">
          
          {/* Brand Area - Rata Kanan Kiri di Mobile */}
          <div className="md:col-span-2 space-y-6">
            <div className="flex justify-between items-center md:justify-start md:gap-3">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 overflow-hidden rounded-lg border-2 border-secondary group-hover:border-accent transition-all duration-500 shadow-lg shadow-secondary/10 group-hover:-rotate-3">
                  <Image src="/images/logo.png" alt="Logo" fill className="object-cover" />
                </div>
                <span className="font-heading font-black text-xl tracking-tighter uppercase italic flex items-center">
                  <span className="text-white">CONAN</span>
                  <span className="text-secondary ml-0.5">WATCH</span>
                </span>
              </Link>
              {/* Badge kecil tambahan di mobile agar rata kanan */}
              <span className="md:hidden text-[8px] font-black border border-white/20 px-2 py-1 uppercase tracking-widest text-white/20">APTX4869-1412</span>
            </div>

            {/* Teks Deskripsi Justify (Rata Kanan Kiri) */}
            <p className="text-[10px] md:text-xs leading-relaxed text-white/40 font-body italic text-justify">
              "Satu-satunya cara untuk menemukan kebenaran adalah dengan terus
              mencari. Tidak ada kasus yang tidak bisa dipecahkan. Setiap petunjuk adalah kunci untuk membuka tabir misteri yang menyelimuti dunia kita."
            </p>

            <div className="flex justify-between items-center md:justify-start md:gap-4 border-t border-white/5 pt-4 md:border-none md:pt-0">
               <span className="text-[9px] font-bold md:hidden uppercase tracking-widest text-white/20">Connect:</span>
               <div className="flex gap-4">
                  <a href="https://www.instagram.com/nabilaprilll" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#E1306C] transition-all"><i className="fa-brands fa-instagram text-xl"></i></a>
                  <a href="https://www.linkedin.com/in/nabila-aprilianti-nuravifah/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-[#0077B5] transition-all"><i className="fa-brands fa-linkedin-in text-xl"></i></a>
                  <button onClick={handleShare} className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-white transition-all"><span className="material-icons text-lg">share</span></button>
               </div>
            </div>
          </div>

          {/* Navigasi - Rata Kanan Kiri */}
          <div className="border-t border-white/5 pt-6 md:border-none md:pt-0">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-heading font-black text-white text-[10px] uppercase tracking-[0.4em] flex items-center gap-2">
                <span className="w-2 h-2 bg-secondary"></span> Navigasi
              </h4>
              <span className="md:hidden text-[8px] text-white/10 uppercase font-black">Menu List</span>
            </div>
            <ul className="grid grid-cols-2 md:grid-cols-1 gap-x-4 gap-y-3 text-[11px] font-bold uppercase tracking-widest">
              <li><Link href="/" className="hover:text-secondary">Beranda</Link></li>
              <li className="text-right md:text-left"><Link href="/movies" className="hover:text-secondary">Koleksi</Link></li>
              <li><Link href="/watchlist" className="hover:text-secondary">Watchlist</Link></li>
              <li className="text-right md:text-left"><Link href="/profile" className="hover:text-secondary">Profil</Link></li>
            </ul>
          </div>

          {/* Status Sistem - Rata Kanan Kiri */}
          <div className="border-t border-white/5 pt-6 md:border-none md:pt-0">
            <h4 className="font-heading font-black text-white text-[10px] uppercase tracking-[0.3em] mb-6 flex items-center justify-between md:justify-start gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-accent"></span> Status
              </div>
              <span className="md:hidden text-[8px] bg-accent/10 px-1 text-accent animate-pulse">Live</span>
            </h4>
            <div className="space-y-3 text-[9px] font-mono">
              <p className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/20 uppercase">Keamanan:</span>
                <span className="text-accent italic font-bold">ENCRYPTED</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/20 uppercase">Lokasi:</span>
                <span className="text-white/60">TASIKMALAYA CITY</span>
              </p>
              <p className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-white/20 uppercase">Sesi:</span>
                <span className="text-white/60">AUTHORIZED</span>
              </p>
            </div>
          </div>
        </div>

        {/* Baris Bawah Copyright - Justify Between */}
        <div className="border-t border-white/10 pt-8 flex justify-between items-center gap-4 text-[8px] md:text-[9px]">
          <p className="font-black tracking-[0.1em] md:tracking-[0.2em] uppercase text-white/20 max-w-[150px] md:max-w-none">
            &copy; {new Date().getFullYear()} bilaprl . ConanWatch
          </p>
          <div className="flex gap-4 md:gap-6 font-bold text-white/10 uppercase tracking-widest text-right">
            <span className="hover:text-white/40">Privacy</span>
            <span className="hover:text-white/40">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}