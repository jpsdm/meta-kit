import { AnyMessage } from '@/domain/entities/message.entity';

export interface MessageBuilder {
  setRecipient(to: string): this;
  build(): AnyMessage;
}
