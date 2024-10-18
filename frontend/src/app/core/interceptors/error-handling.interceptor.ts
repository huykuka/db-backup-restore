import {AxiosError} from 'axios';

export const globalErrorInterceptor = (error: AxiosError) => {
    // Handle the error globally
    console.error('Global error handler:', error);
    return Promise.reject(error);
};