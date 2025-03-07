 "use client";
import React, { useState } from "react";
import { useDarkMode } from "./DarkModeContext";
import { useRouter } from "next/navigation"; // Next.js router
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const projects = [
  { id: 1, title: "Marmarishotel.Uz", category: "real", link: "/marmarishotel" },
  { id: 2, title: "LogoSmart Hamkor", category: "real", link: "/logosmart" },
  { id: 3, title: "Kinodasiz", category: "real", link: "/kinodasiz" },
  { id: 4, title: "Dilkash Delivery", category: "real", link: "/dilkash" },
  { id: 5, title: "Zaynab Market HR Bot", category: "real", link: "/zaynab" },
  { id: 6, title: "Namoz Tutor", category: "personal", link: "/namoz-tutor" },
];

export function Portfolio() {
  const { darkMode } = useDarkMode();
  const [activeCategory, setActiveCategory] = useState("all");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const router = useRouter(); // Routerni ishlatamiz

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // **Router orqali sahifaga yo‘naltirish**
  const handleProjectClick = (link: string) => {
    router.push(link);
  };

  // **Kurs sotib olish tugmasi bosilganda sahifaga o'tish**
  const handlePurchaseClick = () => {
    router.push("/purchase"); // Kurs sotib olish sahifasiga o'tish
  };

  return (
    <section
      id="portfolio"
      className={`py-12 px-6 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold border-b-4 border-blue-500 inline-block pb-2">
        Portfolio
      </h2>

      {/* Category Filter */}
      <div className="flex space-x-4 mt-6">
        {[
          { label: "All", value: "all" },
          { label: "Personal projects", value: "personal" },
          { label: "Real projects", value: "real" },
        ].map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveCategory(filter.value)}
            className={`px-4 py-2 rounded-lg transition ${
              activeCategory === filter.value
                ? "bg-yellow-500 text-black"
                : "bg-gray-600 text-white"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {filteredProjects.map((project) => (
          <button
            key={project.id}
            onClick={() => handleProjectClick(project.link)}
            className={`p-4 rounded-lg shadow-lg transition ${
              darkMode
                ? "bg-gray-700 text-white hover:bg-gray-600"
                : "bg-white text-black hover:bg-gray-200"
            }`}
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-sm text-gray-400">
              {project.category === "real"
                ? "Real projects"
                : "Personal projects"}
            </p>
          </button>
        ))}
      </div>

      {/* Kurs sotib olish tugmasi */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handlePurchaseClick}
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition cursor-pointer"
        >
          Kurs sotib olish
        </button>
      </div>

      {/* Snackbar (Bildirishnoma) */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="info"
          onClose={() => setOpenSnackbar(false)}
        >
          Tez orada qo‘shiladi, sabr qiling! 🚀
        </MuiAlert>
      </Snackbar>
    </section>
  );
}
