<p align="center">
  <img src="https://github.com/jpsdm/meta-kit/blob/master/.github/image/whatsapp-brand.png?raw=true" alt="Whatsapp Meta Kit" width="250">
</p>

A flexible and easy-to-use Node.js module for sending messages via the WhatsApp Business API. This module provides builders for different message types, such as text, image, and template messages, and allows easy integration with the WhatsApp Business API.

## Features

- [x] Send message
- [x] Build a Text message
- [x] Build a Image message
- [x] Build a Template message
- [ ] Build a Voice message
- [ ] Build a Interactive message
- [ ] Webhook Gateway
- [ ] Phone number utils
- [ ] Get list of templates

## Installation

You can install the module from npm:

```bash
npm install @meta-kit/whatsapp
```

## Setup

First, import the necessary classes and types into your application:

```ts
import { Client, SendMessage, TextMessageBuilder } from '@meta-kit/whatsapp';
```

## Methods

The `sendMessage()` method takes a `MessageAny` object and sends it to the recipient.

### 1. **Message Builders**

To send a message, you can use specific builders based on the type of message. Here are examples for text, image, and template messages.

### Example: Sending a Text Message

```ts
const client = new Client({
  token: 'YOUR_WHATSAPP_TOKEN',
  baseURL: 'https://graph.facebook.com/v22.0/YOUR_PHONE_ID',
});

const sendMessageUseCase = new SendMessage(client);

const message = new TextMessageBuilder()
  .setRecipient('5511999999999')
  .setText('Hello World')
  .build();

sendMessageUseCase
  .execute(message)
  .then(() => console.log('Success send message!'))
  .catch((error) => console.error('Error', error));
```

- **SendMessage**: Create a instance to send a message.
- **TextMessageBuilder**: Builds a `Message` of type `text`.

## Example Project

For a practical demonstration, check out the example folder:

- [`/examples`](https://github.com/jpsdm/meta-kit/blob/master/packages/whatsapp/examples): Contains example implementations for sending messages.

## Authors

- [@jpsdm](https://www.github.com/jpsdm)

## Disclaimer

This package is not affiliated with Meta Platforms in any way. It is an open-source project developed by and for the community. WhatsApp is a registered trademark of Meta Platforms. This package is not endorsed, sponsored, or officially connected with Meta Platforms. All copyrights, trademarks, logos, and service marks are the property of their respective owners.

## License

[MIT](https://github.com/jpsdm/meta-kit/blob/master/packages/whatsapp/LICENSE)
