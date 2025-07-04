import { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './index.css';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import { useAuthStore } from '../../store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import { Input } from '../../components/molecules/Input';
import type { LoginFormData } from '../../store/useAuthStore';

function LoginPage() {
  const navigate = useNavigate();
  const { login, mockLogin, isDevelopment } = useAuthStore();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    login(formData);
    navigate('/chat');
  }

  return (
    <>
      <MainLayout>
        <Toaster />
        <div className="login">
          <div className="login-container">
            <section className="login-header">
              <h1>!Friends</h1>
              <p>!Ten charlas random con tus amigos!</p>
            </section>
            <section className="">
              <form className="login-form" onSubmit={handleSubmit}>
                <Input
                  Icon={User}
                  label={'Correo electronico'}
                  value={formData.email}
                  placeholder="Escribe tu correo"
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
                {/* TODO: think if we need this checkbox
                <div className="checkbox-container">
                  <input id="session" type="checkbox" />
                  <label htmlFor="session">Mantener sesion iniciada</label>
                </div> */}

                <button className="login-button login-button__login ">
                  Iniciar Sesión
                </button>
              </form>
              {/* TODO: Add uthentication with google */}
              <hr />
              <p>¿No tienes una cuenta ? Registrate!</p>
              <button
                type="submit"
                onClick={() => navigate('/signup')}
                className="login-button login-button__register"
              >
                Crear cuenta
              </button>

              {/* Mock login button for development */}
              {isDevelopment && (
                <button
                  type="button"
                  onClick={() => {
                    mockLogin();
                    navigate('/chat');
                  }}
                  style={{
                    background: '#ff6b6b',
                    color: 'white',
                    padding: '0.5rem',
                    border: 'none',
                    borderRadius: '4px',
                    marginTop: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  🚀 Mock Login (Dev)
                </button>
              )}
            </section>
          </div>
        </div>
      </MainLayout>
    </>
  );
}

export { LoginPage };
