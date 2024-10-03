import { useState, useEffect } from 'react';
import apiClientService, { BASE_URL } from "../../core/services/api-client.services";

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

export function useFetch<T = unknown>(path: string, options: FetchOptions = {}): FetchResult<T> {
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
                        response = await apiClientService.post<T>(`${BASE_URL}${path}`, body, config);
                        break;
                    case 'PATCH':
                        response = await apiClientService.patch<T>(`${BASE_URL}${path}`, body, config);
                        break;
                    case 'PUT':
                        response = await apiClientService.put<T>(`${BASE_URL}${path}`, body, config);
                        break;
                    case 'DELETE':
                        response = await apiClientService.delete<T>(`${BASE_URL}${path}`, config);
                        break;
                    case 'GET':
                    default:
                        response = await apiClientService.get<T>(`${BASE_URL}${path}`, config);
                        break;
                }
                setData(response.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [path, method, body, headers]);

    return { data, loading, error };
}
