import { MessageType } from '@/domain/enums/message-type.enum';
import {
  InteractiveMessageBuilder,
  InteractiveMessageType,
} from '../interactive-message.builder';

describe('InteractiveMessageBuilder', () => {
  const recipient = '558191967871';
  const bodyText = 'Please select an option:';
  const footerText = 'Footer text';

  describe('List Message', () => {
    it('should build a valid list message with all properties', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setFooter(footerText)
        .setHeader({ type: 'text', text: 'Header text' })
        .createListAction('View options', [
          {
            title: 'Section 1',
            rows: [
              {
                id: 'option1',
                title: 'Option 1',
                description: 'Description 1',
              },
            ],
          },
        ]);

      const message = builder.build();

      expect(message).toEqual({
        to: recipient,
        type: MessageType.INTERACTIVE,
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        interactive: {
          type: InteractiveMessageType.LIST,
          header: { type: 'text', text: 'Header text' },
          body: { text: bodyText },
          footer: { text: footerText },
          action: {
            button: 'View options',
            sections: [
              {
                title: 'Section 1',
                rows: [
                  {
                    id: 'option1',
                    title: 'Option 1',
                    description: 'Description 1',
                  },
                ],
              },
            ],
          },
        },
      });
    });

    it('should build a valid list message with minimum required properties', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .createListAction('View options', [
          {
            title: 'Section 1',
            rows: [
              {
                id: 'option1',
                title: 'Option 1',
              },
            ],
          },
        ]);

      const message = builder.build();

      expect(message).toEqual({
        to: recipient,
        type: MessageType.INTERACTIVE,
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        interactive: {
          type: InteractiveMessageType.LIST,
          body: { text: bodyText },
          action: {
            button: 'View options',
            sections: [
              {
                title: 'Section 1',
                rows: [
                  {
                    id: 'option1',
                    title: 'Option 1',
                  },
                ],
              },
            ],
          },
        },
      });
    });

    it('should throw error when button text exceeds 20 characters', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() =>
        builder.createListAction('This button text is too long for WhatsApp', [
          {
            title: 'Section 1',
            rows: [{ id: 'option1', title: 'Option 1' }],
          },
        ]),
      ).toThrow('Button text cannot exceed 20 characters');
    });

    it('should throw error when more than 10 sections are provided', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      const sections = Array(11)
        .fill(0)
        .map((_, i) => ({
          title: `Section ${i}`,
          rows: [{ id: `option${i}`, title: `Option ${i}` }],
        }));

      expect(() => builder.createListAction('View options', sections)).toThrow(
        'Cannot have more than 10 sections',
      );
    });

    it('should throw error when section title exceeds 24 characters', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() =>
        builder.createListAction('View options', [
          {
            title: 'This section title is too long for WhatsApp API limits',
            rows: [{ id: 'option1', title: 'Option 1' }],
          },
        ]),
      ).toThrow('Section title cannot exceed 24 characters');
    });

    it('should throw error when section has no rows', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() =>
        builder.createListAction('View options', [
          {
            title: 'Section 1',
            rows: [],
          },
        ]),
      ).toThrow('Each section must have at least one row');
    });

    it('should throw error when row title exceeds 24 characters', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() =>
        builder.createListAction('View options', [
          {
            title: 'Section 1',
            rows: [
              {
                id: 'option1',
                title: 'This row title is too long for WhatsApp API limits',
              },
            ],
          },
        ]),
      ).toThrow('Row title cannot exceed 24 characters');
    });

    it('should throw error when row description exceeds 72 characters', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() =>
        builder.createListAction('View options', [
          {
            title: 'Section 1',
            rows: [
              {
                id: 'option1',
                title: 'Option 1',
                description:
                  'This description is way too long for WhatsApp API limits and should throw an error when validated by the builder class',
              },
            ],
          },
        ]),
      ).toThrow('Row description cannot exceed 72 characters');
    });
  });

  describe('Button Message', () => {
    it('should build a valid button message with all properties', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setFooter(footerText)
        .setHeader({ type: 'text', text: 'Header text' })
        .setButtonType()
        .createButtonAction([
          {
            type: 'reply',
            reply: {
              id: 'button1',
              title: 'Yes',
            },
          },
          {
            type: 'reply',
            reply: {
              id: 'button2',
              title: 'No',
            },
          },
        ]);

      const message = builder.build();

      expect(message).toEqual({
        to: recipient,
        type: MessageType.INTERACTIVE,
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        interactive: {
          type: InteractiveMessageType.BUTTON,
          header: { type: 'text', text: 'Header text' },
          body: { text: bodyText },
          footer: { text: footerText },
          action: {
            buttons: [
              {
                type: 'reply',
                reply: {
                  id: 'button1',
                  title: 'Yes',
                },
              },
              {
                type: 'reply',
                reply: {
                  id: 'button2',
                  title: 'No',
                },
              },
            ],
          },
        },
      });
    });

    it('should throw error when no buttons are provided', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setButtonType();

      expect(() => builder.createButtonAction([])).toThrow(
        'Must have at least one button',
      );
    });

    it('should throw error when more than 3 buttons are provided', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setButtonType();

      const buttons = Array(4)
        .fill(0)
        .map((_, i) => ({
          type: 'reply' as const,
          reply: {
            id: `button${i}`,
            title: `Button ${i}`,
          },
        }));

      expect(() => builder.createButtonAction(buttons)).toThrow(
        'Cannot have more than 3 buttons',
      );
    });

    it('should throw error when button title exceeds 20 characters', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setButtonType();

      expect(() =>
        builder.createButtonAction([
          {
            type: 'reply',
            reply: {
              id: 'button1',
              title: 'This button title is too long for WhatsApp',
            },
          },
        ]),
      ).toThrow('Button title cannot exceed 20 characters');
    });

    it('should throw error when button ID has leading or trailing spaces', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setButtonType();

      expect(() =>
        builder.createButtonAction([
          {
            type: 'reply',
            reply: {
              id: ' button1 ',
              title: 'Button 1',
            },
          },
        ]),
      ).toThrow('Button ID cannot have leading or trailing spaces');
    });

    it('should throw error when adding button action to non-button message type', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() =>
        builder.createButtonAction([
          {
            type: 'reply',
            reply: {
              id: 'button1',
              title: 'Button 1',
            },
          },
        ]),
      ).toThrow('Cannot add button action to non-button message type');
    });
  });

  describe('Location Request Message', () => {
    it('should build a valid location request message', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setFooter(footerText)
        .setHeader({ type: 'text', text: 'Header text' })
        .setLocationRequestType()
        .createLocationRequestAction();

      const message = builder.build();

      expect(message).toEqual({
        to: recipient,
        type: MessageType.INTERACTIVE,
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        interactive: {
          type: InteractiveMessageType.LOCATION_REQUEST,
          header: { type: 'text', text: 'Header text' },
          body: { text: bodyText },
          footer: { text: footerText },
          action: {
            name: 'send_location',
          },
        },
      });
    });

    it('should throw error when adding location request action to non-location request message type', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() => builder.createLocationRequestAction()).toThrow(
        'Cannot add location request action to non-location request message type',
      );
    });
  });

  describe('Header Validation', () => {
    it('should throw error when text header exceeds 60 characters', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() =>
        builder.setHeader({
          type: 'text',
          text: 'This header text is way too long for WhatsApp API limits and should throw an error when validated by the builder class',
        }),
      ).toThrow('Header text cannot exceed 60 characters');
    });

    it('should accept valid image header', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setHeader({
          type: 'image',
          image: {
            link: 'https://example.com/image.jpg',
          },
        })
        .createListAction('View options', [
          {
            title: 'Section 1',
            rows: [{ id: 'option1', title: 'Option 1' }],
          },
        ]);

      const message = builder.build();
      expect(message.interactive.header).toEqual({
        type: 'image',
        image: {
          link: 'https://example.com/image.jpg',
        },
      });
    });

    it('should accept valid video header', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setHeader({
          type: 'video',
          video: {
            link: 'https://example.com/video.mp4',
          },
        })
        // Add an action to prevent the "Action is required" error
        .createListAction('View options', [
          {
            title: 'Section 1',
            rows: [{ id: 'option1', title: 'Option 1' }],
          },
        ]);

      const message = builder.build();
      expect(message.interactive.header).toEqual({
        type: 'video',
        video: {
          link: 'https://example.com/video.mp4',
        },
      });
    });

    it('should accept valid document header', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setHeader({
          type: 'document',
          document: {
            link: 'https://example.com/doc.pdf',
            filename: 'document.pdf',
          },
        })

        .createListAction('View options', [
          {
            title: 'Section 1',
            rows: [{ id: 'option1', title: 'Option 1' }],
          },
        ]);

      const message = builder.build();
      expect(message.interactive.header).toEqual({
        type: 'document',
        document: {
          link: 'https://example.com/doc.pdf',
          filename: 'document.pdf',
        },
      });
    });
  });

  describe('Body Validation', () => {
    it('should throw error when body text exceeds 1024 characters', () => {
      const builder = new InteractiveMessageBuilder().setRecipient(recipient);

      const longText = 'a'.repeat(1025);
      expect(() => builder.setBody(longText)).toThrow(
        'Body text cannot exceed 1024 characters',
      );
    });
  });

  describe('Build Validation', () => {
    it('should throw error when recipient is not set', () => {
      const builder = new InteractiveMessageBuilder()
        .setBody(bodyText)
        .createListAction('View options', [
          {
            title: 'Section 1',
            rows: [{ id: 'option1', title: 'Option 1' }],
          },
        ]);

      expect(() => builder.build()).toThrow('Recipient is required');
    });

    it('should throw error when body is not set', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .createListAction('View options', [
          {
            title: 'Section 1',
            rows: [{ id: 'option1', title: 'Option 1' }],
          },
        ]);

      (builder as any).body = undefined;
      expect(() => builder.build()).toThrow('Body is required');
    });

    it('should throw error when action is not set', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText);

      expect(() => builder.build()).toThrow('Action is required');
    });
  });

  describe('List Action Validation', () => {
    it('should throw error when adding list action to non-list message type', () => {
      const builder = new InteractiveMessageBuilder()
        .setRecipient(recipient)
        .setBody(bodyText)
        .setButtonType();

      expect(() =>
        builder.createListAction('View options', [
          {
            title: 'Section 1',
            rows: [{ id: 'option1', title: 'Option 1' }],
          },
        ]),
      ).toThrow('Cannot add list action to non-list message type');
    });
  });
});
