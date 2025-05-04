export interface HttpRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export interface HttpResponse<T = any> {
  status: number;
  data: T;
}

export interface HttpClient {
  request<T = any>(config: HttpRequest): Promise<HttpResponse<T>>;
}
