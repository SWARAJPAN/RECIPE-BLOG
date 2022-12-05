import axios from "axios";

const token = JSON.parse(localStorage.getItem("token") || "{}");

export const API = axios.create({
  baseURL: "http://localhost:4000/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});
