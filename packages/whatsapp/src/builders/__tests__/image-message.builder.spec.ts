import { MessageType } from '@/domain/enums/message-type.enum';
import { ImageMessageBuilder } from '../image-message.builder';

describe('ImageMessageBuilder', () => {
  const recipient = '5511999999999';
  const imageUrl = 'https://example.com/image.jpg';
  const caption = 'Uma imagem incrível';

  it('should build an image message with recipient, image URL, and caption', () => {
    const builder = new ImageMessageBuilder()
      .setRecipient(recipient)
      .setImageUrl(imageUrl)
      .setCaption(caption);

    const message = builder.build();

    expect(message).toEqual({
      to: recipient,
      type: MessageType.IMAGE,
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      image: {
        link: imageUrl,
        caption: caption,
      },
    });
  });

  it('should build an image message without recipient and image URL', () => {
    const builder = new ImageMessageBuilder();

    expect(() => builder.build()).toThrow('Recipient and image are required.');
  });

  it('should throw an error if image link is not set', () => {
    const builder = new ImageMessageBuilder().setRecipient(recipient);

    expect(() => builder.build()).toThrow('Recipient and image are required.');
  });

  it('should allow building an image message without a caption', () => {
    const builder = new ImageMessageBuilder()
      .setRecipient(recipient)
      .setImageUrl(imageUrl);

    const message = builder.build();

    expect(message.image.caption).toBeUndefined();
  });
});
