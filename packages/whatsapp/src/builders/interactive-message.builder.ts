import { Message } from '@/domain/entities/message.entity';
import { MessageType } from '@/domain/enums/message-type.enum';
import { MessageBuilder } from './message-builder.interface';

// --- Header Types ---
type TextHeader = {
  type: 'text';
  text: string;
};

type ImageHeader = {
  type: 'image';
  image: {
    id?: string;
    link?: string;
    provider?: {
      name: string;
    };
  };
};

type VideoHeader = {
  type: 'video';
  video: {
    id?: string;
    link?: string;
    provider?: {
      name: string;
    };
  };
};

type DocumentHeader = {
  type: 'document';
  document: {
    id?: string;
    link?: string;
    provider?: {
      name: string;
    };
    filename?: string;
  };
};

type Header = TextHeader | ImageHeader | VideoHeader | DocumentHeader;

// --- Body Type ---
type Body = {
  text: string;
};

// --- Footer Type ---
type Footer = {
  text: string;
};

// --- List Message Types ---
type ListRow = {
  id: string;
  title: string;
  description?: string;
};

type ListSection = {
  title: string;
  rows: ListRow[];
};

type ListAction = {
  button: string;
  sections: ListSection[];
};

// --- Button Message Types ---
type ReplyButton = {
  type: 'reply';
  reply: {
    id: string;
    title: string;
  };
};

type ButtonAction = {
  buttons: ReplyButton[];
};

// --- Location Request Types ---
type LocationRequestAction = {
  name: 'send_location';
};

// --- Interactive Message Types ---
export enum InteractiveMessageType {
  LIST = 'list',
  BUTTON = 'button',
  LOCATION_REQUEST = 'location_request_message',
}

export class InteractiveMessageBuilder implements MessageBuilder {
  private to!: string;
  private type: InteractiveMessageType = InteractiveMessageType.LIST;
  private header?: Header;
  private body!: Body;
  private footer?: Footer;
  private action!: ListAction | ButtonAction | LocationRequestAction;

  setRecipient(to: string): this {
    this.to = to;
    return this;
  }

  // --- Common Methods ---
  setHeader(header: Header): this {
    if (header.type === 'text' && header.text.length > 60) {
      throw new Error('Header text cannot exceed 60 characters');
    }
    this.header = header;
    return this;
  }

  setBody(text: string): this {
    if (text.length > 1024) {
      throw new Error('Body text cannot exceed 1024 characters');
    }
    this.body = { text };
    return this;
  }

  setFooter(text: string): this {
    this.footer = { text };
    return this;
  }

  // --- List Message Methods ---
  setListType(): this {
    this.type = InteractiveMessageType.LIST;
    return this;
  }

  createListAction(buttonText: string, sections: ListSection[]): this {
    if (this.type !== InteractiveMessageType.LIST) {
      throw new Error('Cannot add list action to non-list message type');
    }

    if (buttonText.length > 20) {
      throw new Error('Button text cannot exceed 20 characters');
    }

    if (sections.length > 10) {
      throw new Error('Cannot have more than 10 sections');
    }

    // Validate sections
    for (const section of sections) {
      if (section.title.length > 24) {
        throw new Error('Section title cannot exceed 24 characters');
      }

      if (section.rows.length === 0) {
        throw new Error('Each section must have at least one row');
      }

      // Validate rows
      for (const row of section.rows) {
        if (row.title.length > 24) {
          throw new Error('Row title cannot exceed 24 characters');
        }

        if (row.description && row.description.length > 72) {
          throw new Error('Row description cannot exceed 72 characters');
        }
      }
    }

    this.action = {
      button: buttonText,
      sections,
    };

    return this;
  }

  // --- Button Message Methods ---
  setButtonType(): this {
    this.type = InteractiveMessageType.BUTTON;
    return this;
  }

  createButtonAction(buttons: ReplyButton[]): this {
    if (this.type !== InteractiveMessageType.BUTTON) {
      throw new Error('Cannot add button action to non-button message type');
    }

    if (buttons.length === 0) {
      throw new Error('Must have at least one button');
    }

    if (buttons.length > 3) {
      throw new Error('Cannot have more than 3 buttons');
    }

    // Validate buttons
    for (const button of buttons) {
      if (button.reply.title.length > 20) {
        throw new Error('Button title cannot exceed 20 characters');
      }

      // Check for leading or trailing spaces in ID
      if (button.reply.id.trim() !== button.reply.id) {
        throw new Error('Button ID cannot have leading or trailing spaces');
      }
    }

    this.action = {
      buttons,
    };

    return this;
  }

  // --- Location Request Methods ---
  setLocationRequestType(): this {
    this.type = InteractiveMessageType.LOCATION_REQUEST;
    return this;
  }

  createLocationRequestAction(): this {
    if (this.type !== InteractiveMessageType.LOCATION_REQUEST) {
      throw new Error(
        'Cannot add location request action to non-location request message type',
      );
    }

    this.action = {
      name: 'send_location',
    };

    return this;
  }

  build(): Message<MessageType.INTERACTIVE> {
    if (!this.to) {
      throw new Error('Recipient is required');
    }

    if (!this.body) {
      throw new Error('Body is required');
    }

    if (!this.action) {
      throw new Error('Action is required');
    }

    const interactive: any = {
      type: this.type,
    };

    if (this.header) {
      interactive.header = this.header;
    }

    interactive.body = this.body;

    if (this.footer) {
      interactive.footer = this.footer;
    }

    interactive.action = this.action;

    return {
      to: this.to,
      type: MessageType.INTERACTIVE,
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      interactive,
    };
  }
}
