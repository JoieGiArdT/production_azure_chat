export interface Message {
  external_id: string
  conversation_id: string
  from: string
  type: string
  timestamp: any
  content_message: any
};

/* interface Text {
  preview_url?: boolean
  body: string
}

interface Interactive {
  name: string
}

interface Image {
  link: string
  caption?: string
}

interface Audio {
  link: string
}

interface Video {
  link: string
  caption?: string
}

interface Document {
  link: string
  caption?: string
}

interface Sticker {
  link: string
}

interface Location {
  latitude: number
  longitude: number
  name: string
  address: string
} */

export class SchemaMessage {
  message!: Message
  constructor (
    externalId: string,
    fromNumber: string,
    typeMessage: string,
    contentMessage: any,
    conversationId?: string
  ) {
    this.message = {
      external_id: externalId,
      conversation_id: conversationId != null ? conversationId : '',
      from: fromNumber,
      type: typeMessage,
      timestamp: null,
      content_message: contentMessage
    }
  }
}
