import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from '../router';
import axios from 'axios';
const baseUrl = `${import.meta.env.VITE_API_URL}security`;
export const useAuthStore = defineStore('auth', () => {
  const user = ref({ user: JSON.parse(localStorage.getItem('user')) });

  const login = async function (email, password) {
    const user = await (await axios.post(`${baseUrl}/login`, { email, password })).data;

    // update pinia state
    this.user = user;

    // store user details and jwt in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));

    // redirect to previous url or default to home page
    router.push( '/');
  }

  const register = async function (userRegister) {
    const user = await axios.post(`${baseUrl}/register`, userRegister);

    // update pinia state
    this.user = user;

    // store user details and jwt in local storage to keep user logged in between page refreshes
    localStorage.setItem('user', JSON.stringify(user));

    // redirect to previous url or default to home page
    router.push( '/');
  }

  // const isAuthenticate = computed(()=>{
  //   this.user !== null;
  // });
  // const getRole = computed(()=>{
  //    return this.user.userrole;
  //   });
  const logout = function () {    
    this.user = null;
    localStorage.removeItem('user');
    router.push('/login');
  }

  const loadUser = function () {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  return { user, login, logout, register, loadUser }
})
