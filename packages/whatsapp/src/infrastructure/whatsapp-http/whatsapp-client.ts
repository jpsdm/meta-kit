import { WhatsAppClient } from '@/domain/entities/client.entity';
import { AnyMessage } from '@/domain/entities/message.entity';
import { FetchHttpClient } from '@/shared/http/fetch-http-client';
import { HttpClient } from '@/shared/http/http-client.interface';

interface ClientConfig {
  token: string;
  baseURL: string;
}

export class Client implements WhatsAppClient {
  private httpClient: HttpClient = new FetchHttpClient();

  constructor(private config: ClientConfig) {}

  async sendMessage(message: AnyMessage): Promise<void> {
    const { status, data } = await this.httpClient.request({
      method: 'POST',
      url: `${this.config.baseURL}/messages`,
      headers: {
        Authorization: `Bearer ${this.config.token}`,
      },
      body: message,
    });

    if (status >= 400) {
      throw new Error(
        `Error to send message: ${status} - ${JSON.stringify(data)}`,
      );
    }
  }
}
