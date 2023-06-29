import axios from "axios";

export const apiKenzieKars = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com/cars",
  timeout: 5000,
});

export const api = axios.create({
  baseURL: "https://motors-shop-5gx0.onrender.com",
  timeout: 8000,
});

export const apiCep = axios.create({
  baseURL: "https://viacep.com.br/ws",
  timeout: 5000,
});
