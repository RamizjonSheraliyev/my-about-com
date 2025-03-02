 "use client";
import React, { useState, useEffect } from "react";
import { Sun, Moon, User, FileText, Briefcase, PenTool, Mail, Menu, X } from "lucide-react";
import { useDarkMode } from "./DarkModeContext";

export function Header() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const [scrolling, setScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setTimeout(() => setMenuOpen(false), 300); // Yopish animatsiyasi uchun kechikish
    }
  };

  return (
    <header
      className={`w-full z-10 transition-all duration-300 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"} 
        ${scrolling ? "shadow-lg backdrop-blur-md" : ""} 
        sticky top-0`}
    >
      <div className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">RamizDev</h1>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex space-x-6 items-center">
          {["#about", "#resume", "#portfolio", "#blog", "#contact"].map((id, index) => {
            const labels = ["About Me", "Resume", "Portfolio", "Blog", "Contact"];
            const icons = [User, FileText, Briefcase, PenTool, Mail];
            const Icon = icons[index];
            return (
              <button key={id} onClick={() => scrollToSection(id)} className="hover:text-blue-500 flex items-center gap-2">
                <Icon size={18} /> {labels[index]}
              </button>
            );
          })}
        </nav>

        {/* Dark Mode & Mobile Menu Button */}
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300">
            {darkMode ? <Sun size={24} className="animate-spin" /> : <Moon size={24} className="animate-pulse" />}
          </button>

          <button onClick={() => setMenuOpen(true)} className="md:hidden">
            <Menu size={30} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-pink-600 text-white transform transition-transform duration-300 
        flex flex-col items-start p-6 shadow-xl z-50 ${menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}`}
      >
        <button onClick={() => setMenuOpen(false)} className="self-end mb-4">
          <X size={30} />
        </button>
        <nav className="space-y-4">
          {["#about", "#resume", "#portfolio", "#blog", "#contact"].map((id, index) => {
            const labels = ["About Me", "Resume", "Portfolio", "Blog", "Contact"];
            return (
              <button key={id} className="text-lg block transition-all duration-500" onClick={() => scrollToSection(id)}>
                {labels[index]}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
