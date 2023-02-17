"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const conversation_service_1 = require("../services/conversation.service");
const message_service_1 = require("../services/message.service");
const whatsapp_service_1 = __importDefault(require("../services/whatsapp.service"));
const conversation_types_1 = require("../types/conversation.types");
class MessageController {
    sendMessage({ body }, res) {
        try {
            whatsapp_service_1.default.sendMessageWhatsapp(body.parameters, body.type, body.from, body.token, body.parameters.to)
                .then((responseSendMessageWhatsapp) => {
                new Promise((resolve, reject) => {
                    if (body.idConversation != null) {
                        resolve(body.id_conversation);
                    }
                    else {
                        (() => __awaiter(this, void 0, void 0, function* () {
                            return yield conversation_service_1.conversationService.createConversation(new conversation_types_1.SchemaConversation(responseSendMessageWhatsapp.response_whatsapp.whatsappId, body.to, body.from, responseSendMessageWhatsapp.response_whatsapp.messageId).conversation);
                        }))().then((responseCreateConversation) => resolve(responseCreateConversation.id))
                            .catch((error) => reject(error));
                    }
                }).then((responseId) => {
                    const schemaMessage = new message_service_1.SchemaMessage(responseSendMessageWhatsapp.response_whatsapp.messageId, body.to, body.type, responseSendMessageWhatsapp[body.type]);
                    message_service_1.messageService.createMessage(schemaMessage.message, responseId)
                        .then((responseCreateMessage) => {
                        res.send(responseCreateMessage);
                    }).catch((error) => {
                        throw new Error('ERROR: GUARDAR MENSAJE - ' + String(error));
                    });
                }).catch((error) => {
                    throw new Error('ERROR: OBTENER ID - ' + String(error));
                });
            }).catch((error) => {
                throw new Error('ERROR: ENVIAR MENSAJE - ' + String(error));
            });
        }
        catch (error) {
            res.status(400).send('NOT_RECEIVED');
        }
    }
}
exports.default = MessageController;
