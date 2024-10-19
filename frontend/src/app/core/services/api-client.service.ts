import axios, {CanceledError} from 'axios';
import {globalErrorInterceptor, jwtInterceptor} from "@core/interceptors";

const BASE_URL = 'http://127.0.0.1:8080/api';

const apiClient = axios.create({
    baseURL: BASE_URL,
});

// Add the JWT request interceptor
apiClient.interceptors.request.use(jwtInterceptor, (error) => Promise.reject(error));

// Add the global error response interceptor
// apiClient.interceptors.response.use(
//     (response) => response,
//     globalErrorInterceptor
// );
export {apiClient, BASE_URL, CanceledError};
