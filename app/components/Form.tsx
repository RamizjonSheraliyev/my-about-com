"use client";
import React from "react";
import { useDarkMode } from "./DarkModeContext";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

export function SocialLinks() {
  const { darkMode } = useDarkMode();

  return (
    <section
      id="social-links"
      className={`py-12 px-6 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      <h2 className="text-3xl font-bold border-b-4 border-blue-500 inline-block pb-2">
        Ijtimoiy Tarmoq
      </h2>

      <div className="flex space-x-6 mt-6 justify-center">
        <a
          href="#about"
          target="blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full shadow-lg transition-all hover:bg-blue-600 hover:text-white"
        >
          <FaFacebook size={30} />
        </a>

        <a
          href="https://www.twitter.com"
          target="blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full shadow-lg transition-all hover:bg-blue-400 hover:text-white"
        >
          <FaTwitter size={30} />
        </a>

        <a
          href="https://www.linkedin.com/in/ramiz-sheraliyev-7982b2348"
          target="blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full shadow-lg transition-all hover:bg-blue-700 hover:text-white"
        >
          <FaLinkedin size={30} />
        </a>

        <a
          href="https://www.instagram.com/ramiz_sheraliyev"
          target="blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full shadow-lg transition-all hover:bg-pink-500 hover:text-white"
        >
          <FaInstagram size={30} />
        </a>

        <a
          href="https://www.github.com/RamizjonSheraliyev"
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 rounded-full shadow-lg transition-all hover:bg-gray-800 hover:text-white"
        >
          <FaGithub size={30} />
        </a>
      </div>
    </section>
  );
}
