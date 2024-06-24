import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3005/",
    baseURL: "https://rs-estetica-api.onrender.com",
});

export default api;
