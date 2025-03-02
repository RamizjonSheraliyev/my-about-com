 "use client";
import React, { useState } from "react";
import { useDarkMode } from "./DarkModeContext";

export function Blog() {
  const { darkMode } = useDarkMode();
  
  // State'larni aniq number yoki null qilib belgilash
  const [expandedPost, setExpandedPost] = useState<number | null>(null);
  const [loadingPost, setLoadingPost] = useState<number | null>(null);

  const blogPosts = [
    {
      id: 1,
      title: "ChatGpt Dan O'zim Uchun Bir Shingil Motivatsiya, Real Casela...",
      date: "December 18, 2024",
      views: 110,
      description:
        "Muhammadali, qachonki charchoq seni bosayotganini his qilsang, mana bu gaplarni esla:\"Bu loyiha seni...\"",
      fullDescription:
        "Muhammadali, qachonki charchoq seni bosayotganini his qilsang, mana bu gaplarni esla: \"Bu loyiha seni orzularingga yaqinlashtiradi. Harakatni to'xtatma!\" ChatGPT bilan ishlashning motivatsion tomonlari haqida to'liq maqola."
    },
    {
      id: 2,
      title: "Target International School Xususiy Maktabidagi Sarguzashtla...",
      date: "July 30, 2024",
      views: 39,
      description:
        "Toshkent shahridagi Target International School xususiy maktabida 3 kun davomida bo‘lib o‘tgan hacka...",
      fullDescription:
        "Toshkent shahridagi Target International School xususiy maktabida 3 kun davomida bo‘lib o‘tgan hackathon tafsilotlari. Kimlar qatnashdi, qanday loyihalar taqdim etildi va yutuqlar haqida batafsil."
    },
    {
      id: 3,
      title: "Yangi Startuplar Uchun 5 Muhim Maslahat",
      date: "March 10, 2025",
      views: 78,
      description:
        "Agar siz startap yaratmoqchi bo'lsangiz, mana sizga eng muhim 5 maslahat...",
      fullDescription:
        "Startap yaratish oson ish emas. Bu maqolada sizga muvaffaqiyatga erishish uchun 5 ta asosiy qadamni ko‘rsatamiz!"
    },
    {
      id: 4,
      title: "Freelancing Boshlash Uchun Nimalar Kerak?",
      date: "February 25, 2025",
      views: 95,
      description:
        "Freelancer sifatida ishlashni xohlaysizmi? Mana sizga kerak bo‘ladigan narsalar...",
      fullDescription:
        "Freelancer bo‘lish uchun sizga kerak bo‘ladigan eng muhim jihatlar va qadamlar haqida batafsil ma’lumot."
    },
    {
      id: 5,
      title: "JavaScript Bilan Ilk Loyihangizni Qiling",
      date: "January 15, 2025",
      views: 120,
      description:
        "Agar siz dasturlashni boshlagan bo‘lsangiz, mana sizga birinchi loyiha g‘oyasi...",
      fullDescription:
        "JavaScript orqali birinchi loyihangizni yaratish uchun zarur bo‘lgan barcha narsalar shu maqolada!"
    },
    {
      id: 6,
      title: "Web Dizaynning Eng Yangi Trendalari 2025",
      date: "April 5, 2025",
      views: 62,
      description:
        "2025-yilda web dizaynda qanday trendlar ommalashadi? Mana eng muhimlari...",
      fullDescription:
        "Bu maqolada web dizaynning eng so‘nggi trendlari va ular biznesingizga qanday ta’sir qilishini o‘rganasiz."
    }
  ];

  // `id` ni number deb e’lon qilish
  const handleReadMore = (id: number) => {
    setLoadingPost(id);
    setTimeout(() => {
      setExpandedPost(id);
      setLoadingPost(null);
    }, 1000);
  };
  
  return (
    <section id="blog" className={`py-12 px-6 space-y-8 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <h2 className="text-3xl font-bold border-b-4 border-yellow-500 inline-block pb-2">
        Blog
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {blogPosts.map((post) => (
          <div key={post.id} className={`p-6 rounded-lg shadow-lg ${darkMode ? "bg-gray-900" : "bg-blue-50"}`}>
            <span className="text-sm text-gray-500 flex items-center gap-2">
              📅 {post.date} • 👀 {post.views} views
            </span>
            <h4 className="text-xl font-medium mt-2">{post.title}</h4>
            <p className="text-lg mt-2">
              {expandedPost === post.id ? post.fullDescription : post.description}
            </p>
            <button
              onClick={() => handleReadMore(post.id)}
              className="mt-4 bg-yellow-500 text-black px-4 py-2 rounded-md font-semibold"
              disabled={loadingPost === post.id}
            >
              {loadingPost === post.id ? "Loading..." : "Read more"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
