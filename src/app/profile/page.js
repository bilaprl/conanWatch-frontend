"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../hooks/useAuth";

export default function ProfilePage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  // State Profile
  const [username, setUsername] = useState("NABILA");
  const [email, setEmail] = useState("loading@conanwatch.com");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedName = localStorage.getItem("username");
    const savedEmail = localStorage.getItem("email");

    if (!token) {
      router.push("/login");
    } else {
      if (savedName) setUsername(savedName);
      if (savedEmail) setEmail(savedEmail);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      // BERUBAH: Menggunakan environment variable
      const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/auth/update-profile`,
  {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ username: username }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("username", username);
        window.dispatchEvent(new Event("storage"));
        setIsEditing(false);
        alert("200 OK: Identitas di database pusat telah diperbarui!");
      } else {
        alert("Gagal update: " + data.message);
      }
    } catch (error) {
      console.error("Update Error:", error);
      alert("System Failure: Koneksi ke database terputus.");
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = confirm(
      "PERINGATAN KRITIS: Identitas Anda akan dihapus permanen dari sistem pusat. Lanjutkan?"
    );

    if (confirmDelete) {
      try {
        const token = localStorage.getItem("token");
       const response = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/auth/delete-account`,
  {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }
);
        if (response.ok) {
          localStorage.clear();
          window.dispatchEvent(new Event("storage"));
          alert("TERMINATED: Akun telah dihapus.");
          logout();
          window.location.href = "/";
        } else {
          alert("Gagal memproses penghapusan akun.");
        }
      } catch (error) {
        console.error("Delete Error:", error);
        alert("System Failure: Koneksi ke pusat terputus.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-[100px] md:pt-[120px] pb-20 relative overflow-hidden">
      {/* Background Decor - Hanya muncul di Desktop agar Mobile tidak lag */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none hidden md:block">
        <span className="material-icons text-[500px]">fingerprint</span>
      </div>

      <div className="max-w-2xl mx-auto px-5 md:px-6 relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-accent font-heading font-bold text-[10px] md:text-xs uppercase tracking-[0.5em] mb-4">
            Detective Identity
          </h2>
          <h1 className="text-3xl md:text-5xl font-heading font-black text-white italic uppercase tracking-tighter">
            Agent <span className="text-secondary">Profile</span>
          </h1>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-1 rounded-none shadow-2xl">
          <div className="border border-white/5 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start">
              
              {/* Avatar Section */}
              <div className="relative group shrink-0">
                <div className="w-28 h-28 md:w-40 md:h-40 bg-primary border-2 border-secondary flex items-center justify-center text-white text-4xl md:text-5xl font-heading font-black shadow-[0_0_30px_rgba(200,16,46,0.2)] uppercase">
                  {username.substring(0, 2)}
                </div>
                <div className="absolute top-0 left-0 w-full h-1 bg-secondary opacity-50 animate-scanline"></div>
                <div className="mt-3 md:mt-4 text-center">
                  <span className="text-[8px] md:text-[10px] font-black text-secondary px-2 py-1 bg-secondary/10 uppercase tracking-widest block">
                    Rank: Special Agent
                  </span>
                </div>
              </div>

              {/* Info Section */}
              <div className="flex-grow w-full">
                <form onSubmit={handleUpdateProfile} className="space-y-5 md:space-y-6">
                  <div className="grid grid-cols-1 gap-5 md:gap-6">
                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                        Alias / Username
                      </label>
                      <input
                        type="text"
                        disabled={!isEditing}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={`w-full bg-white/5 border ${isEditing ? "border-secondary animate-pulse" : "border-white/10"} text-white p-3 text-sm focus:outline-none transition-all font-bold`}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] md:text-[10px] font-black text-white/40 uppercase tracking-[0.2em] md:tracking-[0.3em]">
                        Encrypted Email
                      </label>
                      <input
                        type="email"
                        disabled
                        value={email}
                        className="w-full bg-white/5 border border-white/10 text-white/40 p-3 text-sm focus:outline-none font-body italic cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {/* Buttons Group */}
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
                    {isEditing ? (
                      <>
                        <button
                          type="submit"
                          className="flex-grow bg-secondary hover:bg-red-800 text-white py-4 font-heading font-black text-[10px] md:text-xs tracking-widest transition-all"
                        >
                          SAVE IDENTITIES
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(false)}
                          className="px-6 md:px-8 bg-white/10 text-white hover:bg-white/20 py-4 font-heading font-black text-[10px] md:text-xs tracking-widest transition-all"
                        >
                          CANCEL
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setIsEditing(true);
                        }}
                        className="flex-grow bg-white/10 hover:bg-white/20 text-white py-4 font-heading font-black text-[10px] md:text-xs tracking-widest transition-all border border-white/10 flex items-center justify-center gap-3 active:scale-95"
                      >
                        <span className="material-icons text-sm">edit</span>
                        EDIT PROFILE
                      </button>
                    )}
                  </div>
                </form>

                {/* Status & Logout */}
                <div className="mt-8 md:mt-10 pt-5 md:pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                  <button
                    type="button"
                    onClick={logout}
                    className="text-[9px] md:text-[10px] font-black text-secondary hover:text-white transition-colors uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-2"
                  >
                    <span className="material-icons text-sm">logout</span>{" "}
                    Terminate Session
                  </button>
                  <p className="text-[7px] md:text-[8px] text-white/20 font-bold uppercase tracking-widest">
                    System v4.0.1 — Protected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-6 md:mt-8 grid grid-cols-2 gap-3 md:gap-4">
          <div className="bg-white/5 p-4 border border-white/5 text-center sm:text-left">
            <p className="text-[8px] md:text-[10px] text-white/40 uppercase font-black mb-1 tracking-widest">
              Cases Solved
            </p>
            <p className="text-xl md:text-2xl font-heading font-black text-accent">12</p>
          </div>
          <div className="bg-white/5 p-4 border border-white/5 text-center sm:text-left">
            <p className="text-[8px] md:text-[10px] text-white/40 uppercase font-black mb-1 tracking-widest">
              Account Status
            </p>
            <p className="text-xl md:text-2xl font-heading font-black text-secondary italic uppercase">
              Verified
            </p>
          </div>
        </div>

        {/* Purge Account */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={handleDeleteAccount}
            className="text-[9px] md:text-[10px] font-black text-white/20 hover:text-red-600 transition-all uppercase tracking-widest flex items-center gap-2 border border-white/5 px-4 py-2 hover:border-red-600/50 active:bg-red-600/10"
          >
            <span className="material-icons text-xs">delete_forever</span>
            Purge My Identity
          </button>
        </div>
      </div>
    </div>
  );
}
