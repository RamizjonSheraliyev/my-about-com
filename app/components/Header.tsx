"use client";
import React, { useState, useEffect } from "react";
import {
  Sun,
  Moon,
  User,
  FileText,
  Briefcase,
  PenTool,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useDarkMode } from "./DarkModeContext";
import Link from "next/link";

export function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 
        ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} 
        ${scrolling ? "shadow-md" : ""}
      `}
    >
      <div className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Ramiz</h1>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex space-x-6 items-center">
          {[
            { href: "#about", label: "About Me", icon: <User size={18} /> },
            { href: "#resume", label: "Resume", icon: <FileText size={18} /> },
            {
              href: "#portfolio",
              label: "Portfolio",
              icon: <Briefcase size={18} />,
            },
            { href: "#blog", label: "Blog", icon: <PenTool size={18} /> },
            { href: "#contact", label: "Contact", icon: <Mail size={18} /> },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-blue-500 flex items-center gap-2"
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        {/* Dark Mode & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full transition-all duration-300"
          >
            {darkMode ? (
              <Sun size={24} className="animate-spin" />
            ) : (
              <Moon size={24} className="animate-pulse" />
            )}
          </button>

          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            <Menu size={30} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-pink-600 text-white transition-transform duration-300 
  flex flex-col items-start p-6 shadow-xl z-50 transform ${
    menuOpen
      ? "translate-x-0 opacity-100"
      : "translate-x-full opacity-0 pointer-events-none"
  }`}
      >
        <button onClick={() => setMenuOpen(false)} className="self-end mb-4">
          <X size={30} />
        </button>
        <nav className="space-y-4">
          {["#about", "#resume", "#portfolio", "#blog", "#contact"].map(
            (href, index) => (
              <Link
                key={index}
                href={href}
                className="text-lg block transition-all duration-500"
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector(href);
                  if (section) {
                    section.scrollIntoView({ behavior: "smooth" });
                  }
                  setMenuOpen(false); // Menyuni yopish
                }}
              >
                {href.replace("#", "").charAt(0).toUpperCase() + href.slice(2)}
              </Link>
            )
          )}
        </nav>
      </div>
    </header>
  );
}
