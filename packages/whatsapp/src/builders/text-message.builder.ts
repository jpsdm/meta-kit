import { Message } from '@/domain/entities/message.entity';
import { MessageType } from '@/domain/enums/message-type.enum';
import { MessageBuilder } from './message-builder.interface';

export class TextMessageBuilder implements MessageBuilder {
  private to!: string;
  private text!: string;

  setRecipient(to: string): this {
    this.to = to;
    return this;
  }

  setText(text: string): this {
    this.text = text;
    return this;
  }

  build(): Message<MessageType.TEXT> {
    if (!this.to || !this.text) {
      throw new Error('Recipient and text are required.');
    }

    return {
      to: this.to,
      type: MessageType.TEXT,
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      text: {
        body: this.text,
      },
    };
  }
}
