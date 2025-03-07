 "use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Alert, Snackbar, Slide, CircularProgress } from "@mui/material";

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <PaymentContent />
    </Suspense>
  );
}

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get("title") || "";
  const description = searchParams.get("description") || "";
  const price = searchParams.get("price") || "";
  const image = searchParams.get("image") || "";

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (price === "Bepul") {
      setOpen(true);
      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    }
  }, [price, router]);

  const handlePayment = () => {
    setLoading(true);
    setTimeout(() => {
      // To'lov muvaffaqiyatli amalga oshirilganini bildiruvchi snackbar
      setLoading(false);
      router.push(`/payment-success?title=${encodeURIComponent(title)}&price=${encodeURIComponent(price)}`);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="max-w-lg w-full bg-gray-900 p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">To‘lov sahifasi</h1>

        {image && (
          <Image
            src={image}
            alt={title}
            width={300}
            height={200}
            className="w-full h-52 object-cover rounded-md"
          />
        )}

        <h2 className="text-xl font-semibold mt-4">{title}</h2>
        <p className="text-gray-400">{description}</p>

        <p className="text-2xl font-bold mt-4">
          {price === "Bepul" ? (
            <span className="text-blue-400">Bepul</span>
          ) : (
            <span className="text-green-400">{price} UZS</span>
          )}
        </p>

        {price !== "Bepul" && (
          <button
            onClick={handlePayment}
            disabled={loading}
            className={`w-full mt-4 py-2 rounded-lg font-semibold transition ${loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "To‘lovni amalga oshirish"}
          </button>
        )}

        <button
          onClick={() => router.back()}
          className="w-full mt-4 bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition"
        >
          ⬅️ Orqaga qaytish
        </button>
      </div>

      {/* Snackbar alert */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        TransitionComponent={Slide}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Siz muvaffaqiyatli qo‘shildingiz! Boshqa sahifaga o‘tyapmiz...
        </Alert>
      </Snackbar>
    </div>
  );
}
