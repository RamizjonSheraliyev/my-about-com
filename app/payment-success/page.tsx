 "use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import { Alert, Snackbar, CircularProgress } from "@mui/material";
import { FaTelegram } from "react-icons/fa";
import Image from "next/image";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Yuklanmoqda...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
 
  const title = searchParams.get("title") || "Muvaffaqiyatli to'lov";
  const price = searchParams.get("price") || "Noma'lum";
  const paymentImage = "/qrcode.jpg"; // SHU YERGA IMAGE JOYLASH
  const telegramUrl = "https://t.me/CmbkkMvp"; // ADMIN TELEGRAM MANZILI

  const [isPaid, setIsPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  const handleConfirmPayment = () => {
    setLoading(true);
    setTimeout(() => {
      setIsPaid(true);
      setLoading(false);
      setAlertOpen(true);
    }, 3000); // 3 sekund loading
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4"> Tolov Summasi!</h1>
        <p className="text-xl font-semibold">{title}</p>
        <p className="text-green-400 text-2xl mb-4">{price}</p>

        {/* To'lov rasmi */}
        {!isPaid && (
          <>
            <Image src={paymentImage}  width={300}
            height={200} alt="To'lov ma'lumotlari" className="w-64 h-64 mx-auto" />
            <p className="mt-2 text-gray-400">
              ⬆ Ushbu rasm orqali to‘lov qiling va chekni adminga yuboring.
            </p>
            
            {/* Telegramga o'tish tugmasi */}
            <a
              href={telegramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              <FaTelegram size={24} />
              Admin bilan bog‘lanish
            </a>

            {/* Tasdiqlash tugmasi */}
            <button
              onClick={handleConfirmPayment}
              disabled={loading}
              className={`mt-4 w-full py-2 rounded-lg font-semibold transition cursor-pointer ${
                loading ? "bg-gray-500 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : "✅ To‘lovni tasdiqlash"}
            </button>
          </>
        )}

        {/* To‘lov tasdiqlandi */}
        {isPaid && <p className="text-green-400 text-lg mt-4">✔ To‘lov tasdiqlanmoqda!</p>}

        {/* Bosh sahifaga qaytish */}
        <button
          onClick={() => router.push("/dashboard")}
          className="mt-4 w-full bg-gray-700 text-white py-2 rounded-lg font-semibold hover:bg-gray-600 transition cursor-pointer"
        >
          ⬅️ Bosh sahifaga qaytish
        </button>
      </div>

      {/* Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="info" variant="filled">
          Chekni adminga yuboring! 📩
        </Alert>
      </Snackbar>
    </div>
  );
}
