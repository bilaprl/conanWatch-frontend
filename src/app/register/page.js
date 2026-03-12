"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      alert("Security Breach: Password minimal harus 6 karakter!");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL.replace(/\/$/, "")}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        alert("Success! " + data.message);
        router.push("/login");
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert("System Failure: Tidak dapat terhubung ke server pusat.");
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-5 sm:px-6 pt-[100px] md:pt-[140px] pb-20 relative overflow-hidden">
      {/* Background Decor - Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      {/* Ambient Glow - Adjusted for Mobile */}
      <div className="absolute top-1/4 -left-10 md:-left-20 w-60 h-60 md:w-80 md:h-80 bg-secondary/10 blur-[80px] md:blur-[120px] rounded-full"></div>

      <div className="relative w-full max-w-md animate-fade-in-up">
        {/* Header Section */}
        <div className="mb-8 md:mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-none mb-4 md:mb-6 group hover:border-secondary transition-all duration-500 shadow-[0_0_40px_rgba(200,16,46,0.1)]">
            <span className="material-icons text-4xl md:text-5xl text-secondary group-hover:scale-110 transition-transform">
              person_add_alt
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-black text-white italic uppercase tracking-tighter leading-none">
            New <span className="text-secondary">Identity</span>
          </h1>
          <p className="text-white/40 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.3em] md:tracking-[0.4em] mt-3 italic">
            Register your credentials to the agency
          </p>
        </div>

        {/* Register Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-1 rounded-none shadow-2xl">
          <div className="border border-white/5 p-6 md:p-8 relative">
            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-secondary/30"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-secondary/30"></div>

            <form onSubmit={handleRegister} className="space-y-5 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">
                  Proposed Alias
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="CONAN_KUDO"
                  className="w-full bg-primary/50 border border-white/10 p-3.5 md:p-4 text-white text-sm focus:border-secondary outline-none transition-all font-bold placeholder:text-white/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">
                  Encrypted Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="detective@agency.com"
                  className="w-full bg-primary/50 border border-white/10 p-3.5 md:p-4 text-white text-sm focus:border-secondary outline-none transition-all font-body placeholder:text-white/5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] md:text-[10px] font-black text-white/50 uppercase tracking-[0.3em]">
                  New Security Access Key
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full bg-primary/50 border border-white/10 p-3.5 md:p-4 text-white text-sm focus:border-secondary outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="group relative w-full bg-secondary hover:bg-red-800 text-white font-heading font-black py-4 uppercase tracking-[0.2em] text-[10px] md:text-xs shadow-2xl transition-all overflow-hidden active:scale-[0.98]"
              >
                <span className="relative z-10">Initialize Identity</span>
                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/5 text-center">
              <p className="text-[9px] md:text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">
                Already Registered?
                <Link
                  href="/login"
                  className="text-accent hover:text-white ml-2 transition-colors border-b border-accent/30"
                >
                  Existing Access
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 flex items-center justify-center gap-2 opacity-20">
          <span className="material-icons text-xs md:text-sm text-white">
            shield
          </span>
          <p className="text-[7px] md:text-[8px] text-white font-black uppercase tracking-[0.4em]">
            Encrypted Registration
          </p>
        </div>
      </div>
    </div>
  );
}
