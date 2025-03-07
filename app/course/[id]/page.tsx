 "use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function CourseDetailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const title = searchParams.get("title");
  const description = searchParams.get("description");
  const price = searchParams.get("price");
  const oldPrice = searchParams.get("oldPrice");
  const image = searchParams.get("image");
  const duration = searchParams.get("duration");
  const lessons = searchParams.get("lessons");
  const category = searchParams.get("category");
  const level = searchParams.get("level");

  const handlePurchase = () => {
    setLoading(true);

    // 1. 2 soniya loading effekti qilish
    setTimeout(() => {
      // 2. Payment sahifasiga push qilish
      router.push(
        `/payment?title=${encodeURIComponent(title!)}&description=${encodeURIComponent(
          description!
        )}&price=${encodeURIComponent(price!)}&image=${encodeURIComponent(image!)}`
      );
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kurs Tavsifi */}
        <div className="md:col-span-2 bg-gray-900 p-6 rounded-lg shadow-lg">
          <Image
            src={image!}
            alt={title!}
            width={300}
            height={200}
            className="w-full h-52 object-cover rounded-md"
          />
          <h1 className="text-3xl font-bold mt-4">{title}</h1>
          <p className="text-gray-400 mt-2">{description}</p>
          <p className="text-gray-300 mt-2">
            Davomiylik: <span className="text-blue-400">{duration}</span>
          </p>
          <p className="text-gray-300">
            Darslar soni: <span className="text-blue-400">{lessons} ta</span>
          </p>
        </div>

        {/* Narx Kartasi */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-lg text-gray-400">Kurs narxi</h2>
          <p className="text-3xl font-bold text-green-400">
            {price === "0" ? "Bepul" : `${price} UZS`}
          </p>
          {oldPrice && <p className="text-red-400 line-through">{oldPrice} UZS</p>}
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full mt-4 bg-white text-black py-2 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center gap-2 cursor-pointer"
          >
            {loading ? "⏳ Yuklanmoqda..." : "Kirish ↪️"}
          </button>
        </div>
      </div>

      {/* Kurs Tafsilotlari */}
      <div className="max-w-5xl w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold">Nimalarni o‘rganasiz</h2>
          <p>
            Kategoriya: <span className="text-blue-400">{category}</span>
          </p>
          <p>
            Daraja: <span className="text-yellow-400">{level}</span>
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-700">
          <h2 className="text-xl font-semibold">Dastur</h2>
          <p className="text-gray-300">Modullar soni: 6 ta</p>
          <p className="text-gray-300">Darslar soni: {lessons} ta</p>
          <p className="text-gray-300">Kurs davomiyligi: {duration}</p>
        </div>
      </div>

      {/* Orqaga qaytish tugmasi */}
      <button
        onClick={() => router.back()}
        className="mt-8 bg-gray-700 text-white py-2 px-6 rounded-lg font-semibold hover:bg-gray-600 transition"
      >
        ⬅️ Orqaga qaytish
      </button>
    </div>
  );
}
