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
const axios_1 = __importDefault(require("axios"));
class WhatsappService {
    constructor() {
        this.payloadBase = {
            messaging_product: 'whatsapp',
            recipient_type: 'individual'
        };
    }
    sendMessageWhatsapp(paramaters, typeMessage, fromPhoneNumberId, accessToken, toNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            let callback;
            switch (typeMessage) {
                case 'text': {
                    callback = this.sendText;
                    break;
                }
                case 'image': {
                    callback = this.sendImage;
                    break;
                }
                case 'document': {
                    callback = this.sendDocument;
                    break;
                }
                case 'audio': {
                    callback = this.sendAudio;
                    break;
                }
                case 'video': {
                    callback = this.sendVideo;
                    break;
                }
                case 'sticker': {
                    callback = this.sendSticker;
                    break;
                }
                case 'location': {
                    callback = this.sendLocation;
                    break;
                }
                case 'contacts': {
                    callback = this.sendContacts;
                    break;
                }
                case 'interactive': {
                    callback = this.sendList;
                    break;
                }
                default: {
                    throw new Error('TIPO_INCORRECTO');
                }
            }
            const baseInfo = callback(paramaters);
            const data = Object.assign(Object.assign(Object.assign({}, this.payloadBase), { type: typeMessage, to: toNumber }), baseInfo);
            return Object.assign({ response_whatsapp: yield this.sendRequestMessage(data, fromPhoneNumberId, accessToken) }, baseInfo);
        });
    }
    sendRequestMessage(data, fromPhoneNumberId, accessToken, version = 'v16.0') {
        var _a, _b, _c, _d, _e, _f, _g;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data: rawResult } = yield (0, axios_1.default)(`https://graph.facebook.com/${version}/${fromPhoneNumberId}/messages`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    },
                    data
                });
                const result = rawResult;
                return {
                    messageId: (_b = (_a = result.messages) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.id,
                    phoneNumber: (_d = (_c = result.contacts) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.input,
                    whatsappId: (_f = (_e = result.contacts) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.wa_id
                };
            }
            catch (err) {
                console.error(err);
                // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
                if (err.response) {
                    throw (_g = err === null || err === void 0 ? void 0 : err.response) === null || _g === void 0 ? void 0 : _g.data;
                    // } else if ((err as any).request) {
                    //   throw (err as AxiosError)?.request;
                }
                else if (err instanceof Error) {
                    // eslint-disable-next-line @typescript-eslint/no-throw-literal
                    throw err.message;
                }
                else {
                    throw err;
                }
            }
        });
    }
    sendText(parameters) {
        return {
            text: {
                body: parameters.text,
                preview_url: parameters.options.preview_url
            }
        };
    }
    sendImage(parameters) {
        return {
            image: this.getMediaPayload(parameters.urlOrObjectId, parameters.options)
        };
    }
    sendDocument(parameters) {
        return {
            document: this.getMediaPayload(parameters.urlOrObjectId, parameters.options)
        };
    }
    sendAudio(parameters) {
        return {
            audio: this.getMediaPayload(parameters.urlOrObjectId)
        };
    }
    sendVideo(parameters) {
        return {
            video: this.getMediaPayload(parameters.urlOrObjectId, parameters.options)
        };
    }
    sendSticker(parameters) {
        return {
            sticker: this.getMediaPayload(parameters.urlOrObjectId)
        };
    }
    sendLocation(parameters) {
        var _a, _b;
        return {
            location: {
                latitude: parameters.latitude,
                longitude: parameters.longitude,
                name: (_a = parameters.options) === null || _a === void 0 ? void 0 : _a.name,
                address: (_b = parameters.options) === null || _b === void 0 ? void 0 : _b.address
            }
        };
    }
    sendTemplate(parameters) {
        return {
            template: {
                name: parameters.name,
                language: {
                    code: parameters.languageCode
                },
                components: parameters.components
            }
        };
    }
    sendContacts(parameters) {
        return {
            contacts: parameters.contacts
        };
    }
    sendReplyButtons(parameters) {
        var _a, _b, _c;
        return {
            interactive: Object.assign(Object.assign({ body: {
                    text: parameters.bodyText
                } }, (((_a = parameters.options) === null || _a === void 0 ? void 0 : _a.footerText)
                ? {
                    footer: { text: (_b = parameters.options) === null || _b === void 0 ? void 0 : _b.footerText }
                }
                : {})), { header: (_c = parameters.options) === null || _c === void 0 ? void 0 : _c.header, type: 'button', action: {
                    buttons: Object.entries(parameters.buttons).map(([key, value]) => ({
                        type: 'reply',
                        reply: {
                            title: value,
                            id: key
                        }
                    }))
                } })
        };
    }
    sendList(parameters) {
        var _a, _b, _c;
        return {
            interactive: Object.assign(Object.assign({ body: {
                    text: parameters.bodyText
                } }, (((_a = parameters.options) === null || _a === void 0 ? void 0 : _a.footerText)
                ? {
                    footer: { text: (_b = parameters.options) === null || _b === void 0 ? void 0 : _b.footerText }
                }
                : {})), { header: (_c = parameters.options) === null || _c === void 0 ? void 0 : _c.header, type: 'list', action: {
                    button: parameters.buttonName,
                    sections: Object.entries(parameters.sections).map(([key, value]) => ({
                        title: key,
                        rows: value
                    }))
                } })
        };
    }
    getMediaPayload(urlOrObjectId, options) {
        return {
            link: urlOrObjectId,
            caption: options === null || options === void 0 ? void 0 : options.caption,
            filename: options === null || options === void 0 ? void 0 : options.filename
        };
    }
    getMediaMessage(accessToken, objectId) {
        return __awaiter(this, void 0, void 0, function* () {
            const responseGetMedia = yield (0, axios_1.default)(`https://graph.facebook.com/v16.0/${objectId}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            return yield (0, axios_1.default)(String(responseGetMedia.data.url), {
                method: 'GET',
                responseType: 'stream',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
        });
    }
}
exports.default = new WhatsappService();
