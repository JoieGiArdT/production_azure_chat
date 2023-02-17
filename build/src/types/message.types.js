"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaMessage = void 0;
;
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
class SchemaMessage {
    constructor(externalId, fromNumber, typeMessage, contentMessage, conversationId) {
        this.message = {
            external_id: externalId,
            conversation_id: conversationId != null ? conversationId : '',
            from: fromNumber,
            type: typeMessage,
            timestamp: null,
            content_message: contentMessage
        };
    }
}
exports.SchemaMessage = SchemaMessage;
