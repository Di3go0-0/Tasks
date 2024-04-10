import axios from "./axios";
export const RegisterRequest = (user) => axios.post(`/register`, user);

export const LoginRequest = (user) => axios.post(`/login`, user);

export const LogoutRequest = () => axios.post(`/logout`, {
  withCredentials: true,
});

export const verifyTokenRequest = async () => {
  return axios.get(`/verifyToken`, {
    withCredentials: true,
  });
};
