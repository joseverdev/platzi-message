import React from "react";

import "./LoginPage.css";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import { useAnimateButtons } from "../useAnimateButtons";
import { useAuthStore } from "../../store/useAuthStore";
import { Toaster } from "react-hot-toast";


function LoginPage() {
  const { navigateToView } = useAnimateButtons();

  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const { login } = useAuthStore();


    function handleSubmit(e) {
      e.preventDefault();
      console.log('login');

      login(formData);
      navigateToView("/home");
    }


    return (
      <>
        <MainLayout>
          <Toaster />
            <div className="login">
              <div className="login-container">
                <section className="login-header">
                  <h1>PlatziMessage 💚</h1>
                  <h2 className="login-header__title">Inicia Sesion con tu Cuenta !</h2>
                  <p>Y empieza hablar con tus amigos !</p>
                </section>
                <section className="">
                  <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Ingresa tu nombre de usuario</label>
                    <input
                      id="username"
                      className="login-form__input light-shadow"
                      type="text"
                      placeholder="Escribe tu nombre de usuario"
                      value={formData.username}
                      onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    />
                    <label htmlFor="password">Ingresa tu nombre de contraseña</label>

                    <input
                      id="password"
                      className="login-form__input light-shadow"
                      type="password"
                      placeholder="Escribe tu contraseña"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />

                    <button className="login-button login-button__login light-shadow">
                      Iniciar Sesión
                    </button>
                  </form>
                  <hr />
                  <p>¿No tienes una cuenta ? Registrate!</p>
                  <button
                    type="submit"
                    onClick={() => navigateToView("/signup")}
                    className="login-button login-button__register"
                  >
                    Crear cuenta
                  </button>
                </section>

              </div>
            </div>
            

        </MainLayout>
      </>
    );
  }

export { LoginPage };
