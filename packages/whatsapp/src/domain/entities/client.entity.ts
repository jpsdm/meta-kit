import { AnyMessage } from './message.entity';

export interface WhatsAppClient {
  sendMessage(message: AnyMessage): Promise<void>;
}
