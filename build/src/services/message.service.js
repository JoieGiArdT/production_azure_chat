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
exports.SchemaMessage = exports.messageService = void 0;
const message_types_1 = require("../types/message.types");
Object.defineProperty(exports, "SchemaMessage", { enumerable: true, get: function () { return message_types_1.SchemaMessage; } });
const firestore_1 = require("firebase/firestore");
const firebase_database_1 = __importDefault(require("../config/firebase.database"));
class MessageService {
    createMessage(message, idConversation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_database_1.default.dataBase, 'messages'), Object.defineProperties(message, {
                timestamp: {
                    value: (0, firestore_1.serverTimestamp)()
                },
                conversation_id: {
                    value: idConversation
                }
            }));
        });
    }
    getMessagesByConversationId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _query = (0, firestore_1.query)((0, firestore_1.collection)(firebase_database_1.default.dataBase, 'messages'), (0, firestore_1.where)('conversation_id', '==', id));
            const querySnapshot = yield (0, firestore_1.getDocs)(_query);
            const resultMessages = [];
            querySnapshot.forEach((doc) => {
                resultMessages.push(doc);
            });
            return resultMessages;
        });
    }
}
const messageService = new MessageService();
exports.messageService = messageService;
