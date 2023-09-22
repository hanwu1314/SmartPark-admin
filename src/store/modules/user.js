import { loginAPI } from "@/services";
import { setToken, getToken } from "@/utils/auth";
export default {
  namespaced: true,
  state: {
    token: getToken() || "",
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken;
      setToken(newToken);
    },
  },
  actions: {
    async asyncLogin(ctx, { username, password }) {
      const res = await loginAPI({ username, password });
      ctx.commit("setToken", res.data.token);
    },
  },
};
