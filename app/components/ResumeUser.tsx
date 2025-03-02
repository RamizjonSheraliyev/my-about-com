 "use client";
import React, { useState } from "react";
import { Button, TextField, Alert, Slide, ThemeProvider, createTheme, Box, Typography } from "@mui/material";
import { jsPDF } from "jspdf"; // jsPDF kutubxonasini import qilish

// Mavzu (dark va light mode) yaratish
const theme = createTheme({
  palette: {
    mode: 'light', // default: light mode, keyin switch qilish mumkin
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: "#ffffff", // Light mode default background
      paper: "#f5f5f5",    // Paper style for light mode
    },
    text: {
      primary: "#000000",  // Text color for light mode (black)
    }
  },
});

export default function ResumeCreate() {
  const [formData, setFormData] = useState({
    name: "",
    jobTitle: "",
    skills: "",
    experience: "",
    education: "",
    contact: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    jobTitle: "",
    skills: "",
    contact: "",
  });

  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (formData.name.length < 3) newErrors.name = "Ism kamida 3 ta harf bo‘lishi kerak.";
    if (formData.skills.length < 50) newErrors.skills = "Ko'nikmalar bo'limi kamida 50 ta belgidan iborat bo'lishi kerak.";
    if (formData.contact.length < 10) newErrors.contact = "Aloqa (email yoki telefon) to‘liq bo‘lishi kerak.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);

    // PDF yaratish
    const doc = new jsPDF();
    doc.setFont("helvetica", "normal");

    // PDF uchun bosh dizayn
    doc.setFontSize(18);
    doc.text("Rezyume", 20, 20);
    doc.setFontSize(14);
    doc.text(`Ism: ${formData.name}`, 20, 40);
    doc.text(`Lavozim: ${formData.jobTitle}`, 20, 50);
    doc.text(`Ko'nikmalar: ${formData.skills}`, 20, 60);
    doc.text(`Tajribalar: ${formData.experience || "N/A"}`, 20, 70);
    doc.text(`Ta'lim: ${formData.education || "N/A"}`, 20, 80);
    doc.text(`Aloqa: ${formData.contact}`, 20, 90);

    // Rezyumeni PDF sifatida yuklab olish
    doc.save("rezyume.pdf");

    setLoading(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <section className="py-12 px-6 space-y-8 text-black flex flex-col items-center justify-center">
        <Typography variant="h4" className="font-bold pb-4 text-center text-primary">
          Rezyume Yaratish
        </Typography>

        {/* Rezyume yaratish tugmasi */}
        {!showForm && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
            className="w-40"
          >
            Rezyume Yaratish
          </Button>
        )}

        {/* Formani ko'rsatish */}
        {showForm && (
          <Slide direction="up" in={showForm} mountOnEnter unmountOnExit>
            <Box
              sx={{
                width: '100%',
                maxWidth: 600,
                backgroundColor: 'background.paper',
                padding: 3,
                borderRadius: 2,
                boxShadow: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <TextField
                label="Ism"
                variant="outlined"
                fullWidth
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                size="small"
                error={!!errors.name}
                helperText={errors.name}
              />
              <TextField
                label="Lavozim"
                variant="outlined"
                fullWidth
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                size="small"
              />
              <TextField
                label="Ko'nikmalar"
                variant="outlined"
                fullWidth
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                multiline
                rows={4}
                required
                size="small"
                error={!!errors.skills}
                helperText={errors.skills}
              />
              <TextField
                label="Tajribalar"
                variant="outlined"
                fullWidth
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                multiline
                rows={4}
                size="small"
              />
              <TextField
                label="Ta'lim"
                variant="outlined"
                fullWidth
                name="education"
                value={formData.education}
                onChange={handleChange}
                multiline
                rows={4}
                size="small"
              />
              <TextField
                label="Aloqa (Email yoki Telefon)"
                variant="outlined"
                fullWidth
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                size="small"
                error={!!errors.contact}
                helperText={errors.contact}
              />

              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit}
                disabled={loading}
                size="small"
              >
                {loading ? "Rezyume Yaratilyapti..." : "Rezyume Yaratish"}
              </Button>

              {/* Xato xabari */}
              {alertMessage && (
                <Alert severity="error" onClose={() => setAlertMessage("")}>
                  {alertMessage}
                </Alert>
              )}
            </Box>
          </Slide>
        )}
      </section>
    </ThemeProvider>
  );
}
