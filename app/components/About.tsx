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

export default function AboutMe() {
  const { darkMode } = useDarkMode();
  const [alertOpen, setAlertOpen] = useState(false); // ✅ Alert holati

  const handleWebsiteClick = () => {
    setAlertOpen(true); // ✅ Snackbar ochiladi
  };

  return (
    <section
      id="about"
      className={`flex flex-col md:flex-row items-center md:items-start gap-8 p-6 min-h-screen transition-all duration-300 
        ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}`}
    >
      <Head>
        <title>About - RamizDev</title>
        <meta name="description" content="Ramiz Sheraliyev - Front-End Developer | AI Enthusiast" />
        <meta name="keywords" content="RamizDev, Front-End Developer, React.js, Next.js, AI, Web Development" />
        <meta name="author" content="Ramiz Sheraliyev" />
        <meta property="og:title" content="About - RamizDev" />
        <meta property="og:description" content="Ramiz Sheraliyev - Front-End Developer | AI Enthusiast" />
        <meta property="og:image" content="/D56B3E93-6AA7-4B2C-80B0-312FA9887B0A.JPEG" />
        <meta property="og:type" content="website" />
      </Head>
      {/* Profile Card */}
      <div
        className={`p-6 rounded-2xl shadow-lg w-full md:w-1/3 flex flex-col items-center transition-all duration-300 
          ${darkMode ? "bg-gray-800 hover:shadow-gray-700" : "bg-white hover:shadow-gray-400"} hover:shadow-xl`}
      >
        <img
          src="/D56B3E93-6AA7-4B2C-80B0-312FA9887B0A.JPEG"
          alt="Ramiz Sheraliyev"
          className="w-32 h-32 rounded-full border-4 border-gray-300 hover:scale-105 transition-transform duration-300"
        />
        <h2 className="text-xl font-semibold mt-4">Ramiz Sheraliyev</h2>
        <p className="text-gray-600 dark:text-gray-400">Front-End Developer | AI Enthusiast</p>

        {/* Contact Info */}
        <div className="w-full mt-6 space-y-4">
          <InfoCard icon={<FaEnvelope />} text="sheraliyevramiz2@gmail.com" link="mailto:sheraliyevramiz2@gmail.com" />
          <InfoCard icon={<FaPhone />} text="+998 ** *** ** **" link="tel:+998*********" />
          <InfoCard icon={<FaMapMarkerAlt />} text="Pastdargom, Samarkand" />
          <InfoCard icon={<FaGlobe />} text="ramizdev.com (soon)" onClick={handleWebsiteClick} />
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mt-6">
          <SocialIcon icon={<FaGithub />} url="https://github.com/RamizjonSheraliyev" />
          <SocialIcon icon={<FaLinkedin />} url="#" />
          <SocialIcon icon={<FaTelegram />} url="https://t.me/RamizSheraliyev" />
        </div>
      </div>

      {/* About Me Description */}
      <div
        className={`p-6 rounded-2xl shadow-lg w-full md:w-2/3 transition-all duration-300 
          ${darkMode ? "bg-gray-800 hover:shadow-gray-700" : "bg-white hover:shadow-gray-400"} hover:shadow-xl`}
      >
        <h3 className="text-2xl font-bold mb-4">About Me</h3>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          I am a <strong>Front-End Developer</strong> with expertise in <strong>React.js, TypeScript, and Next.js</strong>.
          I specialize in building <strong>modern, responsive, and scalable</strong> web applications.
          My current focus is on <strong>AI-integrated web development</strong> and creating <strong>full-stack projects</strong>.
        </p>

        {/* Skills & Technologies */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-2">🛠 Skills & Technologies</h4>
          <div className="flex flex-wrap gap-2">
            <SkillBadge text="HTML5" />
            <SkillBadge text="CSS3" />
            <SkillBadge text="Tailwind CSS" />
            <SkillBadge text="JavaScript" />
            <SkillBadge text="TypeScript" />
            <SkillBadge text="React.js" />
            <SkillBadge text="Next.js" />
            <SkillBadge text="Node.js (Learning...)" />
            <SkillBadge text="Git & GitHub" />
            <SkillBadge text="ShadCN UI" />
            <SkillBadge text="Material UI" />
          </div>
        </div>

        {/* Work & Future Goals */}
        <div className="mt-6">
          <h4 className="text-xl font-semibold mb-4 border-b pb-2">🚀 Work & Future Goals</h4>
          <div className="space-y-4">
            <InfoCard icon={<FaBriefcase />} text="Currently mastering Full-Stack Development" />
            <InfoCard icon={<FaCode />} text="Building AI-integrated websites" />
            <InfoCard icon={<FaGlobe />} text="Planning to work at Google" />
          </div>
        </div>
      </div>

      {/* ✅ Snackbar Alert */}
      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity="info" sx={{ width: "100%" }}>
          Hali tayyor emas!
        </Alert>
      </Snackbar>
    </section>
  );
}

function InfoCard({ icon, text, link, onClick }) {
  const { darkMode } = useDarkMode();
  const handleClick = () => {
    if (link) {
      window.location.href = link; // ✅ Link mavjud bo‘lsa, yo‘naltirish
    } else if (onClick) {
      onClick(); // ✅ Agar onClick mavjud bo‘lsa, uni chaqirish
    }
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-lg w-full transition-all duration-300 cursor-pointer
        ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-200 text-black hover:bg-gray-300"}`}
      onClick={handleClick}
    >
      <span className="text-xl">{icon}</span>
      <p className="text-sm truncate">{text}</p>
    </div>
  );
}

function SocialIcon({ icon, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-600 dark:text-gray-400 hover:text-blue-500 text-2xl transition-transform hover:scale-110"
    >
      {icon}
    </a>
  );
}

function SkillBadge({ text }) {
  const { darkMode } = useDarkMode();
  return (
    <span
      className={`inline-block px-4 py-1 rounded-lg text-sm m-1 transition-all duration-300 
        ${darkMode ? "bg-gray-700 text-white hover:bg-gray-600" : "bg-gray-300 text-black hover:bg-gray-400"}`}
    >
      {text}
    </span>
  );
}
