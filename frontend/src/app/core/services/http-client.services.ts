import { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiClient from './api-client.services';
import { toast } from 'sonner';
import { ResponseApi } from '../../models/response-api.model';

export class GenericHTTPService {
  // Update in `frontend/src/app/core/services/http-client.services.ts`
  public async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T | null> {
    try {
      const response = await apiClient.get<ResponseApi<T>>(url, config);
      return response.data.data;
    } catch (error) {
      const errorMessage = this.extractErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await apiClient.post<T>(url, data, config);
    } catch (error) {
      const errorMessage = this.extractErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    try {
      return await apiClient.put<T>(url, data, config);
    } catch (error) {
      const errorMessage = this.extractErrorMessage(error);
      toast.error(errorMessage);
      throw error;
    }
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
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
      return error.response.data.error.title;
    }
    return 'An unexpected error occurred';
  }
}
