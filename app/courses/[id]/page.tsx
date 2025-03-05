 "use client";
import React, { useState } from "react"; // Import useState from React
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import Image from "next/image";
import { Snackbar, Alert } from "@mui/material"; // Import Material UI components

const courses = [
  {
    id: 1,
    title: "Next.js Masterclass",
    price: "$49",
    details:
      "Bu kursda siz Next.js bilan SEO optimallashtirish, server komponentlar, ISR, SSR va SSG haqida batafsil bilib olasiz. Quyidagi mavzularni o'rganasiz:\n\n" +
      "- **SEO optimallashtirish**: Next.js yordamida sahifalarning qidiruv tizimlarida yaxshiroq ko‘rsatilishini ta’minlash.\n" +
      "- **Server komponentlar**: Serverda ishlaydigan komponentlar orqali ilovaning samaradorligini oshirish.\n" +
      "- **ISR (Incremental Static Regeneration)**: Sahifalarni on-demand tarzda yangilash va tez yuklash.\n" +
      "- **SSR (Server-Side Rendering)**: Dinamik ma’lumotlar bilan sahifalarni serverda render qilish.\n" +
      "- **SSG (Static Site Generation)**: Statik sahifalarni yaratish va ularni samarali ko‘rsatish.\n\n" +
      "**Nima o‘rganasiz?**\n\n" +
      "- **React.js asoslari**: React va Next.js yordamida dinamik veb-ilovalar yaratish.\n" +
      "- **Server-Side Rendering (SSR)**: Dinamik ma'lumotlarni serverda render qilish va sahifalarni tez yuklash.\n" +
      "- **Static Site Generation (SSG)**: Statik sahifalarni yaratish va ularni tez va samarali ko‘rsatish.\n" +
      "- **API Routes**: Next.js API marshrutlari orqali server tarafida ish qilish.\n" +
      "- **Optimallashtirish va xatolarni tuzatish**: Ilovangizni yuqori samaradorlikka olib kelish uchun eng yaxshi amaliyotlar.\n" +
      "- **Dynamic Routing**: Dinamik URLlar va sahifalar yaratish.\n" +
      "- **Deployment**: Next.js ilovalarini ishlab chiqishdan to‘liq ishga tushirishgacha.\n\n" +
      "**Kimlar uchun?**\n\n" +
      "- **Yangi boshlovchilar**: JavaScript va React asoslarini bilganlar uchun mukammal.\n" +
      "- **Ilg‘or ishlab chiquvchilar**: Next.js ning ilg‘or imkoniyatlari bilan tanishib, zamonaviy veb-ilovalar yaratish uchun yangi usullarni o‘rganasiz.\n" +
      "- **Freelancerlar va kompaniyalar**: Tez va samarali veb-ilovalar yaratish uchun Next.js ni ishlatishni xohlaganlar uchun.\n\n" +
      "**Kursning afzalliklari**:\n\n" +
      "- **Amaliy darslar**: Har bir bo‘limni real dunyo misollar bilan ko‘rsatamiz, siz to‘liq ishlaydigan ilovalarni yaratib borasiz.\n" +
      "- **Qadam-baqadam ko‘rsatmalar**: Sizga eng so‘nggi texnologiyalarni tushunarli va aniq tarzda o‘rgatamiz.\n" +
      "- **Sertifikat**: Kursni muvaffaqiyatli tamomlaganlar uchun sertifikat taqdim etiladi.\n\n" +
      "Kursga yoziling va Next.js asosida yuqori sifatli veb-ilovalar yaratishni boshlang!",
    image: "/course.png",
  },
  {
    id: 2,
    title: "React.js Fundamentals",
    price: "$39",
    details:
      "React komponentlari, state management va hooks bilan ishlashni o‘rganasiz.",
    image: "/course2.png",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    price: "$29",
    details:
      "Closures, hoisting, async/await, promises va boshqa ilg‘or mavzularni o‘rganasiz.",
    image: "/course3.png",
  },
];

export default function CourseDetails() {
  const router = useRouter();
  const { id } = useParams();
  const course = courses.find((c) => c.id === Number(id));

  const [openSnackbar, setOpenSnackbar] = useState(true); // Control Snackbar visibility

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (!course) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-semibold text-red-600">Kurs topilmadi tez orada qo‘shiladi!</h2>
        <button
          onClick={() => router.push("/courses")}
          className="mt-4 px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Kurslarga qaytish
        </button>
      </div>
    );
  }

  return (
    <section className="py-12 px-6 bg-gray-100 min-h-screen">
      {/* Snackbar Notification */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
          Design and other work are in progress, it will be ready soon!
        </Alert>
      </Snackbar>

      <h1 className="text-3xl font-bold text-center text-blue-600 sm:text-4xl md:text-5xl">{course.title}</h1>
      <div className="max-w-3xl mx-auto mt-6 space-y-6">
        <div className="p-6 bg-white rounded-lg shadow-lg">
          <p className="text-sm sm:text-base text-gray-700">{course.details}</p>
        </div>
        <div className="flex justify-center">
          <Image
            src={course.image}
            alt={course.title}
            width={600}
            height={350}
            className="rounded-lg shadow-md"
          />
        </div>
        <div className="flex justify-center mt-8">
          <button
            onClick={() => router.push("/courses")}
            className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
          >
            Kurslarga qaytish
          </button>
        </div>
      </div>
    </section>
  );
}
