"use client";
import React, { useState, useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import axios from "axios";
import {
  Button,
  TextField,
  CircularProgress,
  FormControlLabel,
  Switch,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDarkMode } from "./DarkModeContext"; // useDarkMode hook'ini import qilish

const TELEGRAM_BOT_TOKEN = "7664954552:AAF7H7sjGICerimFr_xxrVGU8ly0Luj-SuQ";
const TELEGRAM_CHAT_ID = "5250272118";

export function ContactForm() {
  const { darkMode, toggleDarkMode } = useDarkMode(); // useDarkMode hook'ini chaqirish
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [location, setLocation] = useState(null);
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
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => console.error("Error getting location:", error)
        );
      }
    });
  }, []);

  const validateForm = () => {
    let newErrors = {};
    if (!formData.name) newErrors.name = "Ism kiritish kerak";
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Yarim to'g'ri email";
    if (!formData.message) newErrors.message = "Xabarni yozish kerak";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const message = `📩 *Yangi aloqa formasi yuborildi*\n👤 *Ism:* ${formData.name}\n✉️ *Email:* ${formData.email}\n📝 *Xabar:* ${formData.message}\n📍 *Manzil:* ${location?.lat}, ${location?.lng}`;
    try {
      await axios.post(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }
      );
      setAlertOpen(true); // Open the alert
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Xato yuborishda:", error);
      setAlertOpen(true); // Open the alert if error
    }
    setLoading(false);
  };

  return (
    <div
    id="contact"
      className={`transition-all duration-300 ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
    >
      {/* Dark Mode switch */}
      <header className="flex justify-between p-4 items-center">
        <h1 className="text-3xl">Contact</h1>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={toggleDarkMode} // Toggle dark mode when changed
              color="primary"
            />
          }
          label={darkMode ? "Dark Mode" : "Light Mode"}
        />
      </header>

      {/* Google Maps iframe */}
      {location && (
        <iframe
          className="w-full h-64 rounded-lg mb-4"
          src={`https://www.google.com/maps?q=${location.lat},${location.lng}&output=embed`}
          allowFullScreen
        ></iframe>
      )}

      {/* Contact Form */}
      <section className="flex justify-center p-6">
        <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-md">
          <div className="space-y-6">
            {" "}
            {/* Increased space between inputs */}
            <TextField
              label="Ism"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              error={!!errors.name}
              helperText={errors.name}
              className={`rounded-md p-2 ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              style={{ height: "40px", marginBottom: "16px" }}
            />
            <TextField
              label="Email manzili"
              variant="outlined"
              size="small"
              fullWidth
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              error={!!errors.email}
              helperText={errors.email}
              className={`rounded-md p-2 ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              style={{ height: "40px", marginBottom: "16px" }}
            />
            <TextField
              label="Xabar"
              variant="outlined"
              size="small"
              fullWidth
              multiline
              rows={3}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              error={!!errors.message}
              helperText={errors.message}
              className={`rounded-md p-2 ${
                darkMode ? "bg-gray-700 text-white" : "bg-white text-black"
              }`}
              style={{ height: "80px", marginBottom: "16px" }}
            />
          </div>

          <div className="flex justify-center mt-6">
            {" "}
            {/* Increased margin-top */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              className="bg-yellow-500 text-black py-2 px-6 rounded-full hover:bg-yellow-400"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "📨 Xabar yuborish"
              )}
            </Button>
          </div>
        </form>
      </section>

      {/* Snackbar Alert */}
      <Snackbar
        open={alertOpen}
        autoHideDuration={3000}
        onClose={() => setAlertOpen(false)}
      >
        <Alert
          onClose={() => setAlertOpen(false)}
          severity={loading ? "info" : "success"}
          sx={{ width: "100%" }}
        >
          {loading
            ? "Xabar yuborilmoqda..."
            : "Xabar muvaffaqiyatli yuborildi!"}
        </Alert>
      </Snackbar>
      
    </div>
  );
}
