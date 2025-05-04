import { HttpClient, HttpRequest, HttpResponse } from './http-client.interface';

export class FetchHttpClient implements HttpClient {
  async request<T = any>(config: HttpRequest): Promise<HttpResponse<T>> {
    const response = await fetch(config.url, {
      method: config.method,
      headers: {
        'Content-Type': 'application/json',
        ...(config.headers || {}),
      },
      body: config.body ? JSON.stringify(config.body) : undefined,
    });

    const contentType = response.headers.get('content-type') || '';
    const isJson = contentType.includes('application/json');
    const data = isJson ? await response.json() : await response.text();

    return {
      status: response.status,
      data,
    };
  }
}
