"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { moviesData } from "../services/api";
import MovieCard from "../components/MovieCard";

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredMovies = [...moviesData]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-grow overflow-x-hidden">
      {/* --- HEADER HERO SECTION --- */}
      <header className="relative w-full min-h-screen md:h-screen overflow-hidden bg-primary flex items-center pt-12 md:pt-0">
        
        {/* BACKGROUND DESKTOP */}
        <div
          className="absolute inset-0 hidden md:block bg-cover bg-center transition-transform duration-[20000ms] scale-110 animate-slow-zoom"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/f8/1d/3d/f81d3d41175775dbabb672ec19fd3f84.jpg')",
          }}
        ></div>

        {/* BACKGROUND MOBILE */}
        <div
          className="absolute inset-0 block md:hidden bg-cover bg-[center_top] transition-transform duration-[20000ms] scale-110 animate-slow-zoom"
          style={{
            backgroundImage:
              "url('https://i.pinimg.com/1200x/54/a8/6a/54a86a4580f44aefb4e887ddb53f92b6.jpg')",
          }}
        ></div>

        {/* Overlay Layers */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b md:bg-gradient-to-r from-primary/95 via-primary/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-primary/10"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-8 md:py-0">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 px-3 py-1.5 bg-white/10 backdrop-blur-md border-l-2 border-secondary mb-6 md:mb-8 animate-fade-in">
              <span className="text-secondary font-heading font-black text-[8px] md:text-[10px] uppercase tracking-[0.3em] md:tracking-[0.5em]">
                Classified Information
              </span>
            </div>

            <div className="relative mb-6 md:mb-10">
              <h2 className="text-accent font-heading font-bold text-xs md:text-base uppercase tracking-[0.3em] md:tracking-[0.4em] mb-3 md:mb-4 drop-shadow-lg">
                The Truth is Always One
              </h2>
              <h1 className="text-4xl sm:text-6xl md:text-[100px] font-heading font-black text-white leading-[1] md:leading-[0.9] tracking-tighter drop-shadow-2xl">
                TRACE THE <br className="hidden sm:block" />
                <span className="relative inline-block mt-1 md:mt-2 text-white">
                  UNSOLVED
                  <span className="absolute -bottom-1 md:-bottom-2 left-0 w-full h-2 md:h-3 bg-secondary/60 -z-10 rotate-1"></span>
                </span>
              </h1>
            </div>

            <div className="max-w-lg mb-8 md:mb-12 relative group">
              <p className="text-white text-base md:text-xl font-body leading-relaxed italic border-l-2 border-secondary pl-4 md:pl-6 drop-shadow-md">
                "Dalam setiap misteri, terdapat detail yang terabaikan. Di sini,
                kita tidak hanya menonton; kita mengobservasi."
                <span className="block mt-4 text-[10px] md:text-sm font-bold text-white/60 not-italic tracking-widest uppercase">
                  — ConanWatch Database
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mt-8">
              <Link
                href="/movies"
                className="group relative flex items-center justify-center gap-4 bg-[#e61e25] hover:bg-[#b9181d] text-white px-8 md:px-10 py-4 transition-all duration-300 shadow-[0_10px_30px_rgba(230,30,37,0.4)]"
              >
                <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-white/40"></div>
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/40"></div>
                <span className="material-icons text-lg md:text-xl group-hover:rotate-12 transition-transform">movie_filter</span>
                <span className="font-heading font-black uppercase tracking-[0.1em] md:tracking-[0.15em] text-xs md:text-sm">
                  Mulai Investigasi
                </span>
              </Link>

              <Link
                href="/watchlist"
                className="group flex items-center justify-center gap-3 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white px-8 py-4 border border-white/10 transition-all duration-300 shadow-lg"
              >
                <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-150 transition-transform"></div>
                <span className="font-heading font-bold uppercase tracking-widest text-[10px] md:text-[11px] text-white group-hover:text-white">
                  Arsip Kasus
                </span>
                <span className="material-icons text-sm text-white/50 group-hover:translate-x-1 transition-transform">east</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Identification Code */}
        <div className="absolute bottom-8 right-6 md:bottom-12 md:right-12 opacity-30 md:opacity-40 bg-black/20 backdrop-blur-sm px-4 py-2 border-r-2 border-secondary">
          <p className="font-heading font-black text-white text-right leading-none">
            <span className="text-[8px] md:text-xs tracking-[0.3em] md:tracking-[0.5em] block mb-1 md:mb-2">IDENTIFICATION</span>
            <span className="text-2xl md:text-5xl uppercase tracking-tighter">APTX4869 - 1412</span>
          </p>
        </div>
      </header>

      {/* --- FEATURED MOVIE SLIDER --- */}
      <section className="bg-primary py-16 md:py-40 overflow-hidden border-t border-white/5 relative">
        <div className="max-w-[1400px] mx-auto px-6 relative">
          
          {/* Header Section - Adjusted for Mobile */}
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-24 gap-6 md:gap-8 text-center md:text-left">
            <div>
              <div className="flex items-center justify-center md:justify-start gap-3 mb-3 md:mb-6">
                <span className="w-8 md:w-20 h-[2px] bg-secondary"></span>
                <h2 className="text-accent font-heading font-bold text-[8px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em]">
                  Premium Archive
                </h2>
              </div>
              {/* Ukuran Font Judul Slider di HP dikecilkan dari text-5xl ke text-4xl */}
              <h3 className="text-4xl md:text-8xl font-heading font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                Most <br className="hidden md:block" /> <span className="text-secondary">Wanted</span>
              </h3>
            </div>

            <div className="flex items-center gap-6 md:gap-8">
              <div className="flex gap-3 md:gap-4">
                <button
                  onClick={() => setCurrentSlide(0)}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all ${currentSlide === 0 ? "bg-secondary border-secondary text-white shadow-[0_0_20px_rgba(200,16,46,0.3)]" : "border-white/20 text-white/40 hover:border-white"}`}
                >
                  <span className="material-icons text-sm md:text-base">west</span>
                </button>
                <button
                  onClick={() => setCurrentSlide(1)}
                  className={`w-10 h-10 md:w-14 md:h-14 rounded-full border flex items-center justify-center transition-all ${currentSlide === 1 ? "bg-secondary border-secondary text-white shadow-[0_0_20px_rgba(200,16,46,0.3)]" : "border-white/20 text-white/40 hover:border-white"}`}
                >
                  <span className="material-icons text-sm md:text-base">east</span>
                </button>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden px-1"> {/* Tambahan padding kecil agar shadow card tidak terpotong */}
              <div
                className="flex transition-transform duration-1000 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                <div className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {featuredMovies.slice(0, 3).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>

                <div className="w-full shrink-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
                  {featuredMovies.slice(3, 6).map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* --- CALL TO ACTION --- */}
          <div className="mt-20 md:mt-40 mb-10 flex flex-col items-center relative">
            <Link href="/movies" className="group relative w-full max-w-lg md:max-w-none flex flex-col items-center justify-center p-1">
              <div className="absolute inset-0 border border-white/10 transition-all group-hover:border-secondary/50 group-hover:scale-105"></div>
              
              <div className="relative bg-primary/80 backdrop-blur-md w-full px-6 py-10 md:px-20 md:py-16 border border-white/10 overflow-hidden flex flex-col items-center gap-4 text-center">
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10"></div>

                <div className="flex items-center gap-2 md:gap-3 opacity-80">
                  <span className="w-2 h-2 bg-secondary group-hover:bg-white animate-pulse"></span>
                  <span className="text-[8px] md:text-[10px] font-heading font-black text-white tracking-[0.4em] md:tracking-[0.6em] uppercase">
                    Authorization Required
                  </span>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  <h4 className="text-white font-heading font-black text-2xl md:text-4xl tracking-tighter uppercase">
                    Unlock <span className="text-secondary group-hover:text-white">Archive</span>
                  </h4>
                  <span className="material-icons text-3xl md:text-4xl text-secondary group-hover:text-white group-hover:rotate-[360deg] duration-700">
                    fingerprint
                  </span>
                </div>

                <div className="mt-4 w-full h-6 flex gap-1 justify-center opacity-20">
                  {[...Array(15)].map((_, i) => (
                    <div key={i} className={`bg-white ${i % 3 === 0 ? "w-2" : "w-[1px]"}`}></div>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}