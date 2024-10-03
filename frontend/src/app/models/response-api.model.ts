export interface ResponseApi<T> {
    jsonapi: {
        version: string;
    }
    data?: T | null;
    error?: {
        status: string;
        title: number;
        detail: string;
    }
    meta?: {
        total?: number;
        page?: number;
        size?: number;
        sort?: string;
        order?: string;
    }
    links: {
        self: string;
    }
}