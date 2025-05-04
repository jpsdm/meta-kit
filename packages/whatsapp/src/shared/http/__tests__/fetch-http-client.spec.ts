// fetch-http-client.spec.ts
import { FetchHttpClient } from '../fetch-http-client';

describe('FetchHttpClient', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
    jest.resetAllMocks();
  });

  it('should send request and return JSON response', async () => {
    const mockJson = { success: true };
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: {
        get: () => 'application/json',
      },
      json: async () => mockJson,
    });

    const client = new FetchHttpClient();
    const response = await client.request({
      url: 'https://api.example.com/data',
      method: 'POST',
      body: { hello: 'world' },
    });

    expect(global.fetch).toHaveBeenCalledWith('https://api.example.com/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hello: 'world' }),
    });

    expect(response).toEqual({
      status: 200,
      data: mockJson,
    });
  });

  it('should return text response if not JSON', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: {
        get: () => 'text/plain',
      },
      text: async () => 'OK',
    });

    const client = new FetchHttpClient();
    const response = await client.request({
      url: 'https://api.example.com/ping',
      method: 'GET',
    });

    expect(response).toEqual({
      status: 200,
      data: 'OK',
    });
  });

  it('should fallback to empty string when content-type header is missing', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      status: 200,
      headers: {
        get: () => null,
      },
      text: async () => 'no content-type',
    });

    const client = new FetchHttpClient();
    const response = await client.request({
      url: 'https://example.com',
      method: 'GET',
    });

    expect(response).toEqual({
      status: 200,
      data: 'no content-type',
    });
  });
});
