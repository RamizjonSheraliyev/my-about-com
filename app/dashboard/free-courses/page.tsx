"use client";
export default function FreeCourses() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-700 text-white p-6">
        <h1 className="text-4xl font-bold mb-6">Bepul Kurslar</h1>
        <p className="text-lg text-gray-300 mb-4">Kurslar videolari yozib olinmoqda tez orada qoshiladi vediolar!...</p>
        
        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-600 transition cursor-pointer"
        >
          Bosh sahifaga qaytish
        </button>
      </div>
    );
  }
  