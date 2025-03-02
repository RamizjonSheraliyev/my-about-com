 "use client";
import React from "react";
import { useDarkMode } from "./DarkModeContext";
import ResumeCreate from "./ResumeUser";

export function Resume() {
  const { darkMode } = useDarkMode();

  return (
    <section
      id="resume"
      className={`py-12 px-6 space-y-8 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* Title */}
      <h2 className="text-3xl font-bold border-b-4 border-blue-500 inline-block pb-2">
        Resume
      </h2>

      {/* Education & Experience Timeline */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Education & Experience</h3>
        <div className="relative border-l-4 border-gray-500 pl-6 space-y-4">
          {[{ title: "Full-Stack Web Development", date: "2023-2025", description: "Full-stack sayt yaratish: frontend va backend tizimlarini birlashtirish. JavaScript, React.js va Next.js yordamida saytni toliq rivojlantirish. Server va backend tizimlar bilan integratsiya qilish." },
          { title: "AI Website Chat Integration", date: "2024", description: "Web-sayt yaratish va foydalanuvchi interfeysi dizaynini ishlab chiqish. AI integratsiyasi va chatbot funksionalligini o'rnatish." },
          { title: "JavaScript & TypeScript Learning", date: "2023", description: "JavaScript va TypeScript bo'yicha kurslar. Frontend dasturlashda tajriba orttirish." },
          { title: "React.js Mastery", date: "2023", description: "React.js bilan interaktiv veb-saytlar yaratish, foydalanuvchi tajribasini yaxshilash." },
          { title: "Node.js and Backend Development", date: "2022", description: "Node.js va Express.js yordamida backend tizimlarini yaratish va RESTful API-lar yaratish." },
          { title: "Udemy Full-Stack Course", date: "2023", description: "Full-stack dasturlash bo'yicha Udemy kursida o'qish va amaliyot qilish." }
          ].map((item, index) => (
            <div key={index} className="relative">
              <div className="absolute w-4 h-4 bg-yellow-500 rounded-full left-[-10px] top-2"></div>
              <div
                className={`p-6 rounded-lg shadow-lg ${
                  darkMode ? "bg-gray-900" : "bg-blue-50"
                }`}
              >
                <h4 className="text-xl font-medium">{item.title}</h4>
                <span className="text-sm text-gray-500">{item.date}</span>
                <p className="text-lg mt-2">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Skills Section */}
      <div className="space-y-6">
        <h3 className="text-2xl font-semibold">Top Skills</h3>
        <div className="p-6 rounded-lg shadow-lg ${darkMode ? 'bg-gray-900' : 'bg-blue-50'}">
          {[
            "JavaScript",
            "TypeScript",
            "NodeJS, ExpressJS, NextJS",
            "Node Js",
            "Backend, Frontend, Full Stack",
            "Api, Api Development, React",
            "Telegram Bots",
          ].map((skill, index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between">
                <span className="text-lg font-medium">{skill}</span>
                <span className="text-lg font-medium">
                  {[90, 80, 90, 90, 70, 90, 100][index]}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className="bg-yellow-500 h-2.5 rounded-full"
                  style={{ width: `${[90, 80, 90, 90, 70, 90, 100][index]}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ResumeCreate />
    </section>
  );
}
