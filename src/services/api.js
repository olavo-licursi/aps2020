import axios from "axios";

const api = axios.create({
  baseURL: "https://wsrestrletricocossumer.herokuapp.com",
});

export default api;