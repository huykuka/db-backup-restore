import { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from './api-client.services';
import { toast } from 'sonner';

export class GenericHTTPService {

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return await apiClient.get<T>(url, config);
        } catch (error) {
            const errorMessage = this.extractErrorMessage(error);
            toast.error(errorMessage);
            throw error;
        }
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return await apiClient.post<T>(url, data, config);
        } catch (error) {
            const errorMessage = this.extractErrorMessage(error);
            toast.error(errorMessage);
            throw error;
        }
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return await apiClient.put<T>(url, data, config);
        } catch (error) {
            const errorMessage = this.extractErrorMessage(error);
            toast.error(errorMessage);
            throw error;
        }
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return await apiClient.delete<T>(url, config);
        } catch (error) {
            const errorMessage = this.extractErrorMessage(error);
            toast.error(errorMessage);
            throw error;
        }
    }

    private extractErrorMessage(error: any): string {
        if (error.response && error.response.data && error.response.data.error) {
            return error.response.data.error.title
        }
        return "An unexpected error occurred";
    }
}