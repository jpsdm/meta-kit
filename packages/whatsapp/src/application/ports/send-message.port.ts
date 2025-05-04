import { Message } from '@/domain/entities/message.entity';

export interface SendMessagePort {
  execute(message: Message): Promise<void>;
}
