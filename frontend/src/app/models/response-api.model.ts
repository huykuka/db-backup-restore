export interface ResponseApi<T> {
  jsonapi: {
    version: string;
  };
  data: {
    total?: number;
    items: T;
  };
  error?: {
    status: string;
    title: number;
    detail: string;
  };
  meta?: {
    total?: number;
    page?: number;
    size?: number;
    sort?: string;
    order?: string;
  };
  links: {
    self: string;
  };
}
