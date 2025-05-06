import { Message } from '@/domain/entities/message.entity';
import { MessageType } from '@/domain/enums/message-type.enum';
import { MessageBuilder } from './message-builder.interface';

export class AudioMessageBuilder implements MessageBuilder {
  private to!: string;
  private audioId!: string;
  private audioLink!: string;

  setRecipient(to: string): this {
    this.to = to;
    return this;
  }

  setAudioId(audioId: string): this {
    this.audioId = audioId;
    return this;
  }

  setAudioLink(audioLink: string): this {
    this.audioLink = audioLink;
    return this;
  }

  build(): Message<MessageType.AUDIO> {
    if (!this.to) {
      throw new Error('Recipient is required.');
    }

    if (!this.audioId && !this.audioLink) {
      throw new Error('The audio ID or audio link is required.');
    }

    if (this.audioId && this.audioLink) {
      throw new Error('Cannot provide both audio ID and audio link.');
    }

    return {
      to: this.to,
      type: MessageType.AUDIO,
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      audio: {
        id: this.audioId || undefined,
        link: this.audioLink || undefined,
      },
    };
  }
}
