import { useState, useEffect } from 'react';
import apiClientService, { BASE_URL } from "../../core/services/api-client.services";
import {toast} from "sonner";
import {ResponseApi} from "src/app/models/response-api.model";

interface FetchResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

interface FetchOptions {
    method?: HttpMethod;
    body?: any;
    headers?: Record<string, string>;
}

export function useFetch<T>(path: string, options: FetchOptions = {}): FetchResult<T> {
    const { method = 'GET', body, headers } = options;
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                let response;
                const config = { headers };
                switch (method) {
                    case 'POST':
                        response = await apiClientService.post<ResponseApi<T>>(`${BASE_URL}${path}`, body, config);
                        break;
                    case 'PATCH':
                        response = await apiClientService.patch<ResponseApi<T>>(`${BASE_URL}${path}`, body, config);
                        break;
                    case 'PUT':
                        response = await apiClientService.put<ResponseApi<T>>(`${BASE_URL}${path}`, body, config);
                        break;
                    case 'DELETE':
                        response = await apiClientService.delete<ResponseApi<T>>(`${BASE_URL}${path}`, config);
                        break;
                    case 'GET':
                    default:
                        response = await apiClientService.get<ResponseApi<T>>(`${BASE_URL}${path}`, config);
                        break;
                }
                const {data} = response.data;
                setData(data as T);
            } catch (err) {
                console.log("Error", err);
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [path, method, body, headers]);

    return { data, loading, error };
}
