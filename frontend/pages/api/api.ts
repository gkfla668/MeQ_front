import axios from "axios";

export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": process.env.NEXT_PUBLIC_API_URL,
    "Access-Control-Allow-Credentials": true,
  },
  withCredentials: true,
});
