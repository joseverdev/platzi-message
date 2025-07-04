import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import { LoginPage } from './LoginPage';
import { ChatPage } from './ChatPage';
import { AboutPage } from './AboutPage';
import { SignupPage } from './SignupPage';
import { NewContactPage } from './NewContactPage';
import { UserPage } from './UserPage';
import { useAuthStore } from '../store/useAuthStore';
import { ProtectedRoute } from '../components/ProtectedRoute';
import { PublicRoute } from '../components/PublicRoute';
import toast, { Toaster } from 'react-hot-toast';
import { Contacts } from './ContactsPage';

function Router() {
  const { isLogin } = useAuthStore();
  const [isLoading, setIsLoading] = React.useState(false);

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
          <Route path="/chat" element={<HomePage />} />
          <Route path="/contactos" element={<Contacts />} />
          <Route path="/agregar" element={<NewContactPage />} />
          <Route path="/me" element={<UserPage />} />
          <Route path="/about/:id" element={<AboutPage />} />
          <Route path="/chat/:id" element={<ChatPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { Router };
