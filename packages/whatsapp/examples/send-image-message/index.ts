import { Client, ImageMessageBuilder, SendMessage } from '@meta-kit/whatsapp';

import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  token: process.env.WP_TOKEN as string,
  baseURL: process.env.WP_BASE_URL as string,
});

const sendMessageUseCase = new SendMessage(client);

const message = new ImageMessageBuilder()
  .setRecipient('551100001111')
  .setCaption('Your caption here') // Optional
  .setImageUrl(
    'https://img.freepik.com/vetores-premium/ilustracao-artistica_1166422-325.jpg',
  )
  .build();

sendMessageUseCase
  .execute(message)
  .then(() => console.log('message sent successfully'))
  .catch((error) => console.error('error sending message:', error));
