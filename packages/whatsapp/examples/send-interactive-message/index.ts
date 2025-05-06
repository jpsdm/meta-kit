import {
  Client,
  InteractiveMessageBuilder,
  SendMessage,
} from '@meta-kit/whatsapp';

import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  token: process.env.WP_TOKEN as string,
  baseURL: process.env.WP_BASE_URL as string,
});

const sendMessageUseCase = new SendMessage(client);

const message = new InteractiveMessageBuilder()
  .setRecipient('551100001111')
  .setBody('Please select an option:')
  .createListAction('Click to view options', [
    {
      title: 'Section 1',
      rows: [
        {
          id: 'option1-1',
          title: 'First Option',
          description: 'This is the first option',
        },
      ],
    },
    {
      title: 'Section 2',
      rows: [
        {
          id: 'option2-1',
          title: 'First Option',
          description: 'This is the first option',
        },
        {
          id: 'option2-2',
          title: 'Second Option',
          description: 'This is the second option',
        },
      ],
    },
  ])
  .build();

sendMessageUseCase
  .execute(message)
  .then(() => console.log('message sent successfully'))
  .catch((error) => console.error('error sending message:', error));
