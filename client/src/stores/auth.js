import { defineStore } from "pinia";
import Cookies from "js-cookie";
import { AuthApi } from "@/apis/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: Cookies.get("access_token") || null,
    roleType: Cookies.get("role_type") || null,
    userList: [],
  }),
  getters: {
    userListDropdown(state) {
      return state.userList.map((user) => ({
        value: user.id,
        label: user.email,
      }));
    },
  },
  actions: {
    isAuthenticated() {
      return !!this.token;
    },

    async login(email, password) {
      try {
        const data = await AuthApi.loginUser(email, password);
        const { access_token, role_type } = data.result;

        Cookies.set("access_token", access_token, { expires: 1 });
        Cookies.set("role_type", role_type, { expires: 1 });

        this.token = access_token;
        this.roleType = role_type;
        this.user = data.result;
      } catch (error) {
        throw error;
      }
    },

    logout() {
      Cookies.remove("access_token");
      Cookies.remove("role_type");
      this.token = null;
      this.roleType = null;
      this.user = null;
    },

    hasRole(role) {
      return this.roleType === role;
    },

    async fetchUsersData() {
      this.userList = await AuthApi.getUserData();
    },
  },
});
