import { AudioMessageBuilder, Client, SendMessage } from '@meta-kit/whatsapp';

import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  token: process.env.WP_TOKEN as string,
  baseURL: process.env.WP_BASE_URL as string,
});

const sendMessageUseCase = new SendMessage(client);

const message = new AudioMessageBuilder()
  .setRecipient('558191967871')
  .setAudioLink(
    'https://cdn.pixabay.com/download/audio/2021/08/09/audio_3ce1bb845b.mp3',
  )
  .build();

sendMessageUseCase
  .execute(message)
  .then(() => console.log('message sent successfully'))
  .catch((error) => console.error('error sending message:', error));
