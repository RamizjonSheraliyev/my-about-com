 "use client";
import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
import { SignInButton, useUser } from "@clerk/nextjs"; // Clerk uchun import
import {
  Button,
  TextField,
  CircularProgress,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDarkMode } from "./DarkModeContext";

const TELEGRAM_BOT_TOKEN = "7664954552:AAF7H7sjGICerimFr_xxrVGU8ly0Luj-SuQ";
const TELEGRAM_CHAT_ID = "5250272118";

export function ContactForm() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  const { isSignedIn } = useUser(); // Clerk user authentication

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: "YOUR_GOOGLE_MAPS_API_KEY",
      version: "weekly",
    });
    loader.load().then(() => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
          },
          (error) => console.error("Error getting location:", error)
        );
      }
    });
  }, []);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; message?: string } = {};
    if (!formData.name) newErrors.name = "Ism kiritish kerak";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Yaroqli email kiriting";
    if (!formData.message) newErrors.message = "Xabarni yozish kerak";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!isSignedIn) {
      alert("Iltimos, avval ro‘yxatdan o‘ting!");
      return;
    }

    setLoading(true);
    const message = `📩 *Yangi aloqa formasi yuborildi*\n👤 *Ism:* ${formData.name}\n✉️ *Email:* ${
      formData.email
    }\n📝 *Xabar:* ${formData.message}\n📍 *Manzil:* ${location ? `${location.lat}, ${location.lng}` : "Aniqlanmadi"}`;

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
      });
      setAlertOpen(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Xato yuborishda:", error);
      setAlertOpen(true);
    }
    setLoading(false);
  };

  return (
    <div id="contact" className={`transition-all duration-300 ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <header className="flex justify-between p-4 items-center">
        <h1 className="text-3xl">Contact</h1>
        <FormControlLabel
          control={<Switch checked={darkMode} onChange={toggleDarkMode} color="primary" />}
          label={darkMode ? "Dark Mode" : "Light Mode"}
        />
      </header>

      {location && (
        <iframe
          className="w-full h-64 rounded-lg mb-4"
          src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
          allowFullScreen
        ></iframe>
      )}

      <section className="flex justify-center p-6">
        {!isSignedIn ? (
          <div className="text-center">
            <p className="text-lg mb-4">Xabar yuborish uchun avval ro‘yxatdan o‘ting:</p>
            <SignInButton mode="modal">
              <button color="primary" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-all mx-auto cursor-pointer">🔑 Ro‘yxatdan o‘tish</button>
            </SignInButton>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-md">
            <TextField
              label="Ism"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={!!errors.name}
              helperText={errors.name}
              style={{ height: "40px", marginBottom: "20px" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "white" : "black",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "gray" : "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkMode ? "#90caf9" : "#1976d2",
                  },
                  color: darkMode ? "white" : "black",
                },
                "& .MuiInputLabel-root": {
                  color: darkMode ? "white" : "black",
                },
              }}
            />

            <TextField
              label="Email manzili"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
              style={{ height: "40px", marginBottom: "20px" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "white" : "black",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "gray" : "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkMode ? "#90caf9" : "#1976d2",
                  },
                  color: darkMode ? "white" : "black",
                },
                "& .MuiInputLabel-root": {
                  color: darkMode ? "white" : "black",
                },
              }}
            />

            <TextField
              label="Xabar"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              error={!!errors.message}
              helperText={errors.message}
              style={{ height: "40px", marginBottom: "20px" }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: darkMode ? "white" : "black",
                  },
                  "&:hover fieldset": {
                    borderColor: darkMode ? "gray" : "gray",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: darkMode ? "#90caf9" : "#1976d2",
                  },
                  color: darkMode ? "white" : "black",
                },
                "& .MuiInputLabel-root": {
                  color: darkMode ? "white" : "black",
                },
              }}
            />

            <div className="flex justify-center mt-12 mb-10">
              <Button type="submit" variant="contained" color="primary" size="small" disabled={loading}>
                {loading ? <CircularProgress size={24} color="inherit" /> : "📨 Xabar yuborish"}
              </Button>
            </div>
          </form>
        )}
      </section>

      <Snackbar open={alertOpen} autoHideDuration={3000} onClose={() => setAlertOpen(false)}>
        <Alert onClose={() => setAlertOpen(false)} severity={loading ? "info" : "success"} sx={{ width: "100%" }}>
          {loading ? "Xabar yuborilmoqda..." : "Xabar muvaffaqiyatli yuborildi!"}
        </Alert>
      </Snackbar>
    </div>
  );
}
