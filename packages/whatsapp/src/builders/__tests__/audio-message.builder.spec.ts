import { MessageType } from '@/domain/enums/message-type.enum';
import { AudioMessageBuilder } from '../audio-message.builder';

describe('AudioMessageBuilder', () => {
  it('should build an audio message with recipient and audio ID', () => {
    const message = new AudioMessageBuilder()
      .setRecipient('55119999')
      .setAudioId('123456789')
      .build();

    expect(message).toEqual({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: '55119999',
      type: MessageType.AUDIO,
      audio: {
        id: '123456789',
        link: undefined,
      },
    });
  });

  it('should build an audio message with recipient and audio link', () => {
    const message = new AudioMessageBuilder()
      .setRecipient('55119999')
      .setAudioLink('https://example.com/audio.mp3')
      .build();

    expect(message).toEqual({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: '55119999',
      type: MessageType.AUDIO,
      audio: {
        id: undefined,
        link: 'https://example.com/audio.mp3',
      },
    });
  });

  it('should throw an error if recipient is not set', () => {
    expect(() => {
      new AudioMessageBuilder().setAudioId('123456789').build();
    }).toThrow('Recipient is required.');
  });

  it('should throw an error if neither audio ID nor audio link is set', () => {
    expect(() => {
      new AudioMessageBuilder().setRecipient('55119999').build();
    }).toThrow('The audio ID or audio link is required.');
  });

  it('should throw an error if both audio ID and audio link are set', () => {
    expect(() => {
      new AudioMessageBuilder()
        .setRecipient('55119999')
        .setAudioId('123456789')
        .setAudioLink('https://example.com/audio.mp3')
        .build();
    }).toThrow('Cannot provide both audio ID and audio link.');
  });

  it('should allow method chaining', () => {
    const builder = new AudioMessageBuilder();
    const result1 = builder.setRecipient('55119999');
    const result2 = builder.setAudioId('123456789');

    expect(result1).toBe(builder);
    expect(result2).toBe(builder);
  });
});
