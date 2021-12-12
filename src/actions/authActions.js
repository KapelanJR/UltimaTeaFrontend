import { LOGIN, REGISTER, LOGOUT } from "./types";
import axios from "axios";

const createConfig = (token) => ({
  headers: {
    Authorization: "Bearer " + token,
  },
});

const login = (email, password) => async (dispach) => {
  let data = { email: email, password: password };
  const response = await axios
    .post("/token/", data)
    .catch((err) => err.response);
  dispach({
    type: LOGIN,
    payload: { token: response.data.access, refresh: response.data.refresh },
  });
  localStorage.setItem("token", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);
  return response;
};

const register = (data) => (dispach) => {
  axios
    .post("/user/", data)
    .then(() => dispach({ type: REGISTER }))
    .catch((err) => console.log(err.response.data));
};

const reset_password = (data) => (dispach) => {
  axios.post("/password_reset/", data).catch((e) => {});
};

const check_token = (data) => {
  return axios
    .get("/check_token/", createConfig(data))
    .catch((e) => e.response);
};

const logout = () => (dispach) => {
  localStorage.setItem("token", "");
  localStorage.setItem("refresh", "");
  dispach({type: LOGOUT});
}

export { login, register, reset_password, createConfig, check_token, logout };