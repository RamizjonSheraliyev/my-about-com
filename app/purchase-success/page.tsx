 "use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react"; // Import Suspense from React

export default function PurchaseSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get("title") || "No title";
  const price = searchParams.get("price") || "No price";
  const description = searchParams.get("description") || "No description";

  return (
    <Suspense fallback={<p>Loading...</p>}> {/* Suspense added */}
      <section className="py-12 px-6 min-h-screen bg-green-100 flex flex-col items-center">
        <h1 className="text-4xl font-bold text-green-700">To‘lov muvaffaqiyatli bajarildi! ✅</h1>
        <p className="text-lg text-gray-700 mt-4">Siz quyidagi kursni sotib oldingiz:</p>

        <div className="max-w-lg bg-white p-6 mt-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-green-700">{title}</h3>
          <p className="text-xl text-gray-500 mt-2">{price}</p>
          <p className="text-sm text-gray-600 mt-2">{description}</p>
        </div>

        <button
          onClick={() => router.push("/courses")}
          className="mt-6 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition"
        >
          Kurslarga qaytish 
        </button>
      </section>
    </Suspense>
  );
}
