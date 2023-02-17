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
exports.SchemaConversation = exports.conversationService = void 0;
const conversation_types_1 = require("../types/conversation.types");
Object.defineProperty(exports, "SchemaConversation", { enumerable: true, get: function () { return conversation_types_1.SchemaConversation; } });
const firestore_1 = require("firebase/firestore");
const firebase_database_1 = __importDefault(require("../config/firebase.database"));
class ConversationService {
    createConversation(conversation) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, firestore_1.addDoc)((0, firestore_1.collection)(firebase_database_1.default.dataBase, 'conversations'), Object.defineProperties(conversation, {
                last_update: {
                    value: (0, firestore_1.serverTimestamp)()
                }
            }));
        });
    }
    getConversationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const _query = (0, firestore_1.query)((0, firestore_1.collection)(firebase_database_1.default.dataBase, 'conversations'), (0, firestore_1.where)('external_id', '==', id));
            const querySnapshot = yield (0, firestore_1.getDocs)(_query);
            const response = [];
            querySnapshot.forEach((doc) => {
                response.push(doc);
            });
            return response;
        });
    }
}
const conversationService = new ConversationService();
exports.conversationService = conversationService;
