 "use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function Checkout() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const title = searchParams.get("title") || "No title";
  const price = searchParams.get("price") || "No price";
  const description = searchParams.get("description") || "No description";

  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [success, setSuccess] = useState(false);
  const [checking, setChecking] = useState(false);

  const isFormValid = cardNumber.length === 16 && expiryDate.length === 5 && cvv.length === 3;

  const handlePurchase = () => {
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setChecking(true);
    }, 4000); // 4 seconds alert shows

    setTimeout(() => {
      router.push(`/purchase-success?title=${title}&price=${price}&description=${description}`);
    }, 10000); // Redirect after 10 seconds
  };

  // To enforce the maxlength correctly, we will sanitize inputs
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 16) {
      setCardNumber(value);
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9/]/g, ""); // Allow only numbers and slash
    if (value.length <= 5) {
      setExpiryDate(value);
    }
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    if (value.length <= 3) {
      setCvv(value);
    }
  };

  return (
    <section className="py-12 px-6 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center text-blue-600">Checkout</h1>
      <p className="text-center text-gray-700 mt-4">
        Quyidagi kursni sotib olish uchun to‘lovni amalga oshiring.
      </p>

      <div className="max-w-lg mx-auto bg-white p-6 mt-8 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p className="text-xl text-gray-500 mt-2">{price}</p>
        <p className="text-sm text-gray-600 mt-2">{description}</p>

        <div className="mt-6">
          <label className="block text-gray-700 font-semibold">Karta raqami</label>
          <input
            type="text"
            value={cardNumber}
            onChange={handleCardNumberChange}
            placeholder="**** **** **** ****"
            className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mt-4 flex gap-4">
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold">Amal qilish muddati</label>
            <input
              type="text"
              value={expiryDate}
              onChange={handleExpiryDateChange}
              placeholder="MM/YY"
              className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1">
            <label className="block text-gray-700 font-semibold">CVV</label>
            <input
              type="text"
              value={cvv}
              onChange={handleCvvChange}
              placeholder="***"
              className="w-full p-3 border rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handlePurchase}
          disabled={!isFormValid}
          className={`w-full mt-6 px-4 py-3 font-semibold rounded-lg shadow-md transition ${
            isFormValid ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          To‘lovni amalga oshirish
        </button>

        <button
          onClick={() => router.push("/courses")}
          className="w-full mt-4 px-4 py-3 bg-gray-600 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          Bekor qilish
        </button>
      </div>

      {/* Material UI Snackbar */}
      <Snackbar open={success} autoHideDuration={4000} onClose={() => setSuccess(false)}>
        <Alert onClose={() => setSuccess(false)} severity="success" sx={{ width: "100%" }}>
          Tabriklaymiz! Siz " {title} " kursini sotib oldingiz!
        </Alert>
      </Snackbar>

      <Snackbar open={checking} autoHideDuration={6000} onClose={() => setChecking(false)}>
        <Alert onClose={() => setChecking(false)} severity="info" sx={{ width: "100%" }}>
          To‘lovingiz tekshirilmoqda...
        </Alert>
      </Snackbar>
    </section>
  );
}
