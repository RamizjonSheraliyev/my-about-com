 "use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/navigation";

// Kurslar uchun interfeys
interface Course {
  id: string;
  name: string;
  description: string;
  videos: string[];
}

const courses: Course[] = [
  {
    id: "123456",
    name: "ReactJS Asoslari",
    description: "ReactJS boshlang‘ich kursi.",
    videos: [
      "https://www.youtube.com/embed/Ke90Tje7VS0",
      "https://www.youtube.com/embed/4UZrsTqkcW4",
    ],
  },
  {
    id: "654321",
    name: "Next.js Full-Stack",
    description: "Next.js va full-stack dasturlash.",
    videos: [
      "https://www.youtube.com/embed/Mq7kU6ZN0tw",
      "https://www.youtube.com/embed/Tn6-PIqc4UM",
      "https://www.youtube.com/embed/Sklc_fQBmcs",
    ],
  },
  {
    id: "987654",
    name: "TypeScript Mastery",
    description: "TypeScript bo‘yicha to‘liq kurs.",
    videos: [
      "https://www.youtube.com/embed/BwuLxPH8IDs",
      "https://www.youtube.com/embed/30LWjhZzg50",
      "https://www.youtube.com/embed/N6BYO3WeUO4",
    ],
  },
];

export default function PremiumPage() {
  const [code, setCode] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [course, setCourse] = useState<Course | null>(null);
  const [error, setError] = useState<string>("");
  const [showVideos, setShowVideos] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (course) {
      const timer = setTimeout(() => setShowVideos(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [course]);

  const handleSearch = () => {
    setLoading(true);
    setError("");
    setCourse(null);
    setShowVideos(false);

    setTimeout(() => {
      const foundCourse: Course | undefined = courses.find((c) => c.id === code);

      if (foundCourse) {
        setCourse(foundCourse);
      } else {
        setError("❌ Bunday kurs mavjud emas!");
      }
      setLoading(false);
    }, 2000);
  };

  const handleReset = () => {
    router.push("/");
  };

  return (
    <>
      <Head>
        <title>Premium Kurslar | Eng yaxshi dasturlash kurslari</title>
        <meta name="description" content="Dasturlash bo‘yicha eng yaxshi kurslarni oling. ReactJS, Next.js va TypeScript kurslari sizni kutmoqda." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-700 text-white p-6">
        <h1 className="text-3xl font-bold mb-4">Premium Kurslar</h1>

        {/* Qidirish inputi har doim mavjud */}
        <input
          type="text"
          placeholder="6 xonali kurs kodini kiriting"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="p-3 w-80 rounded-lg border border-gray-400 bg-gray-800 text-white mb-4 text-center"
          maxLength={6}
        />

        <button
          onClick={handleSearch}
          disabled={loading || code.length !== 6}
          className={`px-6 py-2 rounded-lg font-semibold transition w-80 ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading ? "⏳ Izlanmoqda..." : "Izlash"}
        </button>

        {error && <p className="text-red-500 text-lg mt-4">{error}</p>}

        {course && (
          <div className="mt-6 w-full flex flex-col items-center">
            {!showVideos ? (
              <p className="text-xl font-bold mt-6">⏳ Ma’lumotlar yuklanmoqda...</p>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{course.name}</h2>
                <p className="text-gray-300 mt-2">{course.description}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {course.videos.map((video: string, index: number) => (
                    <iframe
                      key={index}
                      width="320"
                      height="180"
                      src={video}
                      title={`Video ${index + 1}`}
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  ))}
                </div>
              </>
            )}

            {/* 🔄 Ortga qaytish tugmachasi */}
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2 rounded-lg font-semibold bg-red-500 hover:bg-red-600 transition"
            >
              🔄 Ortga qaytish
            </button>
          </div>
        )}
      </div>
    </>
  );
}
