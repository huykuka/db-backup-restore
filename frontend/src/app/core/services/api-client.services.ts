import axios, { CanceledError } from 'axios';

const BASE_URL = "http://localhost:8080/api";

const apiClient = axios.create({
    baseURL: BASE_URL,
    timeout: 1000,
});

export default apiClient;
export { CanceledError, BASE_URL };