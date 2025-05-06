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
  [MessageType.INTERACTIVE]: {
    type: 'list' | 'button' | 'location_request_message';
    header?: {
      type: 'text' | 'image' | 'video' | 'document';
      text?: string;
      image?: {
        id?: string;
        link?: string;
        provider?: {
          name: string;
        };
      };
      video?: {
        id?: string;
        link?: string;
        provider?: {
          name: string;
        };
      };
      document?: {
        id?: string;
        link?: string;
        provider?: {
          name: string;
        };
        filename?: string;
      };
    };
    body: {
      text: string;
    };
    footer?: {
      text: string;
    };
    action: {
      button?: string;
      buttons?: Array<{
        type: 'reply';
        reply: {
          id: string;
          title: string;
        };
      }>;
      sections?: Array<{
        title: string;
        rows: Array<{
          id: string;
          title: string;
          description?: string;
        }>;
      }>;
      name?: 'send_location';
    };
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
  | Message<MessageType.INTERACTIVE>;
