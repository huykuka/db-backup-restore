import { useEffect, useState } from 'react';
import { ResponseApi } from 'src/app/models/response-api.model';
import { apiClient, BASE_URL } from '../services/api-client.service';

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

export function useFetch<T>(
  path: string,
  options: FetchOptions = {}
): FetchResult<T> {
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
            response = await apiClient.post<ResponseApi<T>>(
              `${BASE_URL}${path}`,
              body,
              config
            );
            break;
          case 'PATCH':
            response = await apiClient.patch<ResponseApi<T>>(
              `${BASE_URL}${path}`,
              body,
              config
            );
            break;
          case 'PUT':
            response = await apiClient.put<ResponseApi<T>>(
              `${BASE_URL}${path}`,
              body,
              config
            );
            break;
          case 'DELETE':
            response = await apiClient.delete<ResponseApi<T>>(
              `${BASE_URL}${path}`,
              config
            );
            break;
          case 'GET':
          default:
            response = await apiClient.get<ResponseApi<T>>(
              `${BASE_URL}${path}`,
              config
            );
            break;
        }
        const { data } = response.data;
        setData(data as T);
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
