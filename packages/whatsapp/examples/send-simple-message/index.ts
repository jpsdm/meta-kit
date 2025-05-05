import { Client, SendMessage, TextMessageBuilder } from 'whatsapp-client';

import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  token: process.env.WP_TOKEN as string,
  baseURL: process.env.WP_BASE_URL as string,
});

const sendMessageUseCase = new SendMessage(client);

const message = new TextMessageBuilder()
  .setRecipient('551100001111')
  .setText('Hello, this is a test message!')
  .build();

sendMessageUseCase
  .execute(message)
  .then(() => console.log('message sent successfully'))
  .catch((error) => console.error('error sending message:', error));
