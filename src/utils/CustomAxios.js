import axios from "axios";
let refreshingFunc = undefined;

const instance = axios.create({
  baseURL: "http://localhost:8080",
});
export default instance;
