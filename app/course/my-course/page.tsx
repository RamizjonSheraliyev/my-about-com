 "use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Define types for the courses data
interface Course {
  id: number;
  title: string;
  description: string;
}

const MyCourses = () => {
  const [userCourses, setUserCourses] = useState<Course[]>([]); // Define state with the correct type
  const [loading, setLoading] = useState<boolean>(true); // Loading state with boolean type
  const router = useRouter();

  // Fetch user courses using useEffect
  useEffect(() => {
    // Simulate a backend request with a timeout
    const timer = setTimeout(() => {
      const fetchedCourses: Course[] = [
        {
          id: 1,
          title: "Next.js Masterclass",
          description: "Next.js bilan ilg‘or ishlashni o‘rganing.",
        },
        {
          id: 2,
          title: "React.js Fundamentals",
          description: "React.js asoslarini o‘rganing.",
        },
      ];

      setUserCourses(fetchedCourses); // Set fetched courses to state
      setLoading(false); // Stop loading
    }, 5000); // Simulate delay of 5 seconds

    // Redirect to /courses page after courses are fetched
    const redirectTimer = setTimeout(() => {
      router.push("/courses");
    }, 5000); // Redirect after 5 seconds

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [router]); // Added router as a dependency

  if (loading) {
    // Show loading state
    return (
      <section className="py-12 px-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl font-semibold text-blue-600">Yuklanmoqda...</p>
          <p className="text-gray-600 mt-2">Tez kunlarda tayyor bo‘ladi ...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-blue-600">Mening Kurslarim</h1>
      <p className="text-center text-gray-700 mt-4">Siz sotib olgan kurslar</p>

      {userCourses.length === 0 ? (
        <p className="text-center text-gray-600 mt-6">Hali kurs sotib olinmagan.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          {userCourses.map((course) => (
            <div
              key={course.id}
              className="p-6 bg-white rounded-lg shadow-md text-center"
            >
              <h3 className="text-xl font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 mt-2">{course.description}</p>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          onClick={() => router.push("/courses")}
          className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    </section>
  );
};

export default MyCourses;
