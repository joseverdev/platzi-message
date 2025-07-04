import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { axiosInstance } from "../utils/axios";
import toast from "react-hot-toast";
import axios from "axios";

export type SignupFormData = {
  fullname: string;
  email: string;
  password: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

interface User {
  user_id: number;
  username: string;
  name: string;
  email: string;
  profilePic: string | null;
  created_at: string;
}

interface ApiResponse<T = any> {
  error: boolean;
  message: string;
  data?: T;
}

interface AuthStore {
  // Estado
  user: User | null;
  users: User[];
  isChekingAuth: boolean;
  isLogin: boolean;

  // Métodos mock
  // mockLogin: () => void;
  // mockSignup: (data: SignupFormData) => ApiResponse<User>;
  // mockCheckAuth: () => void;

  // Métodos reales
  signup: (data: SignupFormData) => Promise<ApiResponse<User>>;
  login: (data: LoginFormData) => Promise<void>;
  updateProfilePicture: (data: { profilePic: string }) => Promise<void>;
  updateName: (data: { name: string }) => Promise<any>;
  getAllUsers: () => Promise<void>;
  checkAuth?: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      users: [],
      isChekingAuth: false,
      isLogin: false,

      signup: async (data: SignupFormData): Promise<ApiResponse<User>> => {
        try {
          const res = await axiosInstance.post("/auth/signup", data);
          set({ user: res.data });
          return {
            error: false,
            message: "Usuario creado con exito",
            data: res.data,
          };
        } catch (error) {
          console.log("Error in register", error.response.data.error);

          // Manejo de errores tipado
          if (axios.isAxiosError(error)) {
            return {
              error: true,
              message:
                error.response?.data?.message || "Error al registrar usuario",
            };
          }

          return {
            error: true,
            message:
              error.response.data.message ||
              "Error inesperado al registrar usuario",
          };
        }
      },

      login: async (data: LoginFormData): Promise<void> => {
        set({ isLogin: true });
        try {
          const res = await axiosInstance.post("/auth/login", data);
          const { user, token } = res.data;
          document.cookie = `jwt_chat=${token}; max-age=604800; path=/;`;
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;
          set({ user });
          toast.success("Sesion iniciada correctamente");
        } catch (error) {
          set({ user: null });
          document.cookie =
            "jwt_chat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

          if (axios.isAxiosError(error)) {
            const errorMessage =
              error.response?.data?.message ||
              "Usuario o contraseña incorrectos";
            toast.error(errorMessage);
          } else {
            toast.error("Error inesperado al iniciar sesión");
          }
          console.log("Error in login", error);
        } finally {
          set({ isLogin: false });
        }
      },

      updateProfilePicture: async (data: {
        profilePic: string;
      }): Promise<void> => {
        try {
          console.log("store ", data);
          const res = await axiosInstance.put("/auth/update-profile", data);
          console.log("update profile picture", res.data);
          set({ user: res.data });
        } catch (error) {
          console.log("Error in updateProfilePicture", error);
        }
      },

      updateName: async (data: { name: string }): Promise<any> => {
        const { user } = get();
        if (!user) throw new Error("Usuario no autenticado");

        const name = data.name;
        try {
          const res = await axiosInstance.patch("/users/" + user.user_id, {
            name,
          });
          return res;
        } catch (error) {
          console.log("Error in updateName", error);
          throw error;
        }
      },

      getAllUsers: async (): Promise<void> => {
        try {
          const res = await axiosInstance.get("/users");
          set({ users: res.data });
        } catch (error) {
          console.log("Error in getAllUsers", error);
        }
      },

      logout: (): void => {
        document.cookie =
          "jwt_chat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        delete axiosInstance.defaults.headers.common["Authorization"];
        set({ user: null });
        // Limpiar localStorage también
        localStorage.removeItem("auth-storage");
      },
    }),
    {
      name: "auth-storage", // nombre de la key en localStorage
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user, // Solo persistir el usuario
      }),
    }
  )
);
