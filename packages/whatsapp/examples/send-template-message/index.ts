import {
  Client,
  SendMessage,
  TemplateMessageBuilder,
} from '@meta-kit/whatsapp';

import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  token: process.env.WP_TOKEN as string,
  baseURL: process.env.WP_BASE_URL as string,
});

const sendMessageUseCase = new SendMessage(client);

const message = new TemplateMessageBuilder()
  .setRecipient('551100001111')
  .setTemplate('hello_world ', 'en_US')
  .addBody([
    {
      type: 'text',
      text: 'Your message here',
    },
  ]) // Optional
  .addButton('0', 'quick_reply', [
    {
      type: 'payload',
      payload: 'payload-return-id-01',
    },
  ]) // Optional
  .addButton('1', 'quick_reply', [
    {
      type: 'payload',
      payload: 'payload-return-id-02',
    },
  ]) // Optional
  .build();

sendMessageUseCase
  .execute(message)
  .then(() => console.log('message sent successfully'))
  .catch((error) => console.error('error sending message:', error));
