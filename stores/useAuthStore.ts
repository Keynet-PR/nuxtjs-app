import { defineStore } from "pinia";
import { useApiFetch } from "@/composables/useApiFetch";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  user_nane: string;
  brand_name: string;
  avatar_url: string;
  email: string;
  address: string;
  tax_id: number;
  vat: number;
  email_verified_at: string;
};

type Credentials = {
  email: string;
  password: string;
};

type RegistrationInfo = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

type ForgetPassword = {
  email: string;
};

type PasswordReset = {
  token: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  async function logout() {
    await useApiFetch("/logout", { method: "POST" });
    user.value = null;
    navigateTo("/login");
  }

  async function fetchUser() {
    const { data, error } = await useApiFetch("/api/settings/user");
    user.value = data.value as User;
  }

  async function login(credentials: Credentials) {
    await useApiFetch("/sanctum/csrf-cookie");

    const login = await useApiFetch("/login", {
      method: "POST",
      body: credentials,
    });

    await fetchUser();

    return login;
  }

  async function register(info: RegistrationInfo) {
    await useApiFetch("/sanctum/csrf-cookie");

    const register = await useApiFetch("/register", {
      method: "POST",
      body: info,
    });

    await fetchUser();

    return register;
  }

  async function forget(info: ForgetPassword) {
    await useApiFetch("/sanctum/csrf-cookie");
    const forget = await useApiFetch("/forgot-password", {
      method: "POST",
      body: info,
    });
    await fetchUser();
    return forget;
  }

  async function passwordReset(info: PasswordReset) {
    await useApiFetch("/sanctum/csrf-cookie");
    const forget = await useApiFetch("/reset-password", {
      method: "POST",
      body: info,
    });
    await fetchUser();
    return forget;
  }

  return { user, login, isLoggedIn, fetchUser, logout, register, forget, passwordReset };
});
