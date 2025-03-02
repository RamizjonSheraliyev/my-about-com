 "use client";
import React, { useState } from "react";
import { useDarkMode } from "./DarkModeContext";

const projects = [
  { id: 1, title: "Marmarishotel.Uz", category: "real", link: "#" },
  { id: 2, title: "LogoSmart Hamkor", category: "real", link: "#" },
  { id: 3, title: "Kinodasiz", category: "real", link: "#" },
  { id: 4, title: "Dilkash Delivery", category: "real", link: "#" },
  { id: 5, title: "Zaynab Market HR Bot", category: "real", link: "#" },
  { id: 6, title: "Namoz Tutor", category: "personal", link: "#" },
];

export function Portfolio() {
  const { darkMode } = useDarkMode();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects =
    activeCategory === "all"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

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
          <a
            key={project.id}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
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
          </a>
        ))}
      </div>
    </section>
  );
}
