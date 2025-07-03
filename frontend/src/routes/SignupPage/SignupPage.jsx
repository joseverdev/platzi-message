import React from "react";
import toast, { Toaster } from "react-hot-toast";
import { MainLayout } from "../../components/MainLayout/MainLayout";
import "./Signup.css";
import { useAnimateButtons } from "../useAnimateButtons";
import "../LoginPage/LoginPage.css";
import { useAuthStore } from "../../store/useAuthStore";
import Input from "../../components/molecules/Input/Input";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

function SignupPage() {
  const [formData, setFormData] = React.useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const [passwordRepeat, setPasswordRepeat] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const { navigateToView } = useAnimateButtons();
  const { signup } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    if (formData.name.length < 3 || formData.username.length < 3) {
      toast.error(
        "El nombre y el nombre de usuario debe tener al menos 3 caracteres"
      );
      return;
    }

    if (formData.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (formData.password !== passwordRepeat) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    const res = await signup(formData);

    console.log(res);

    if (res.error) {
      toast.error(res.message);
    } else {
      toast.success("Usuario creado con exito");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <MainLayout>
      <Toaster />
      <div className="login">
        <div className="login-container">
          <section className="register-header">
            <h1>Registrate ! </h1>
            <p>
              Unete y empieza a tener conversaciones interesantes con tus amigos
              !
            </p>
          </section>
          <section className="register-form">
            <form className="register-form__form" onSubmit={handleSubmit}>
              <Input
                Icon={User}
                label={"Nombres"}
                value={formData.name}
                placeholder="Escribe tu nombre"
                handleChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />

              <Input
                Icon={User}
                label={"Apellidos"}
                value={formData.username}
                placeholder="Escribe tu apellido"
                handleChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />

              <Input
                Icon={Mail}
                label={"Correo electronico"}
                value={formData.email}
                placeholder="Escribe tu correo electronico"
                type="email"
                handleChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />

              <Input
                Icon={Lock}
                label={"Contraseña"}
                value={formData.password}
                placeholder="Escribe tu contraseña"
                type={showPassword ? "text" : "password"}
                handleChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />

              <Input
                Icon={Lock}
                label={"Confirmar contraseña"}
                value={passwordRepeat}
                placeholder="Confirma tu contraseña"
                type={showPassword ? "text" : "password"}
                handleChange={(e) => setPasswordRepeat(e.target.value)}
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
              onClick={() => navigateToView("/login")}
            >
              Volver
            </button>
          </section>
        </div>
      </div>
    </MainLayout>
  );
}

export { SignupPage };
