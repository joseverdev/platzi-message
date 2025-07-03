import { create } from 'zustand';
import { axiosInstance } from '../utils/axios.js';
import toast from 'react-hot-toast';

// Mock user data for development
const MOCK_USER = {
  user_id: 1,
  username: "testuser",
  name: "Usuario Test",
  email: "test@example.com",
  profilePic: null,
  created_at: new Date().toISOString()
};

export const useAuthStore = create((set, get) => ({

  user: null,
  users: [],
  isChekingAuth: false,
  isLogin: false,
  isDevelopment: process.env.NODE_ENV === 'development', // Flag para desarrollo

  // Mock login function for development
  mockLogin: () => {
    set({ isLogin: true });
    setTimeout(() => {
      set({ user: MOCK_USER, isLogin: false });
      toast.success('Mock login successful!');
    }, 500); // Simula un delay de red
  },

  // Mock signup function for development
  mockSignup: (data) => {
    const mockUser = {
      ...MOCK_USER,
      username: data.username || "testuser",
      name: data.name || "Usuario Test",
      email: data.email || "test@example.com"
    };
    
    set({ user: mockUser });
    toast.success('Mock signup successful!');
    return {
      error: false,
      message: 'Usuario creado con exito (mock)',
      data: mockUser
    };
  },

  // Mock checkAuth function
  mockCheckAuth: () => {
    set({ isChekingAuth: true });
    setTimeout(() => {
      set({ user: MOCK_USER, isChekingAuth: false });
    }, 300);
  },

  signup: async (data) => {
    // Use mock in development
    if (get().isDevelopment && window.location.search.includes('mock=true')) {
      return get().mockSignup(data);
    }

    try {
      const res = await axiosInstance.post('/auth/signup', data);
      console.log(res.data);
      set({ user: res.data });
      return {
        error: false,
        message: 'Usuario creado con exito',
        data: res.data
      };
    } catch (error) {
      console.log('Error in register', error);
      return {
        error: true,
        message: error.response.data
      };
    }
  },

  login: async (data) => {
    // Use mock in development
    if (get().isDevelopment && window.location.search.includes('mock=true')) {
      get().mockLogin();
      return;
    }

    set({ isLogin: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      const { user, token } = res.data;
      document.cookie = `jwt_chat=${token}; max-age=604800; path=/;`;
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user });
      toast.success('Sesion iniciada correctamente');
    } catch (error) {
      set({ user: null });
      document.cookie = "jwt_chat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toast.error('Usuario o contraseña incorrectos');
      console.log('Error in login', error);
    } finally {
      set({ isLogin: false });
    }
  },

  updateProfilePicture: async (data) => {
    try {
      console.log('store ', data);
      const res = await axiosInstance.put('/auth/update-profile', data);
      console.log('update profile picture', res.data);
      set({ user: res.data });
    } catch (error) {
      console.log('Error in updateProfilePicture', error);

    }
  },
  updateName: async (data) => {
    const { user } = get()
    const name = data.name
    try {
      const res = await axiosInstance.patch('/users/' + user.user_id, {
        name
      })

      return res
    } catch (error) {
      console.log('Error in updateName', error);
    }
  },
  getAllUsers: async () => {
    try {
      const res = await axiosInstance.get('/users');
      // console.log(res.data);
      set({ users: res.data });
    } catch (error) {
      console.log('Error in getAllUsers', error);
    }
  },
  checkAuth: async () => {
    // Use mock in development
    if (get().isDevelopment && window.location.search.includes('mock=true')) {
      get().mockCheckAuth();
      return;
    }

    set({ isChekingAuth: true });
    console.log('cookies', document.cookie.split('; '));

    const token = await document.cookie
      .split('; ')
      .find((row) => row.startsWith('jwt_chat'))
      ?.split('=')[1];
    console.log('checkAuth token', token);
    if (!token) {
      set({ user: null, isChecingAuth: false });
      return;
    }

    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axiosInstance.get('/auth/check');
      set({ user: res.data });
    } catch (error) {
      set({ user: null });
      document.cookie = "jwt_chat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      delete axiosInstance.defaults.headers.common['Authorization'];
      console.log('Error in checkAuth', error);
    } finally {
      set({ isChecingAuth: false });
    }
  },

  logout: () => {
    document.cookie = "jwt_chat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    delete axiosInstance.defaults.headers.common['Authorization'];
    set({ user: null });
  },

}));