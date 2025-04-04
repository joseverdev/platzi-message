import React from "react";
import toast, { Toaster } from 'react-hot-toast';
import { MainLayout } from "../../components/MainLayout/MainLayout";
import platziImg from "../../assets/images/platzi.png";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { useAnimateButtons } from "../useAnimateButtons";
import "../LoginPage/LoginPage.css";
import { useAuthStore } from "../../store/useAuthStore";


function SignupPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    password: "",
  });
  
  const [passwordRepeat, setPasswordRepeat] = React.useState("");

  const { navigateToView } = useAnimateButtons();
  const $passwordInput = document.getElementById("password");
  const $passwordRepeatInput = document.getElementById("password-repeat");
  
  const {signup} = useAuthStore();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const $errorText = document.querySelector(".error")
    
    if(formData.password !== passwordRepeat){
      $passwordInput.classList.add("register-form__input--error")
      $passwordRepeatInput.classList.add("register-form__input--error")
      $errorText.classList.remove("none")
      return
    }else{
      $passwordInput.classList.remove("register-form__input--error")
      $passwordRepeatInput.classList.remove("register-form__input--error")
      $errorText.classList.add("none")
    }

    signup(formData);
    toast.success('Usuario creado con exito');
    navigateToView("/login");
  }

  const showPassword = (e) => {
    const isChecked = e.target.checked;

    if (!isChecked) {
      $passwordInput.type = "password";
      $passwordRepeatInput.type = "password";
    } else {
      $passwordInput.type = "text";
      $passwordRepeatInput.type = "text";
    }
  }

  return (
    <MainLayout>
        <Toaster />
        <div className="login">
          <div className="login-container">
            <section className="register-header">
              <h1>Registrate ! </h1>
              <p>Crea una cuenta para chatear con tus amigos !</p>
            </section>
            <section className="register-form">
              <form className="register-form__form" onSubmit={handleSubmit}>
                <label htmlFor="name">Escribe tu nombre</label>
                <input
                  id="name"
                  className="register-form__input light-shadow"
                  type="text"
                  placeholder="Escribe tu nombre"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <label htmlFor="username">Crea tu nombre de usuario</label>
                <input
                  id="username"
                  className="register-form__input light-shadow"
                  type="text"
                  placeholder="Escribe tu nombre de usuario"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                />
                <label htmlFor="password">Crea tu contraseña</label>

                <input
                  id="password"
                  className="register-form__input  light-shadow"
                  type="password"
                  placeholder="Escribe tu contraseña"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
                <label htmlFor="password-repeat">
                  Escribe nuevamente tu contraseña
                </label>

                <input
                  id="password-repeat"
                  className="register-form__input light-shadow"
                  type="password"
                  placeholder="Escribe tu contraseña"
                  required
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                />
                <div className="error none">
                  <p className="error__text">Las contraseñas no coinciden</p>
                </div>
                <div className="checkbox-container">
                  <input id="show-password" type="checkbox"
                    onChange={showPassword}
                  />
                  <label htmlFor="show-password">Mostrar contraseña</label>
                </div>
                <button
                  className="login-button login-button__login light-shadow"
                >
                  Crear cuenta
                </button>
              </form>
              <button 
                className="login-button login-button__register"
                onClick={() => navigateToView("/login")}
              >Volver</button>
            </section>
          </div>

        </div>
      

    </MainLayout>
  );
}

export { SignupPage  };
