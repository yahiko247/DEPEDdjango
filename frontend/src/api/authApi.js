import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export const getLoginUserdata = async () => {
  try {
    const reponse = await api.get("/djoser/users/me/");
    return reponse.data;
  } catch (e) {
    throw e;
  }
};

export const loginUser = async (loginCredentials) => {
  try {
    await api.post("/auth/jwt/create/", loginCredentials);
    const user = await getLoginUserdata();
    return user;
  } catch (e) {
    throw e;
  }
};

export const registerUser = async (registerCredentials) => {
  try {
    const response = await api.post("/djoser/users/", registerCredentials);
    return response.data;
  } catch (e) {
    throw e;
  }
};
