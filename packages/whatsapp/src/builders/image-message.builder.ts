import { Message } from '@/domain/entities/message.entity';
import { MessageType } from '@/domain/enums/message-type.enum';
import { MessageBuilder } from './message-builder.interface';

export class ImageMessageBuilder implements MessageBuilder {
  private to!: string;
  private caption!: string;
  private link!: string;

  setRecipient(to: string): this {
    this.to = to;
    return this;
  }

  setCaption(text: string): this {
    this.caption = text;
    return this;
  }

  setImageUrl(url: string): this {
    this.link = url;
    return this;
  }

  build(): Message<MessageType.IMAGE> {
    if (!this.to || !this.link) {
      throw new Error('Recipient and image are required.');
    }

    return {
      to: this.to,
      type: MessageType.IMAGE,
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      image: {
        link: this.link,
        caption: this.caption,
      },
    };
  }
}
