import { MessageType } from '@domain/enums/message-type.enum';

type MessagePayloadMap = {
  [MessageType.TEXT]: {
    body: string;
  };
  [MessageType.IMAGE]: {
    link: string;
    caption?: string;
  };
  [MessageType.TEMPLATE]: {
    name: string;
    language: {
      code: string;
    };
    components?: any[];
  };
  [MessageType.AUDIO]: {
    id?: string;
    link?: string;
  };
};

export type Message<T extends MessageType = MessageType> = {
  messaging_product: 'whatsapp';
  recipient_type: 'individual';
  to: string;
  type: T;
} & {
  [K in T]: MessagePayloadMap[K];
};

export type AnyMessage =
  | Message<MessageType.TEXT>
  | Message<MessageType.IMAGE>
  | Message<MessageType.TEMPLATE>
  | Message<MessageType.AUDIO>;
