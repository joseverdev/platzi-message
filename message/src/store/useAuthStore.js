import { create } from 'zustand';
import { axiosInstance } from '../utils/axios.js';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({

  user: null,
  users: [],
  isChekingAuth: false,
  isLogin: false,


  signup: async (data) => {
    try {
      const res = await axiosInstance.post('/auth/signup', data);
      console.log(res.data);
      set({ user: res.data });
    } catch (error) {
      console.log('Error in register', error);
    }
  },

  login: async (data) => {
    set({ isLogin: true });
    try {
      const res = await axiosInstance.post('/auth/login', data);
      const { user, token } = res.data;
      localStorage.setItem('token', token);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      set({ user });
      toast.success('Sesion iniciada correctamente');
    } catch (error) {
      set({ user: null });
      localStorage.removeItem('token');
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
  updateName: async(data)=>{
    const {user} = get() 
    const name = data.name
    try {
      const res = await axiosInstance.patch('/users/'+user.user_id,{
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
    set({ isChekingAuth: true });
    const token = localStorage.getItem('token');

    if (!token) {
      set({ user: null, isChekingAuth: false });
      return;
    }

    try {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axiosInstance.get('/auth/check');
      set({ user: res.data });
    } catch (error) {
      set({ user: null });
      localStorage.removeItem('token');
      delete axiosInstance.defaults.headers.common['Authorization'];
      console.log('Error in checkAuth', error);
    } finally {
      set({ isChekingAuth: false });
    }
  },

  logout: () => {
    document.cookie = "jwt_chat=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    delete axiosInstance.defaults.headers.common['Authorization'];
    set({ user: null });
  },

}));