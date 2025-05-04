// whatsapp-http-client.spec.ts
import { Message } from '@/domain/entities/message.entity';
import { MessageType } from '@/domain/enums/message-type.enum';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@/shared/http/http-client.interface';
import { WhatsAppHttpClient } from '../whatsapp-client';

describe('WhatsAppHttpClient', () => {
  let mockHttpClient: HttpClient;
  let client: WhatsAppHttpClient;

  const config = {
    token: 'fake-token',
    baseURL: 'https://graph.facebook.com/v18.0/123456',
  };

  const message: Message<MessageType.TEXT> = {
    messaging_product: 'whatsapp',
    recipient_type: 'individual',
    to: '5511999999999',
    type: MessageType.TEXT,
    text: {
      body: 'Olá!',
    },
  };

  beforeEach(() => {
    mockHttpClient = {
      request: jest.fn<Promise<HttpResponse>, [HttpRequest]>(),
    };

    client = new WhatsAppHttpClient(config);
    client['httpClient'] = mockHttpClient;
  });

  it('should send a message successfully', async () => {
    (mockHttpClient.request as jest.Mock).mockResolvedValue({
      status: 200,
      data: {},
    });

    await expect(client.sendMessage(message)).resolves.toBeUndefined();

    expect(mockHttpClient.request).toHaveBeenCalledWith({
      method: 'POST',
      url: `${config.baseURL}/messages`,
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
      body: message,
    });
  });

  it('should throw an error when sending a message fails', async () => {
    (mockHttpClient.request as jest.Mock).mockResolvedValue({
      status: 403,
      data: { error: 'Forbidden' },
    });

    await expect(client.sendMessage(message)).rejects.toThrowError(
      /Erro ao enviar mensagem: 403/,
    );
  });
});
