import axios from "axios";

const API_BASE_URL = "https://gorest.co.in/public/v2/";
const API_TOKEN =
  "16c240008084fb2075a76e433c39301862f1a1fd9d06772971eea192c015fab0";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_TOKEN}`,
  },
});
