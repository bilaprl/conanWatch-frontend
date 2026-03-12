'use client';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function ReviewCard({ review, onUpdate, onDelete }) {
  const { isAuthenticated } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(review.text);
  const [editedRating, setEditedRating] = useState(review.rating);

  const currentUserId = typeof window !== 'undefined' ? localStorage.getItem("userId") : null;
  const isOwner = isAuthenticated && currentUserId && (review.userId === currentUserId);

  const handleSave = () => {
    onUpdate(review._id, editedText, editedRating);
    setIsEditing(false);
  };

  return (
    <div className={`group relative p-4 md:p-6 border-l-4 transition-all duration-300 ${
      isOwner ? 'border-secondary bg-secondary/10' : 'border-white/10 bg-white/5'
    } hover:bg-white/10 mb-4 overflow-hidden`}>
      
      {/* Header Forum */}
      <div className="flex flex-row justify-between items-start mb-4 gap-2">
        <div className="flex items-center gap-3">
          {/* Avatar - Ukuran tetap stabil */}
          <div className="w-10 h-10 shrink-0 bg-primary border border-white/10 flex items-center justify-center font-black text-xs text-secondary shadow-lg">
            {review.username ? review.username.substring(0, 2).toUpperCase() : "AG"}
          </div>
          <div className="min-w-0"> {/* min-w-0 penting untuk truncate */}
            <h4 className="font-heading font-black text-white text-xs md:text-sm uppercase tracking-widest flex flex-wrap items-center gap-2">
              <span className="truncate max-w-[100px] md:max-w-none">{review.username || "Unknown Agent"}</span>
              {isOwner && (
                <span className="text-[7px] md:text-[8px] bg-secondary px-2 py-0.5 text-white animate-pulse shrink-0">
                  YOU / AUTH
                </span>
              )}
            </h4>
            <p className="text-[8px] md:text-[10px] text-white/30 font-bold uppercase italic truncate">
              INTEL_ID: {review._id?.substring(0, 8)}
            </p>
          </div>
        </div>

        {/* Badge Rating */}
        {!isEditing && (
          <div className="shrink-0 bg-black/40 px-2 md:px-3 py-1 flex items-center gap-1 text-accent border border-white/5 italic text-[10px] md:text-xs font-black">
            <span className="hidden xs:inline">RANK</span> {review.rating}/5
          </div>
        )}
      </div>

      {/* Body Content */}
      {isEditing ? (
        <div className="space-y-4 animate-fade-in bg-black/20 p-3 md:p-4 border border-white/5">
          <textarea 
            className="w-full bg-primary/50 border border-white/10 text-white text-sm p-3 outline-none focus:border-secondary font-body italic"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            rows="3"
          />
          <div className="flex flex-wrap gap-2">
            <button onClick={handleSave} className="flex-grow md:flex-none bg-secondary text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">
              Update Intel
            </button>
            <button onClick={() => setIsEditing(false)} className="flex-grow md:flex-none bg-white/10 text-white px-4 py-2 text-[10px] font-black uppercase tracking-widest">
              Abort
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-300 text-xs md:text-sm font-body leading-relaxed pl-4 md:pl-6 italic border-l border-white/5 break-words">
          {review.text}
        </p>
      )}

      {/* Action Buttons (Owner Only) */}
      {isOwner && !isEditing && (
        <div className="mt-6 flex flex-wrap gap-4 md:gap-6 border-t border-white/5 pt-4 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all">
          <button 
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-1 text-[9px] md:text-[10px] font-black text-accent hover:text-white transition-colors uppercase tracking-[0.2em]"
          >
            <span className="material-icons text-xs md:text-sm">edit_note</span> Edit Report
          </button>
          <button 
            onClick={() => {
              if(confirm("Hapus laporan ini secara permanen?")) onDelete(review._id);
            }}
            className="flex items-center gap-1 text-[9px] md:text-[10px] font-black text-white/30 hover:text-secondary transition-colors uppercase tracking-[0.2em]"
          >
            <span className="material-icons text-xs md:text-sm">delete_forever</span> Purge Intel
          </button>
        </div>
      )}
    </div>
  );
}