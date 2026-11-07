import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function loginApi(username, password) {
  try {
    const response = await api.post("/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function registerApi(username, email, password) {
  try {
    const response = await api.post("/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function getMeApi(){
  try {
    const response = await api.get("/get-me")
    return response.data
  } catch (error) {
    throw error
  }
}
