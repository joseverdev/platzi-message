import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import './index.css';
import { useAnimateButtons } from '../useAnimateButtons';
import '../LoginPage/index.css';
import { useAuthStore } from '../../store/useAuthStore';
import { Input } from '../../components/molecules/Input';
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import type { SignupFormData } from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const [formData, setFormData] = useState<SignupFormData>({
    fullname: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { signup } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      formData.fullname.length === 0 ||
      formData.password.length === 0 ||
      formData.email.length === 0
    ) {
      toast.error('Por favor, completa todos los campos requeridos');
      return;
    }

    if (formData.fullname.length < 3) {
      toast.error('El nombre completo debe tener al menos 3 caracteres');
      return;
    }

    if (formData.password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    const res = await signup(formData);

    // console.log(res);

    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success('Usuario creado con exito');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <MainLayout>
        <Toaster />
        <div className="login">
          <div className="login-container">
            <section className="login-header">
              <h1>Unete! </h1>
              <p>Y ten conversaciones interesantes con tus amigos !</p>
            </section>
            <section className="login-form">
              <form className="login-form" onSubmit={handleSubmit}>
                <Input
                  Icon={User}
                  label={'Nombre Completo'}
                  value={formData.fullname}
                  placeholder="Escribe tu nombre"
                  handleChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />

                <Input
                  Icon={Mail}
                  label={'Correo electronico'}
                  value={formData.email}
                  placeholder="Escribe tu correo electronico"
                  handleChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />

                <Input
                  Icon={Lock}
                  label={'Contraseña'}
                  value={formData.password}
                  placeholder="Escribe tu contraseña"
                  handleChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <div className="checkbox-container">
                  <input
                    id="show-password"
                    type="checkbox"
                    checked={showPassword}
                    onChange={togglePasswordVisibility}
                  />
                  <label htmlFor="show-password">
                    {showPassword ? (
                      <>
                        <EyeOff size={16} /> Ocultar contraseña
                      </>
                    ) : (
                      <>
                        <Eye size={16} /> Mostrar contraseña
                      </>
                    )}
                  </label>
                </div>

                <button className="login-button login-button__login light-shadow">
                  Crear cuenta
                </button>
              </form>
              <button
                className="login-button login-button__register"
                onClick={() => navigate('/login')}
              >
                Volver
              </button>
            </section>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export { SignupPage };
