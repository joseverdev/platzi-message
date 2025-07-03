import React from 'react';
import { User, Lock } from 'lucide-react';

import './LoginPage.css';
import { MainLayout } from '../../components/MainLayout/MainLayout';
import { useAnimateButtons } from '../useAnimateButtons';
import { useAuthStore } from '../../store/useAuthStore';
import { Toaster } from 'react-hot-toast';
import Input from '../../components/molecules/Input/Input';

function LoginPage() {
  const { navigateToView } = useAnimateButtons();
  const { login, mockLogin, isDevelopment } = useAuthStore();

  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
  });

  function handleSubmit(e) {
    e.preventDefault();
    console.log('login');

    login(formData);
    navigateToView('/home');
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
                  value={formData.username}
                  placeholder="Escribe tu correo"
                  handleChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
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
                onClick={() => navigateToView('/signup')}
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
                    navigateToView('/home');
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
