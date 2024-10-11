import axios, { CanceledError } from 'axios';

const BASE_URL = "http://127.0.0.1:8080/api";

const apiClient = axios.create({
    baseURL: BASE_URL,
});

export default apiClient;
export { CanceledError, BASE_URL };