"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "../../hooks/useAuth";
import { moviesData } from "../../services/api";

export default function WatchlistPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const [watchlist, setWatchlist] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // BERUBAH: Menggunakan environment variable
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/watchlist`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setWatchlist(data);
        }
      } catch (error) {
        console.error("Gagal memuat investigasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, []);

  if (!isAuthenticated) return null;

  const handleRemoveWatchlist = async (e, idToRemove) => {
    e.preventDefault();
    const confirmDelete = confirm("Hapus berkas kasus ini dari database?");

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
        // BERUBAH: Menggunakan environment variable
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/watchlist/${idToRemove}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          setWatchlist(watchlist.filter((item) => item._id !== idToRemove));
          alert("Berkas Kasus dimusnahkan.");
        }
      } catch (error) {
        alert("Gagal menghapus berkas.");
      }
    }
  };

  const handleMarkAsSolved = async (e, mongoId, movieId) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // BERUBAH: Menggunakan environment variable
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/watchlist/${mongoId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: "solved" }),
        }
      );

      if (response.ok) {
        setWatchlist(
          watchlist.map((item) =>
            item._id === mongoId ? { ...item, status: "solved" } : item
          )
        );
        alert("KASUS SELESAI! Laporan akan segera diarsipkan.");
        router.push(`/movies/${movieId}?action=review`);
      } else {
        alert("Gagal memperbarui status di database.");
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("Terjadi kesalahan sistem saat menutup kasus.");
    }
  };

  const filteredList = watchlist.filter((item) => item.status === activeTab);

  return (
    // ... bagian return tetap sama persis seperti kode responsif kamu sebelumnya ...
    <div className="w-full bg-primary min-h-screen pb-20 pt-[100px] md:pt-[120px]">
      <div className="max-w-6xl mx-auto px-5 md:px-6 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 md:mb-12 gap-6 border-l-4 border-secondary pl-4 md:pl-6 py-2">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-black text-white uppercase italic tracking-tighter leading-none">
              Investigation <span className="text-secondary">Tracker</span>
            </h1>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-bold mt-2">Monitoring Active Dossiers</p>
          </div>

          <div className="flex w-full md:w-auto bg-white/5 p-1 rounded-sm border border-white/10">
            {["pending", "solved"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 md:flex-none px-6 md:px-8 py-3 text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${
                  activeTab === tab ? "bg-secondary text-white shadow-lg" : "text-white/40 hover:text-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Watchlist Content */}
        {loading ? (
          <div className="flex flex-col items-center py-20 opacity-20">
            <div className="w-12 h-12 border-2 border-secondary border-t-transparent animate-spin mb-4"></div>
            <p className="text-white italic animate-pulse text-sm">Scanning database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {filteredList.map((item) => {
              const movie = moviesData.find((m) => Number(m.id) === Number(item.movieId));

              if (!movie) {
                console.log("Film tidak ditemukan untuk ID:", item.movieId);
                return null;
              }

              return (
                <Link
                  href={`/movies/${movie.id}`}
                  key={item._id}
                  className="group flex flex-col sm:flex-row bg-white/5 border border-white/10 hover:border-secondary/50 transition-all duration-500 overflow-hidden relative"
                >
                  <div className="w-full sm:w-32 md:w-40 h-48 sm:h-auto relative overflow-hidden shrink-0">
                    <Image
                      src={movie.bg}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent sm:hidden"></div>
                  </div>

                  <div className="p-5 md:p-6 flex flex-col justify-center flex-grow">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-[9px] md:text-[10px] font-black text-secondary uppercase tracking-widest italic">
                        Case M-{movie.id}
                      </span>
                      <span className="text-[9px] text-white/20 font-bold sm:hidden">{movie.year}</span>
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-heading font-black text-white uppercase tracking-tighter leading-tight mb-5 group-hover:text-accent transition-colors">
                      {movie.title}
                    </h3>

                    <div className="flex gap-2">
                      {item.status === "pending" ? (
                        <button
                          onClick={(e) => handleMarkAsSolved(e, item._id, movie.id)}
                          className="flex-grow py-3 bg-secondary text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:bg-red-800 transition-all border border-secondary active:scale-95"
                        >
                          Mark as Solved
                        </button>
                      ) : (
                        <div className="flex-grow py-3 bg-accent/10 border border-accent/20 text-accent text-center text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                          Case Solved
                        </div>
                      )}

                      <button
                        onClick={(e) => handleRemoveWatchlist(e, item._id)}
                        className="w-12 h-12 flex items-center justify-center bg-white/5 text-white/40 hover:text-secondary transition-all border border-white/10 active:scale-95"
                      >
                        <span className="material-icons text-xl">delete_sweep</span>
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredList.length === 0 && (
          <div className="text-center py-16 md:py-24 border border-dashed border-white/10 group bg-white/[0.02]">
            <span className="material-icons text-5xl md:text-6xl text-white/10 group-hover:text-secondary transition-colors duration-500 mb-4">
              search_off
            </span>
            <p className="text-white/30 uppercase font-black tracking-[0.2em] text-[10px] md:text-xs">
              No dossiers found in this sector.
            </p>
            <Link
              href="/movies"
              className="mt-6 inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 text-accent px-6 py-3 border border-accent/20 font-heading font-bold text-[10px] uppercase tracking-widest transition-all"
            >
              <span className="material-icons text-sm">add_circle</span>
              Start New Investigation
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
