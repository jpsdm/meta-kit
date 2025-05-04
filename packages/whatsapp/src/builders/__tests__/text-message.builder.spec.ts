import { TextMessageBuilder } from '../text-message.builder';

describe('TextMessageBuilder', () => {
  it('should build a text message with recipient and text', () => {
    const message = new TextMessageBuilder()
      .setRecipient('5511999999999')
      .setText('Olá mundo!')
      .build();

    expect(message).toEqual({
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to: '5511999999999',
      type: 'text',
      text: { body: 'Olá mundo!' },
    });
  });

  it('should throw an error if recipient is not set', () => {
    expect(() => {
      new TextMessageBuilder().setText('Olá mundo!').build();
    }).toThrow('Recipient and text are required.');
  });
});
