'use client';

import { useState } from 'react';
import { moviesData } from '../../services/api';
import MovieCardPortrait from '@/components/MoiveCardPotrait';
import SearchBar from '../../components/SearchBar';

export default function MoviesCatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const allMovies = [...moviesData];
  
  const comingSoonMovie = {
    id: 29,
    title: "Detective Conan: Case 29 (Official Title TBA)",
    year: "2026",
    rating: "??",
    bg: "https://images.unsplash.com/photo-1618519764620-7403abdbddd9?q=80&w=2000",
    isComingSoon: true
  };

  const displayMovies = [...allMovies, comingSoonMovie];

  const filteredMovies = displayMovies.filter(movie =>
    movie.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-primary text-white pt-[100px] md:pt-[120px] pb-20 md:pb-32">
      {/* Background Decor - Scanner Grid */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        
        {/* Header Section - Diubah jadi flex-col di mobile agar tidak berantakan */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8 border-b border-white/10 pb-8 md:pb-10">
          <div className="w-full">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 md:w-8 h-1 bg-secondary"></span>
              <p className="text-accent font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em]">Internal Database</p>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-black italic uppercase tracking-tighter leading-none">
              Archive <span className="text-secondary">Files</span>
            </h1>
          </div>
          
          {/* SearchBar Full Width di Mobile */}
          <div className="w-full md:w-80">
            <SearchBar 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search Case Number or Title..." 
            />
          </div>
        </div>

        {/* Movies Grid - Penyesuaian Kolom agar pas di layar HP */}
        {/* grid-cols-2 (Mobile), sm:3, md:4, lg:5 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-y-8 md:gap-y-12 gap-x-4 md:gap-x-8">
          {filteredMovies.map((movie) => (
            <MovieCardPortrait key={movie.id} movie={movie} />
          ))}
        </div>

        {/* Result Counter */}
        <div className="mt-16 md:mt-20 flex flex-col items-center opacity-30">
          <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white to-transparent mb-4"></div>
          <p className="text-[9px] md:text-[10px] font-bold tracking-[0.3em] md:tracking-[0.5em] uppercase text-center">
            Total Cases Found: {filteredMovies.length} / 29
          </p>
        </div>

        {/* Empty State jika hasil pencarian tidak ada */}
        {filteredMovies.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20">
            <span className="material-icons text-5xl text-white/10 mb-4">search_off</span>
            <p className="text-white/40 italic font-body">No case files match your search query.</p>
          </div>
        )}
      </div>
    </div>
  );
}