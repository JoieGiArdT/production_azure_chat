"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaConversation = void 0;
class SchemaConversation {
    constructor(id, tarjetDisplayName, tarjetTo, lastMessageId, tarjetPhoto, lastUpdate, statusConversation, atentionType, areaType) {
        this.conversation = {
            external_id: id,
            tarjet_information: {
                display_name: tarjetDisplayName,
                photo: tarjetPhoto != null ? tarjetPhoto : null,
                to: tarjetTo
            },
            last_message_id: lastMessageId,
            last_update: lastUpdate != null ? lastUpdate : null,
            status_conversation: statusConversation != null ? statusConversation : 'SIN ASIGNACION',
            atention_type: atentionType != null ? atentionType : 'BOT',
            area_type: areaType != null ? areaType : 'UNKNOWN'
        };
    }
}
exports.SchemaConversation = SchemaConversation;
