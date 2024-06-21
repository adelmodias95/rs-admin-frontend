import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3005/",
    baseURL: "https://rs-admin-backend-5caad7698e9f.herokuapp.com",
});

export default api;
