import {AxiosRequestConfig} from "axios";

export const jwtInterceptor = (config: AxiosRequestConfig) => {
    // Retrieve the access token from localStorage
    const token = Local

    // If the token exists, set it in the Authorization header
    if (token) {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        } else {
            config.headers = {'Authorization': `Bearer ${token}`};
        }
    }

    return config;
};