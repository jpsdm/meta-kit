import { MessageType } from '@/domain/enums/message-type.enum';
import { TemplateMessageBuilder } from '../template-message.builder';

describe('TemplateMessageBuilder', () => {
  const recipient = '5511999999999';
  const templateName = 'order_update';
  const languageCode = 'pt_BR';

  it('should build a complete template message with header, body and buttons', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode)
      .addHeader([
        {
          type: 'image',
          image: {
            link: 'https://example.com/image.jpg',
          },
        },
      ])
      .addBody([
        {
          type: 'text',
          text: 'Olá, seu pedido foi enviado!',
        },
        {
          type: 'currency',
          currency: {
            fallback_value: 'R$ 100,00',
            code: 'BRL',
            amount_1000: 100000,
          },
        },
        {
          type: 'date_time',
          date_time: {
            fallback_value: 'Maio 4, 2025',
          },
        },
      ])
      .addButton('0', 'quick_reply', [
        {
          type: 'payload',
          payload: 'TRACK_ORDER',
        },
      ])
      .addButton('1', 'quick_reply', [
        {
          type: 'payload',
          payload: 'CANCEL_ORDER',
        },
      ]);

    const message = builder.build();
    console.log(JSON.stringify(message, null, 2)); // For debugging
    expect(message).toEqual({
      to: recipient,
      type: MessageType.TEMPLATE,
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      template: {
        name: templateName,
        language: {
          code: languageCode,
        },
        components: [
          {
            type: 'header',
            parameters: [
              {
                type: 'image',
                image: {
                  link: 'https://example.com/image.jpg',
                },
              },
            ],
          },
          {
            type: 'body',
            parameters: [
              {
                type: 'text',
                text: 'Olá, seu pedido foi enviado!',
              },
              {
                type: 'currency',
                currency: {
                  fallback_value: 'R$ 100,00',
                  code: 'BRL',
                  amount_1000: 100000,
                },
              },
              {
                type: 'date_time',
                date_time: {
                  fallback_value: 'Maio 4, 2025',
                },
              },
            ],
          },
          {
            type: 'button',
            sub_type: 'quick_reply',
            index: '0',
            parameters: [
              {
                type: 'payload',
                payload: 'TRACK_ORDER',
              },
            ],
          },
          {
            type: 'button',
            sub_type: 'quick_reply',
            index: '1',
            parameters: [
              {
                type: 'payload',
                payload: 'CANCEL_ORDER',
              },
            ],
          },
        ],
      },
    });
  });

  it('should build a message without any components', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode);

    const message = builder.build();

    expect(message.template.components).toEqual([]);
  });

  it('should throw error if recipient is missing', () => {
    const builder = new TemplateMessageBuilder().setTemplate(
      templateName,
      languageCode,
    );

    expect(() => builder.build()).toThrowError(
      'Recipient, template name, and language code are required.',
    );
  });

  it('should throw error if template name is missing', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate('', languageCode);

    expect(() => builder.build()).toThrowError(
      'Recipient, template name, and language code are required.',
    );
  });

  it('should throw error if language code is missing', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, '');

    expect(() => builder.build()).toThrowError(
      'Recipient, template name, and language code are required.',
    );
  });

  it('should support chaining of all methods', () => {
    const builder = new TemplateMessageBuilder();
    const result = builder
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode)
      .addHeader([])
      .addBody([])
      .addButton('0', 'quick_reply', []);

    expect(result).toBeInstanceOf(TemplateMessageBuilder);
  });
});
