import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
});

const createUser = (data: any) => axiosClient.post("/verify", data);
const postImg = (data: any) => axiosClient.post("/upload", data);
export default {
  createUser,
  postImg,
};
