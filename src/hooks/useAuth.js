"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // LANGSUNG cek localStorage agar sinkron dengan login page
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    localStorage.clear(); // Hapus semua (token, userId, username)
    setIsAuthenticated(false);
    alert("Logout berhasil. Identitas telah dibersihkan.");
    window.location.href = "/"; // Refresh total ke Home
  };

  return { isAuthenticated, logout };
}
