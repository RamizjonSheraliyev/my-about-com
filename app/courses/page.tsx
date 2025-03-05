"use client";
import { useRouter } from "next/navigation";

const courses = [
  {
    id: 1,
    title: "Next.js Masterclass",
    price: "$49",
    description: "Next.js-ning ilg‘or funksiyalarini chuqur o‘rganing.",
  },
  {
    id: 2,
    title: "React.js Fundamentals",
    price: "$39",
    description: "React.js'ning asosiy konseptlarini o‘rganing.",
  },
  {
    id: 3,
    title: "Advanced JavaScript",
    price: "$29",
    description: "JavaScript-ning chuqur tushunchalarini o‘zlashtiring.",
  },
  {
    id: 4,
    title: "TypeScript for Beginners",
    price: "$45",
    description: "TypeScript asoslarini o‘rganing.",
  },
  {
    id: 5,
    title: "Node.js Backend Development",
    price: "$59",
    description: "Node.js bilan backend dasturlar yozishni o‘rganing.",
  },
];

export default function Courses() {
  const router = useRouter();

  const handleMyCourses = () => {
    // "Mening kurslarim" tugmasini bosganda, kurslar bo'limiga o'tish
    router.push("/courses/my-course");
  };

  return (
    <section className="py-12 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600">Courses</h1>
      <p className="text-center text-gray-700 mt-4">
        O‘zlashtirish uchun eng yaxshi kurslarni tanlang!
      </p>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handleMyCourses}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition mx-auto block"
        >
          Mening kurslarim
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {courses.map((course) => (
          <div
            key={course.id}
            className="p-6 bg-white rounded-lg shadow-md text-center"
          >
            <h3 className="text-xl font-semibold">{course.title}</h3>
            <p className="text-lg text-gray-500 mt-2">{course.price}</p>
            <p className="text-sm text-gray-600 mt-2">{course.description}</p>

            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() =>
                  router.push(
                    `/checkout/${course.id}?title=${encodeURIComponent(
                      course.title
                    )}&price=${encodeURIComponent(
                      course.price
                    )}&description=${encodeURIComponent(course.description)}`
                  )
                }
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
              >
                Sotib olish
              </button>

              <button
                onClick={() => router.push(`/courses/${course.id}`)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition cursor-pointer"
              >
                Kurs haqida
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/")}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition cursor-pointer"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    </section>
  );
}
