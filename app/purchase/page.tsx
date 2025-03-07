 "use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Kurs obyektining tipini aniqlaymiz
type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  price: string;
  oldPrice: string;
  image: string;
  duration: string;
  lessons: number;
};

const allCourses: Course[] = [
  {
    id: "foundation-html-css-js",
    title: "Foundation (HTML CSS JS)",
    description:
      "Foundation to‘liq kurs o‘zbek tilida. HTML, CSS, JavaScript (BEM), Bootstrap, SASS (SCSS) va amaliy loyihalar barchasi bitta kurs va asosiy mutloqo bepul.",
    category: "Front-End",
    level: "Beginner",
    price: "Bepul",
    oldPrice: "250.000 UZS",
    image: "/foundation.png",
    duration: "15 soat 25 daqiqa",
    lessons: 37,
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "JavaScript - Frontend va Backend uchun asosiy dasturlash tili.",
    category: "Front-End",
    level: "Intermediate",
    price: "250.000 UZS",
    oldPrice: "500.000 UZS",
    image: "/javascript.png",
    duration: "20 soat 10 daqiqa",
    lessons: 45,
  },
  {
    id: "React Js",
    title: "React Js",
    description: "React Js - Frontend va Backend uchun asosiy dasturlash tili.",
    category: "Backend",
    level: "Intermediate",
    price: "250.000 UZS",
    oldPrice: "500.000 UZS",
    image: "/react.js.png",
    duration: "25 soat 10 daqiqa",
    lessons: 35,
  },
  {
    id: "Node Js",
    title: "Node Js",
    description: "Node Js - Frontend va Backend uchun asosiy dasturlash tili.",
    category: "Backend",
    level: "Advanced",
    price: "250.000 UZS",
    oldPrice: "500.000 UZS",
    image: "/node.js.png",
    duration: "50 soat 10 daqiqa",
    lessons: 47,
  },
];

export default function CoursesPage() {
  const router = useRouter();
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [levelFilter, setLevelFilter] = useState<string>("All");

  const handleCourseClick = (course: Course) => {
    router.push(
      `/course/${course.id}?title=${encodeURIComponent(course.title)}&description=${encodeURIComponent(
        course.description
      )}&price=${encodeURIComponent(course.price)}&oldPrice=${encodeURIComponent(course.oldPrice)}&image=${encodeURIComponent(
        course.image
      )}&duration=${encodeURIComponent(course.duration)}&lessons=${course.lessons}&category=${encodeURIComponent(
        course.category
      )}&level=${encodeURIComponent(course.level)}`
    );
  };

  const filteredCourses = allCourses.filter((course) => {
    return (
      (categoryFilter === "All" || course.category === categoryFilter) &&
      (levelFilter === "All" || course.level === levelFilter)
    );
  });

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">All Courses</h1>

      {/* Filterlar */}
      <div className="flex justify-center gap-4 mb-6">
        <select
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="All">Barcha Kategoriyalar</option>
          <option value="Front-End">Front-End</option>
          <option value="Back-End">Back-End</option>
        </select>

        <select
          className="bg-gray-800 text-white px-4 py-2 rounded-lg shadow-md"
          value={levelFilter}
          onChange={(e) => setLevelFilter(e.target.value)}
        >
          <option value="All">Barcha Darajalar</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      {/* Kurslar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg cursor-pointer transition"
              onClick={() => handleCourseClick(course)}
            >
              <Image src={course.image} alt={course.title} width={300} height={160} className="w-full h-40 object-cover rounded-md" />
              <div className="mt-4">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-gray-400">{course.description.substring(0, 50)}...</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-green-400">{course.price}</span>
                  <span className="text-red-400 line-through">{course.oldPrice}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Bu filter bo‘yicha kurslar topilmadi.</p>
        )}
      </div>

      {/* Bosh sahifaga qaytish tugmasi */}
      <div className="text-center mt-8">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          🔙 Bosh sahifaga qaytish
        </button>
      </div>
    </div>
  );
}
