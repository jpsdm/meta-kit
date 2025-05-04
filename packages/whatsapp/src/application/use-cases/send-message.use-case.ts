import { WhatsAppClient } from '@/domain/entities/client.entity';
import { AnyMessage } from '@/domain/entities/message.entity';
import { SendMessagePort } from '@application/ports/send-message.port';

export class SendMessage implements SendMessagePort {
  constructor(private client: WhatsAppClient) {}

  async execute(message: AnyMessage): Promise<void> {
    await this.client.sendMessage(message);
  }
}
