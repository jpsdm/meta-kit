import { MessageType } from '@/domain/enums/message-type.enum';
import { TemplateMessageBuilder } from '../template-message.builder';

describe('TemplateMessageBuilder', () => {
  const recipient = '5511999999999';
  const templateName = 'order_update';
  const languageCode = 'pt_BR';

  it('should build a complete template message with header, body, footer and buttons', () => {
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
      .addFooter('Obrigado por comprar conosco!')
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
            type: 'footer',
            text: 'Obrigado por comprar conosco!',
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

  it('should throw error if adding more than one header', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode)
      .addHeader([{ type: 'text', text: 'Header text' }]);

    expect(() =>
      builder.addHeader([{ type: 'text', text: 'Another header' }]),
    ).toThrow('Template can only have one header component');
  });

  it('should throw error if header has more than one parameter', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode);

    expect(() =>
      builder.addHeader([
        { type: 'text', text: 'Header text' },
        { type: 'image', image: { link: 'https://example.com/image.jpg' } },
      ]),
    ).toThrow('Header can only have one parameter');
  });

  it('should throw error if header parameter has invalid type', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode);

    expect(() =>
      builder.addHeader([
        {
          type: 'currency',
          currency: {
            fallback_value: '$100',
            code: 'USD',
            amount_1000: 100000,
          },
        } as any,
      ]),
    ).toThrow('Invalid parameter type for header: currency');
  });

  it('should throw error if adding more than one body', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode)
      .addBody([{ type: 'text', text: 'Body text' }]);

    expect(() =>
      builder.addBody([{ type: 'text', text: 'Another body' }]),
    ).toThrow('Template can only have one body component');
  });

  it('should throw error if body parameter has invalid type', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode);

    expect(() =>
      builder.addBody([
        {
          type: 'image',
          image: { link: 'https://example.com/image.jpg' },
        } as any,
      ]),
    ).toThrow('Invalid parameter type for body: image');
  });

  it('should throw error if adding more than one footer', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode)
      .addFooter('Footer text');

    expect(() => builder.addFooter('Another footer')).toThrow(
      'Template can only have one footer component',
    );
  });

  it('should throw error if adding more than maximum allowed buttons', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode);

    for (let i = 0; i < 10; i++) {
      builder.addButton(i.toString(), 'quick_reply', [
        { type: 'payload', payload: `BUTTON_${i}` },
      ]);
    }

    expect(() =>
      builder.addButton('10', 'quick_reply', [
        { type: 'payload', payload: 'ONE_TOO_MANY' },
      ]),
    ).toThrow('Maximum number of buttons (10) exceeded');
  });

  it('should throw error if button parameter has invalid type', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, languageCode);

    expect(() =>
      builder.addButton('0', 'quick_reply', [
        {
          type: 'image',
          image: { link: 'https://example.com/image.jpg' },
        } as any,
      ]),
    ).toThrow('Invalid parameter type for button: image');
  });

  it('should throw error if recipient is missing', () => {
    const builder = new TemplateMessageBuilder().setTemplate(
      templateName,
      languageCode,
    );

    expect(() => builder.build()).toThrow(
      'Recipient, template name, and language code are required.',
    );
  });

  it('should throw error if template name is missing', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate('', languageCode);

    expect(() => builder.build()).toThrow(
      'Recipient, template name, and language code are required.',
    );
  });

  it('should throw error if language code is missing', () => {
    const builder = new TemplateMessageBuilder()
      .setRecipient(recipient)
      .setTemplate(templateName, '');

    expect(() => builder.build()).toThrow(
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
      .addFooter('Footer text')
      .addButton('0', 'quick_reply', []);

    expect(result).toBeInstanceOf(TemplateMessageBuilder);
  });
});
