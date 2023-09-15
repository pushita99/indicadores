import { computed, ref } from "vue";
import { defineStore } from "pinia";
import axios, { BASE_URL } from "../services/http-adaptator";
import router from "../router";
const USERSTORAGE = "user";
const API_URL = BASE_URL + "security/";
export const useAuthStore = defineStore("user", () => {
  const auth = ref({
    user: JSON.parse(localStorage.getItem(USERSTORAGE)),
  });
  const intervalId = ref(0);
  const login = async function (email, password) {
    try {
      const user = await axios.post(API_URL + "login/", {
        email,
        password,
      });
      localStorage.setItem(USERSTORAGE, JSON.stringify(user.data));
      auth.value.user = user.data;
      router.push("/");
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const logout = function () {
    localStorage.removeItem(USERSTORAGE);
    auth.value.user = null;
    router.push("/login");
  };

  const checkAuthStatus = function () {
    axios
      .get(API_URL + "renew")
      .then((data) => {
        localStorage.setItem(USERSTORAGE, JSON.stringify(data.data));
        auth.value.user = data.data;
      })
      .catch((e) => {
        console.log(e);
        logout();
      });
  };
  const getName = computed(function () {
    if (auth.value.user?.name) {
      return auth.value.user.name;
    } else {
      return "invitado";
    }
  });

  const getRole = computed(function () {
    return auth.value.user?.role;
  });

  const initCheck = () => {
    checkAuthStatus();
    intervalId.value = setInterval(() => {
      checkAuthStatus();
    }, 1000 * 5400);
  };

  const endCheck = () => {
    clearInterval(intervalId.value);
  };
  return {
    auth,
    login,
    logout,
    checkAuthStatus,
    getName,
    getRole,
    initCheck,
    endCheck,
  };
});