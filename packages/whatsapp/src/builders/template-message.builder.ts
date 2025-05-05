import { Message } from '@/domain/entities/message.entity';
import { MessageType } from '@/domain/enums/message-type.enum';
import { MessageBuilder } from './message-builder.interface';

// --- Component Parameter Types ---
type TextParameter = {
  type: 'text';
  text: string;
  parameter_name?: string;
};

type CurrencyParameter = {
  type: 'currency';
  currency: {
    fallback_value: string;
    code: string;
    amount_1000: number;
  };
};

type DateTimeParameter = {
  type: 'date_time';
  date_time: {
    fallback_value: string;
  };
};

type ImageParameter = {
  type: 'image';
  image: {
    link: string;
  };
};

type DocumentParameter = {
  type: 'document';
  document: {
    link: string;
    filename?: string;
  };
};

type VideoParameter = {
  type: 'video';
  video: {
    link: string;
  };
};

type PayloadParameter = {
  type: 'payload';
  payload: string;
};

type ComponentParameter =
  | TextParameter
  | CurrencyParameter
  | DateTimeParameter
  | ImageParameter
  | DocumentParameter
  | VideoParameter
  | PayloadParameter;

// --- Component Types ---
interface HeaderComponent {
  type: 'header';
  parameters: Extract<
    ComponentParameter,
    ImageParameter | DocumentParameter | VideoParameter | TextParameter
  >[];
}

interface BodyComponent {
  type: 'body';
  parameters: Extract<
    ComponentParameter,
    TextParameter | CurrencyParameter | DateTimeParameter
  >[];
}

interface ButtonComponent {
  type: 'button';
  sub_type: 'quick_reply' | 'url';
  index: string;
  parameters: Extract<ComponentParameter, PayloadParameter | TextParameter>[];
}

interface FooterComponent {
  type: 'footer';
  text: string;
}

type TemplateComponent =
  | HeaderComponent
  | BodyComponent
  | ButtonComponent
  | FooterComponent;

export class TemplateMessageBuilder implements MessageBuilder {
  private to!: string;
  private templateName!: string;
  private languageCode!: string;
  private components: TemplateComponent[] = [];
  private hasHeader = false;
  private hasBody = false;
  private hasFooter = false;
  private buttonCount = 0;
  private readonly MAX_BUTTONS = 10;

  setRecipient(to: string): this {
    this.to = to;
    return this;
  }

  setTemplate(name: string, lang: string): this {
    this.templateName = name;
    this.languageCode = lang;
    return this;
  }

  addHeader(parameters: HeaderComponent['parameters']): this {
    if (this.hasHeader) {
      throw new Error('Template can only have one header component');
    }

    if (parameters.length > 1) {
      throw new Error('Header can only have one parameter');
    }

    if (parameters.length === 1) {
      const param = parameters[0];
      if (!['text', 'image', 'document', 'video'].includes(param.type)) {
        throw new Error(`Invalid parameter type for header: ${param.type}`);
      }
    }

    this.components.push({ type: 'header', parameters });
    this.hasHeader = true;
    return this;
  }

  addBody(parameters: BodyComponent['parameters']): this {
    if (this.hasBody) {
      throw new Error('Template can only have one body component');
    }

    for (const param of parameters) {
      if (!['text', 'currency', 'date_time'].includes(param.type)) {
        throw new Error(`Invalid parameter type for body: ${param.type}`);
      }
    }

    this.components.push({ type: 'body', parameters });
    this.hasBody = true;
    return this;
  }

  addFooter(text: string): this {
    if (this.hasFooter) {
      throw new Error('Template can only have one footer component');
    }

    this.components.push({ type: 'footer', text });
    this.hasFooter = true;
    return this;
  }

  addButton(
    index: string,
    sub_type: ButtonComponent['sub_type'],
    parameters: ButtonComponent['parameters'],
  ): this {
    if (this.buttonCount >= this.MAX_BUTTONS) {
      throw new Error(
        `Maximum number of buttons (${this.MAX_BUTTONS}) exceeded`,
      );
    }

    for (const param of parameters) {
      if (!['payload', 'text'].includes(param.type)) {
        throw new Error(`Invalid parameter type for button: ${param.type}`);
      }
    }

    this.components.push({
      type: 'button',
      index,
      sub_type,
      parameters,
    });

    this.buttonCount++;
    return this;
  }

  build(): Message<MessageType.TEMPLATE> {
    if (!this.to || !this.templateName || !this.languageCode) {
      throw new Error(
        'Recipient, template name, and language code are required.',
      );
    }

    return {
      to: this.to,
      type: MessageType.TEMPLATE,
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      template: {
        name: this.templateName,
        language: {
          code: this.languageCode,
        },
        components: this.components,
      },
    };
  }
}
