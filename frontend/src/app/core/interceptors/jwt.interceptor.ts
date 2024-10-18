import {InternalAxiosRequestConfig} from "axios";
import {ACCESS_TOKEN, LocalStorageService} from "@core/services/local-storage.service";

export const jwtInterceptor = (config: InternalAxiosRequestConfig) => {
    const token = LocalStorageService.getItem(ACCESS_TOKEN);

    // If the token exists, set it in the Authorization header
    if (token) {
        if (config.headers) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return config;
};