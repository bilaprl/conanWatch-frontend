"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isHomePage = pathname === "/";

  const [userStatus, setUserStatus] = useState({
    loggedIn: false,
    name: "NABILA",
    initial: "N",
  });

  const syncAuthStatus = () => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("username");

    if (token && name) {
      setUserStatus({
        loggedIn: true,
        name: name.toUpperCase(),
        initial: name.charAt(0).toUpperCase(),
      });
    } else {
      setUserStatus({
        loggedIn: false,
        name: "NABILA",
        initial: "N",
      });
    }
  };

  useEffect(() => {
    syncAuthStatus();
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("storage", syncAuthStatus);
    setIsMobileMenuOpen(false);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("storage", syncAuthStatus);
    };
  }, [isAuthenticated, pathname]);

  const handleLogoutClick = () => {
    logout();
    setIsMobileMenuOpen(false);
    setUserStatus({ loggedIn: false, name: "NABILA", initial: "N" });
    window.location.href = "/login";
  };

  const navbarBg = isHomePage
    ? isScrolled
      ? "bg-primary/95 backdrop-blur-md shadow-2xl border-white/10"
      : "bg-transparent border-transparent"
    : "bg-primary shadow-xl border-white/10";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] h-[70px] md:h-[80px] flex items-center transition-all duration-500 border-b ${navbarBg}`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6 w-full flex justify-between items-center">
          {/* Logo */}

          <Link href="/" className="flex items-center gap-3 z-[110] group">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg border-2 border-secondary group-hover:border-accent transition-all duration-500 shadow-lg shadow-secondary/10 group-hover:-rotate-3">
              <Image
                src="/images/logo.png"
                alt="Logo"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority
              />
            </div>

            <span className="font-heading font-black text-2xl tracking-tighter uppercase italic flex items-center">
              <span className="text-white group-hover:text-accent transition-colors duration-500">
                CONAN
              </span>

              <span className="text-secondary group-hover:text-white transition-colors duration-500 ml-0.5">
                WATCH
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/movies"
              className="text-sm font-medium text-white/90 hover:text-accent transition-colors"
            >
              Movie List
            </Link>
            <Link
              href="/watchlist"
              className="text-sm font-medium text-white/90 hover:text-accent transition-colors"
            >
              Watchlist
            </Link>

            {userStatus.loggedIn ? (
              <div className="flex items-center gap-6">
                <Link
                  href="/profile"
                  className="group flex items-center gap-3 pl-6 border-l border-white/20"
                >
                  <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center font-heading font-bold text-white transition-all duration-300 italic">
                    {userStatus.initial}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest">
                      Member
                    </span>
                    <span className="text-xs font-bold text-white group-hover:text-accent italic">
                      {userStatus.name}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="text-[10px] font-black text-secondary hover:text-white uppercase tracking-widest border border-secondary/30 px-3 py-1 hover:bg-secondary transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-secondary px-8 py-2.5 rounded-sm font-heading font-bold text-sm text-white hover:bg-red-800 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-[110] relative w-10 h-10 flex flex-col justify-center items-end gap-1.5 focus:outline-none"
          >
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-7 rotate-45 translate-y-2" : "w-7"}`}
            ></span>
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "w-5"}`}
            ></span>
            <span
              className={`h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? "w-7 -rotate-45 -translate-y-2" : "w-7"}`}
            ></span>
          </button>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR (Drawer Mode) --- */}
      {/* Overlay Gelap (Backdrop) */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[104] md:hidden transition-opacity duration-500 ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>

      {/* Sidebar Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-primary border-l border-white/10 z-[105] md:hidden transition-transform duration-500 ease-in-out shadow-[-20px_0_50px_rgba(0,0,0,0.5)] ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col h-full p-8 pt-24">
          {/* Navigation Links */}
          <nav className="flex flex-col space-y-6 mb-auto">
            <p className="text-[10px] font-black text-secondary uppercase tracking-[0.4em] mb-2 border-b border-white/5 pb-2">
              Main Menu
            </p>
            <Link
              href="/"
              className="text-xl font-heading font-black text-white italic tracking-tighter uppercase hover:text-secondary transition-colors"
            >
              HOME
            </Link>
            <Link
              href="/movies"
              className="text-xl font-heading font-black text-white italic tracking-tighter uppercase hover:text-secondary transition-colors"
            >
              MOVIE LIST
            </Link>
            <Link
              href="/watchlist"
              className="text-xl font-heading font-black text-white italic tracking-tighter uppercase hover:text-secondary transition-colors"
            >
              WATCHLIST
            </Link>
          </nav>

          {/* Bottom Profile Section */}
          <div className="space-y-6 pt-6 border-t border-white/10">
            {userStatus.loggedIn ? (
              <div className="flex flex-col gap-6">
                <Link href="/profile" className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-secondary rounded-none flex items-center justify-center text-xl font-black text-white italic shadow-lg shadow-secondary/20">
                    {userStatus.initial}
                  </div>
                  <div>
                    <p className="text-white font-black text-base italic tracking-tighter leading-none">
                      {userStatus.name}
                    </p>
                    <p className="text-white/40 text-[8px] font-bold uppercase tracking-[0.2em] mt-1">
                      Special Agent
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogoutClick}
                  className="flex items-center gap-2 text-secondary font-black uppercase tracking-[0.2em] text-[10px] hover:text-white transition-colors"
                >
                  <span className="material-icons text-base">logout</span>{" "}
                  Terminate Session
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-between bg-secondary p-4 rounded-none shadow-lg"
              >
                <span className="font-heading font-black text-sm text-white italic uppercase tracking-tighter">
                  Sign In Agent
                </span>
                <span className="material-icons text-xl text-white">
                  fingerprint
                </span>
              </Link>
            )}

            <p className="text-[7px] text-center text-white/20 uppercase tracking-[0.4em] font-black">
              ConanWatch Protocol v4.0.1
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
