 "use client";
import React, { useState } from "react";
import { Button, Alert, Snackbar, ThemeProvider, createTheme, Typography } from "@mui/material";

// Mavzu (dark va light mode) yaratish
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#1976d2' },
    secondary: { main: '#f50057' },
    background: { default: "#ffffff", paper: "#f5f5f5" },
    text: { primary: "#000000" }
  },
});

export default function ResumeCreate() {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);

  return (
    <ThemeProvider theme={theme}>
      <section className="py-12 px-6 space-y-8 text-black flex flex-col items-center justify-center">
        <Typography variant="h4" className="font-bold pb-4 text-center text-primary">
          Rezyume Yaratish
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenSnackbar(true)}
          className="w-40"
        >
          Rezyume Yaratish
        </Button>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={() => setOpenSnackbar(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="info" sx={{ width: '100%' }}>
            Tez orada qo‘shiladi...
          </Alert>
        </Snackbar>
      </section>
    </ThemeProvider>
  );
}
