import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/lib/mockAuth";
import { RomanticBackground } from "@/components/RomanticBackground";
import { Toaster } from "@/components/ui/sonner";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";
import LandingPage from "@/pages/Landing";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <AuthProvider>
      <RomanticBackground />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-center" />
    </AuthProvider>
  );
}
