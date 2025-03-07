"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Dashboard() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  // 📌 Email validatsiya funksiyasi
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // 📌 Login funksiyasi
  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    let isValid = true;

    if (!validateEmail(email)) {
      setEmailError("Email noto‘g‘ri formatda!");
      isValid = false;
    }

    if (password.length < 6) {
      setPasswordError("Parol kamida 6 ta belgidan iborat bo‘lishi kerak!");
      isValid = false;
    }

    if (!isValid) return;

    setLoading(true);

    setTimeout(() => {
      if (email === "sheraliyevramiz2@gmail.com" && password === "ramiz1909") {
        localStorage.setItem("userEmail", email); // ✅ Emailni saqlash
        router.push("/premium"); // ✅ Premium sahifaga yo‘naltirish
      } else if (email === "admin@gmail.com" && password === "admin00") {
        router.push("/dashboard/free-courses"); // ✅ Bepul kurslarga yo‘naltirish
      } else {
        setEmailError("Email yoki parol noto‘g‘ri!");
      }
      setLoading(false);
    }, 3000);
  };

  // 📌 Admin loginini avtomatik to‘ldirish
  const fillAdminCredentials = () => {
    setEmail("admin@gmail.com");
    setPassword("admin00");
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
      <p className="text-gray-300 text-sm mb-4 text-center">
        Admin sizga bergan login va parol bilan kirishingiz mumkin.
        <br />
        <span className="font-semibold">Bepul kurslarga kirish</span> tugmasini
        bosib, kirishingiz mumkin.
      </p>

      {/* Email input */}
      <div className="w-80">
        <input
          type="email"
          placeholder="Email kiriting"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-1 p-3 w-full rounded-lg border border-gray-400 bg-gray-700 text-white"
        />
        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
      </div>

      {/* Parol input */}
      <div className="w-80 mt-3">
        <input
          type="password"
          placeholder="Parol kiriting"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-1 p-3 w-full rounded-lg border border-gray-400 bg-gray-700 text-white"
        />
        {passwordError && (
          <p className="text-red-500 text-sm">{passwordError}</p>
        )}
      </div>

      {/* Kirish tugmasi */}
      <button
        onClick={handleLogin}
        disabled={loading}
        className={`mt-4 px-6 py-2 rounded-lg font-semibold transition w-80 ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "⏳ Yuklanmoqda..." : "Kirish"}
      </button>

      {/* Bepul kurslarga kirish tugmasi */}
      <button
        onClick={fillAdminCredentials}
        disabled={loading}
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition w-80"
      >
        Bepul kurslarga kirish
      </button>
      {/* Bosh sahifaga qaytish tugmasi */}
      <button
        onClick={() => router.push("/")}
        disabled={loading}
        className="mt-4 bg-red-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-600 transition w-80 cursor-pointer"
      >
        Bosh sahifaga
      </button>
    </div>
  );
}
