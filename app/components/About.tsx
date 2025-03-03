"use client";
import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material"; // ✅ Material UI Snackbar & Alert
import { useDarkMode } from "./DarkModeContext";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaGithub,
  FaLinkedin,
  FaTelegram,
  FaCode,
  FaBriefcase,
  FaGlobe,
} from "react-icons/fa";
import Head from "next/head";
import Image from "next/image"; // ✅ Import Image component

export default function AboutMe() {
  const { darkMode } = useDarkMode();
  const [alertOpen, setAlertOpen] = useState(false); // ✅ Alert holati

  const handleWebsiteClick = () => {
    setAlertOpen(true); // ✅ Snackbar ochiladi
  };

  return (
    <section
      id="about"
      className={`flex flex-col md:flex-row items-center md:items-start gap-8 p-6 min-h-screen transition-all duration-300 pt-24 md:pt-32
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <Head>
        <title>About - RamizDev</title>
        <meta
          name="description"
          content="Ramiz Sheraliyev - Front-End Developer | AI Enthusiast"
        />
        <meta
          name="keywords"
          content="RamizDev, Front-End Developer, React.js, Next.js, AI, Web Development"
        />
        <meta name="author" content="Ramiz Sheraliyev" />
        <meta property="og:title" content="About - RamizDev" />
        <meta
          property="og:description"
          content="Ramiz Sheraliyev - Front-End Developer | AI Enthusiast"
        />
        <meta
          property="og:image"
          content="/D56B3E93-6AA7-4B2C-80B0-312FA9887B0A.JPEG"
        />
        <meta property="og:type" content="website" />
      </Head>
      {/* Profile Card */}
      <div
        className={`p-6 rounded-2xl shadow-lg w-full md:w-1/3 flex flex-col items-center transition-all duration-300 
          ${
            darkMode
              ? "bg-gray-800 hover:shadow-gray-700"
              : "bg-white hover:shadow-gray-400"
          } hover:shadow-xl`}
      >
        <Image
          src="/D56B3E93-6AA7-4B2C-80B0-312FA9887B0A.JPEG"
          alt="Ramiz Sheraliyev"
          width={124}
          height={120}
          className="w-32 h-32 rounded-full border-4 border-gray-300 hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-xl font-semibold mt-4">Ramiz Sheraliyev</h2>
        <p className="text-gray-600 dark:text-gray-400">
        Senior Front-End Developer | AI Enthusiast | Full Stuck Developer
        </p>

        {/* Contact Info */}
        <div className="w-full mt-6 space-y-4">
          <div
            className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 cursor-pointer
              ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            onClick={() =>
              (window.location.href = "mailto:sheraliyevramiz2@gmail.com")
            }
          >
            <FaEnvelope size={20} />
            <p className="text-sm truncate">sheraliyevramiz2@gmail.com</p>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 cursor-pointer
              ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            onClick={() => (window.location.href = "tel:+998*********")}
          >
            <FaPhone size={20} />
            <p className="text-sm truncate">+998 93 223 97 70</p>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 cursor-pointer
              ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
          >
            <FaMapMarkerAlt size={20} />
            <p className="text-sm truncate">Pastdargom, Samarkand</p>
          </div>

          <div
            className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 cursor-pointer
              ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }`}
            onClick={handleWebsiteClick}
          >
            <FaGlobe size={20} />
            <p className="text-sm truncate">ramizdev.com (soon)</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-6">
          <a
            href="https://github.com/RamizjonSheraliyev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-2xl transition-transform hover:scale-110"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/ramiz-sheraliyev-7982b2348"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-2xl transition-transform hover:scale-110"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://t.me/CmbkkMvp"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-2xl transition-transform hover:scale-110"
          >
            <FaTelegram />
          </a>
        </div>
      </div>

      {/* About Me Description */}
      <div
        className={`p-6 rounded-2xl shadow-lg w-full md:w-2/3 transition-all duration-300 
          ${
            darkMode
              ? "bg-gray-800 hover:shadow-gray-700"
              : "bg-white hover:shadow-gray-400"
          } hover:shadow-xl`}
      >
        <h3 className="text-2xl font-bold mb-4">About Me</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I am a <strong>Front-End Developer And Full Stuck Developer</strong> with expertise in{" "}
          <strong>React.js, TypeScript, and Next.js</strong>. I specialize in
          building <strong>modern, responsive, and scalable</strong> web
          applications. My current focus is on{" "}
          <strong>AI-integrated web development</strong> and creating{" "}
          <strong>full-stack projects</strong>.
        </p>

        {/* Skills & Technologies */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">
            🛠 Skills & Technologies
          </h4>
          <div className="flex flex-wrap gap-2">
            <SkillBadge name="Ai Integratsiya" />
            <SkillBadge name="Api " />
            <SkillBadge name="Tailwind CSS" />
            <SkillBadge name="JavaScript" />
            <SkillBadge name="TypeScript" />
            <SkillBadge name="React.js" />
            <SkillBadge name="Next.js" />
            <SkillBadge name="Node.js " />
            <SkillBadge name="Git & GitHub" />
            <SkillBadge name="Full Stuck" />
            <SkillBadge name="Backend" />
          </div>
        </div>

        {/* Work & Future Goals */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-4 border-b pb-2">
            🚀 Work & Future Goals
          </h4>
          <div className="space-y-4">
            <div
              className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 cursor-pointer
                ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
            >
              <FaBriefcase size={20} />
              <p className="text-sm">
                Currently mastering Full-Stack Development
              </p>
            </div>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 cursor-pointer
                ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
            >
              <FaCode size={20} />
              <p className="text-sm">Building AI-integrated websites</p>
            </div>
            <div
              className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 cursor-pointer
                ${
                  darkMode
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }`}
            >
              <FaGlobe size={20} />
              <p className="text-sm">Planning to work at Google</p>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Snackbar Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity="info"
          sx={{ width: "100%" }}
        >
          Hali tayyor emas!
        </Alert>
      </Snackbar>
    </section>
  );
}

interface SkillBadgeProps {
  name: string;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name }) => {
  const { darkMode } = useDarkMode();
  return (
    <span
      className={`inline-block px-4 py-1 rounded-lg text-sm m-1 transition-all duration-300 
        ${
          darkMode
            ? "bg-gray-700 text-white hover:bg-gray-600"
            : "bg-gray-300 text-black hover:bg-gray-400"
        }`}
    >
      {name}
    </span>
  );
};

