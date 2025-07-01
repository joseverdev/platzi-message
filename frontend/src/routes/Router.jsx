import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./HomePage/HomePage";
import { LoginPage } from "./LoginPage/LoginPage";
import { ChatPage } from "./ChatPage/ChatPage";
import { AboutPage } from "./AboutPage/AboutPage";
import { SignupPage } from "./SignupPage/SignupPage";
import { NewContactPage } from "./NewContactPage/NewContactPage";
import { UserPage } from "./UserPage/UserPage";
import { useAuthStore } from "../store/useAuthStore";
import { ProtectedRoute } from "../components/ProtectedRoute";
import { PublicRoute } from "../components/PublicRoute";
import toast, { Toaster } from "react-hot-toast";

function Router() {
  const { isLogin, checkAuth } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        await checkAuth();
      } finally {
        setIsLoading(false);
      }
    };
    initAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isLogin) {
      toast('Iniciando sesion');
    }
  }, [isLogin]);

  if (isLoading) {
    return <div className="loading-screen">Cargando...</div>;
  }

  return (
    <BrowserRouter>
      <Toaster />
      <Routes>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/new-contact" element={<NewContactPage />} />
          <Route path="/me" element={<UserPage />} />
          <Route path="/about/:id" element={<AboutPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />

        </Route>




      </Routes>
    </BrowserRouter>
  );
}

export { Router };
