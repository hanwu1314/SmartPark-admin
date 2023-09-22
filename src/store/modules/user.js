import { loginAPI } from "@/services";

export default {
  namespaced: true,
  state: {
    token: "",
  },
  mutations: {
    setToken(state, newToken) {
      state.token = newToken;
    },
  },
  actions: {
    async asyncLogin(ctx, { username, password }) {
      const res = await loginAPI({ username, password });
      ctx.commit("setToken", res.data.token);
    },
  },
};
