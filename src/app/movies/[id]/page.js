"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getMovieById } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import ReviewCard from "../../../components/ReviewCard";

export default function MovieDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: "5", text: "" });
  const [loadingReviews, setLoadingReviews] = useState(true);

  useEffect(() => {
    if (id) {
      setMovie(getMovieById(id));
      fetchReviews();
    }
  }, [id]);

  const fetchReviews = async () => {
    try {
      // BERUBAH: Menggunakan environment variable
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/reviews/${id}`,
      );
      const data = await response.json();
      if (response.ok) {
        setReviews(data);
      }
    } catch (error) {
      console.error("Gagal mengambil feed intelijen:", error);
    } finally {
      setLoadingReviews(false);
    }
  };

  if (!movie)
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center text-white font-heading animate-pulse text-xs tracking-[0.5em]">
        IDENTIFYING CASE FILE...
      </div>
    );

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert("Akses Ditolak: Silakan login untuk memberikan testimoni kasus.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const username = localStorage.getItem("username");

      // BERUBAH: Menggunakan environment variable
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/reviews/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId: id,
            username: username || "Agen Rahasia",
            rating: parseInt(reviewForm.rating),
            text: reviewForm.text,
          }),
        },
      );

      if (response.ok) {
        const savedReview = await response.json();
        setReviews([savedReview, ...reviews]);
        setReviewForm({ rating: "5", text: "" });
        alert("201 Created: Laporan intelijen berhasil diunggah ke feed.");
      }
    } catch (error) {
      alert("Gagal mengirim laporan ke server pusat.");
    }
  };

  const handleUpdateReview = async (reviewId, newText, newRating) => {
    try {
      const token = localStorage.getItem("token");
      // BERUBAH: Menggunakan environment variable
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/reviews/${reviewId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            text: newText,
            rating: parseInt(newRating),
          }),
        },
      );

      if (response.ok) {
        setReviews((prev) =>
          prev.map((rev) =>
            rev._id === reviewId
              ? { ...rev, text: newText, rating: parseInt(newRating) }
              : rev,
          ),
        );
        alert("200 OK: Data laporan berhasil dimodifikasi.");
      }
    } catch (error) {
      alert("Gagal memperbarui laporan.");
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!confirm("Apakah Anda yakin ingin memusnahkan laporan ini?")) return;

    try {
      const token = localStorage.getItem("token");
      // BERUBAH: Menggunakan environment variable
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/reviews/${reviewId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        setReviews((prev) => prev.filter((rev) => rev._id !== reviewId));
        alert("204 No Content: Laporan telah dimusnahkan dari arsip.");
      }
    } catch (error) {
      alert("Gagal menghapus laporan.");
    }
  };

  const addToWatchlist = async () => {
    if (!isAuthenticated) {
      alert("Akses Ditolak: Silakan Login untuk menyimpan berkas kasus ini.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      // BERUBAH: Menggunakan environment variable
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/watchlist/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            movieId: id,
            status: "pending",
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        alert(
          `200 OK: Case File "${movie.title}" berhasil diarsipkan di database pusat.`,
        );
      } else {
        alert(`Gagal: ${data.message}`);
      }
    } catch (error) {
      alert("System Failure: Gagal menghubungi server pusat.");
    }
  };

  return (
    // ... bagian return tetap sama persis seperti kode asli kamu ...
    <div className="w-full bg-primary min-h-screen pb-20 overflow-x-hidden">
      {/* Dynamic Hero Banner */}
      <div className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: `url('${movie.bg}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/70 md:via-primary/60 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 md:from-primary/80 via-transparent to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex flex-col justify-end pb-8 md:pb-12">
          <Link
            href="/movies"
            className="group flex items-center gap-2 text-white/60 hover:text-accent transition-all mb-4 md:mb-8 w-max"
          >
            <span className="material-icons text-xs group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span className="font-heading font-bold text-[10px] md:text-xs uppercase tracking-widest">
              Back to Archive
            </span>
          </Link>

          <div className="flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-8">
            <div className="relative w-44 aspect-[2/3] hidden md:block rounded-none border-4 border-white/10 shadow-2xl overflow-hidden group">
              <div
                className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                style={{ backgroundImage: `url('${movie.bg}')` }}
              ></div>
            </div>

            <div className="flex-grow">
              <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-4">
                <span className="px-2 py-1 md:px-3 md:py-1 bg-secondary text-white text-[8px] md:text-[10px] font-black uppercase italic tracking-tighter">
                  Case File M-{movie.id}
                </span>
                <span className="text-white/50 text-[10px] md:text-xs font-bold">
                  {movie.year}
                </span>
              </div>
              <h1 className="text-3xl md:text-7xl font-heading font-black text-white leading-[1.1] md:leading-none uppercase tracking-tighter mb-4 drop-shadow-xl">
                {movie.title}
              </h1>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 text-accent">
                  <span className="material-icons text-lg md:text-xl">
                    star
                  </span>
                  <span className="text-xl md:text-2xl font-black tracking-tighter">
                    {movie.rating}{" "}
                    <span className="text-[10px] md:text-xs text-white/40">
                      / 5.0
                    </span>
                  </span>
                </div>
                <div className="h-6 md:h-8 w-[1px] bg-white/20"></div>
                <p className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                  {reviews.length} Intel Reports
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-6 md:-mt-10 relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10">
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden group">
            <h3 className="font-heading font-black text-white mb-4 md:mb-6 text-lg md:text-xl uppercase tracking-tighter flex items-center gap-2">
              <span className="w-1.5 h-5 md:w-2 md:h-6 bg-secondary"></span>{" "}
              Case Synopsis
            </h3>
            <p className="text-gray-300 text-xs md:text-sm leading-relaxed mb-6 md:mb-8 italic font-body">
              "{movie.desc}"
            </p>
            <button
              onClick={addToWatchlist}
              className="w-full group relative overflow-hidden bg-secondary hover:bg-red-800 text-white py-3 md:py-4 font-heading font-black transition-all flex items-center justify-center gap-3 shadow-lg"
            >
              <span className="material-icons-outlined group-hover:rotate-12 transition-transform text-sm md:text-base">
                bookmark_add
              </span>
              <span className="tracking-widest text-[10px] md:text-xs">
                ADD TO WATCHLIST
              </span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-8 md:space-y-10">
          <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-8 shadow-2xl">
            <h3 className="font-heading font-black text-white mb-1 md:mb-2 text-lg md:text-xl uppercase tracking-tighter">
              Submit Intelligence
            </h3>
            <p className="text-[9px] md:text-xs text-white/40 mb-6 md:mb-8 tracking-widest uppercase font-bold">
              Status:{" "}
              <span
                className={
                  isAuthenticated ? "text-secondary italic" : "text-white/20"
                }
              >
                {isAuthenticated ? "AUTHORIZED_PERSONNEL" : "ACCESS_DENIED"}
              </span>
            </p>

            <form
              onSubmit={handleReviewSubmit}
              className="space-y-6 md:space-y-8"
            >
              <div className="space-y-3 md:space-y-4">
                <label className="text-[9px] md:text-[10px] font-black text-secondary uppercase tracking-[0.3em] md:tracking-[0.4em] flex items-center gap-2">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-secondary animate-pulse rounded-full"></span>
                  Threat Level Assessment
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 md:gap-3">
                  {[
                    { val: "5", label: "RANK S", desc: "Masterpiece" },
                    { val: "4", label: "RANK A", desc: "Great Case" },
                    { val: "3", label: "RANK B", desc: "Decent" },
                    { val: "2", label: "RANK C", desc: "Mediocre" },
                    { val: "1", label: "RANK D", desc: "Poor" },
                  ].map((rank) => (
                    <button
                      key={rank.val}
                      type="button"
                      onClick={() =>
                        setReviewForm({ ...reviewForm, rating: rank.val })
                      }
                      className={`relative p-2 md:p-4 border transition-all duration-500 group overflow-hidden ${
                        reviewForm.rating === rank.val
                          ? "border-secondary bg-secondary/10 shadow-[0_0_15px_rgba(200,16,46,0.2)]"
                          : "border-white/5 bg-white/5 hover:border-white/20"
                      }`}
                    >
                      {reviewForm.rating === rank.val && (
                        <div className="absolute top-0 left-0 w-full h-0.5 md:h-1 bg-secondary animate-shimmer"></div>
                      )}
                      <div className="flex flex-col items-center text-center gap-0.5 md:gap-1">
                        <span
                          className={`text-[10px] md:text-xs font-black tracking-tighter transition-colors ${
                            reviewForm.rating === rank.val
                              ? "text-secondary"
                              : "text-white/40 group-hover:text-white"
                          }`}
                        >
                          {rank.label}
                        </span>
                        <span
                          className={`text-[7px] md:text-[8px] font-bold uppercase tracking-widest transition-colors ${
                            reviewForm.rating === rank.val
                              ? "text-white"
                              : "text-white/20"
                          }`}
                        >
                          {rank.desc}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <textarea
                  rows="4"
                  required
                  value={reviewForm.text}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, text: e.target.value })
                  }
                  className="w-full bg-primary/50 border border-white/10 text-white text-xs md:text-sm p-3 md:p-4 focus:border-secondary outline-none transition-colors font-body italic"
                  placeholder="Analyze the plot, characters, and deductions here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full md:w-max px-8 md:px-10 py-3 md:py-4 bg-accent hover:bg-yellow-600 text-primary font-heading font-black text-[10px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] transition-all transform hover:-translate-y-1"
              >
                DISPATCH REPORT
              </button>
            </form>
          </div>

          <div className="space-y-6">
            <h3 className="font-heading font-black text-white text-xl md:text-2xl uppercase tracking-tighter flex items-center gap-3 md:gap-4">
              Intelligence Feed{" "}
              <span className="h-[1px] md:h-[2px] flex-grow bg-white/5"></span>
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {loadingReviews ? (
                <p className="text-white/20 text-xs italic animate-pulse">
                  Scanning feed...
                </p>
              ) : reviews.length === 0 ? (
                <div className="py-12 md:py-20 text-center border border-dashed border-white/5">
                  <p className="text-xs md:text-sm text-white/30 italic uppercase tracking-widest">
                    No active intel for this case file.
                  </p>
                </div>
              ) : (
                reviews.map((rev) => (
                  <ReviewCard
                    key={rev._id}
                    review={rev}
                    onUpdate={handleUpdateReview}
                    onDelete={handleDeleteReview}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
