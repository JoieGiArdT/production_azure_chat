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
const ninox_service_1 = require("../services/ninox.service");
const task_service_1 = require("../services/task.service");
const whatsapp_service_1 = __importDefault(require("../services/whatsapp.service"));
const bot_util_1 = require("../utils/bot.util");
const form_data_1 = __importDefault(require("form-data"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const error_handler_1 = require("../handlers/error.handler");
class WhatsappController {
    verifyToken({ query }, res) {
        try {
            const accessToken = String(process.env.TOKEN);
            if (query['hub.challenge'] != null &&
                String(query['hub.verify_token']) != null &&
                String(query['hub.verify_token']) === accessToken) {
                res.send(query['hub.challenge']);
            }
            else {
                res.status(400).send('VERIFICATION_FAILED');
            }
        }
        catch (error) {
            res.status(400).send();
        }
    }
    receivedMessageWhatsapp(req, res) {
        try {
            const body = req.body.entry[0].changes[0].value;
            task_service_1.taskService.getTaskById(body.contacts[0].wa_id)
                .then((responseGetTaskById) => {
                const responseGetParameterForAnswerTask = bot_util_1.botUtil.getParameterForAnswerTask({
                    answer: (responseGetTaskById[0] === undefined
                        ? 1
                        : (responseGetTaskById[0].data().sequence_task).length + 1),
                    response: body.messages[0]
                }, (body.messages[0].type === 'text' && responseGetTaskById[0] === undefined
                    ? body.messages[0][body.messages[0].type].body
                    : (responseGetTaskById[0] === undefined
                        ? 'No task'
                        : responseGetTaskById[0].data().type_task)));
                if (Object.entries(responseGetParameterForAnswerTask).length === 0 &&
                    responseGetTaskById[0] === undefined) {
                    res.send('ES UNA CONVERSACION');
                }
                else {
                    if (responseGetTaskById[0] === undefined) {
                        void task_service_1.taskService.createTask(new task_service_1.SchemaTask(body.contacts[0].wa_id, body.messages[0][body.messages[0].type].body, [body.messages[0][body.messages[0].type].body]).task);
                    }
                    else {
                        if (responseGetTaskById[0].data().status !== 'DONE' && responseGetParameterForAnswerTask.validation === 'approved') {
                            const array = responseGetTaskById[0].data().sequence_task;
                            array.push(responseGetParameterForAnswerTask.content);
                            void task_service_1.taskService.updateTask(responseGetTaskById[0].id, {
                                sequence_task: array,
                                status: responseGetParameterForAnswerTask.status
                            }); // Completar
                        }
                    }
                    if (responseGetParameterForAnswerTask.response_type === 'wp') {
                        whatsapp_service_1.default.sendMessageWhatsapp(responseGetParameterForAnswerTask.parameters, responseGetParameterForAnswerTask.type, '113492004941110', 'EAAFlbvoSH6YBAMgP8cyLT7dGPGL4fpHPzPAwuMBjTg6kYdLHrnSUiHUdZC9coGUpnARY7YCKCOnnvTJlnjz7gFueZAkN9YUxO8U6RWNnbigel6SNuf9izhPaX7xC17cVquvWzzZAOSFhyP2xsXXF28E8ZC7WZAu4ZCYJ8GPd5EXMD0yyCPrvAM0tF2wxKuyUeZB00y8oa4yxAZDZD', body.messages[0].from)
                            .then(() => {
                            res.send('EVENT_RECEIVED');
                        }).catch((error) => {
                            (0, error_handler_1.apiErrorHandler)(error, res, 'Error al enviar respuesta.');
                        });
                    }
                    else {
                        switch (responseGetTaskById[0].data().type_task) {
                            case 'Subir imagenes': {
                                whatsapp_service_1.default.getMediaMessage('EAAFlbvoSH6YBAMgP8cyLT7dGPGL4fpHPzPAwuMBjTg6kYdLHrnSUiHUdZC9coGUpnARY7YCKCOnnvTJlnjz7gFueZAkN9YUxO8U6RWNnbigel6SNuf9izhPaX7xC17cVquvWzzZAOSFhyP2xsXXF28E8ZC7WZAu4ZCYJ8GPd5EXMD0yyCPrvAM0tF2wxKuyUeZB00y8oa4yxAZDZD', responseGetParameterForAnswerTask.id_image)
                                    .then((image) => {
                                    const fileName = String(responseGetParameterForAnswerTask.id_image) + '.' + String(image.headers['content-type'].substr(Number(image.headers['content-type'].indexOf('/')) + 1));
                                    const localFilePath = path_1.default.resolve(__dirname, 'downloads', fileName);
                                    const downloadFile = image.data.pipe(fs_1.default.createWriteStream(localFilePath));
                                    downloadFile.on('finish', () => {
                                        const form = new form_data_1.default();
                                        form.append(fileName, fs_1.default.createReadStream(localFilePath));
                                        ninox_service_1.ninoxService.uploadImage(form)
                                            .then(() => {
                                            fs_1.default.unlink(localFilePath, (error) => {
                                                if (error != null) {
                                                    (0, error_handler_1.apiErrorHandler)(error, res, 'Error al eliminar la foto ya subida.');
                                                }
                                            });
                                            res.send('EVENT_RECEIVED');
                                        })
                                            .catch((error) => {
                                            (0, error_handler_1.apiErrorHandler)(error, res, 'Error al subir la imagen a servidor de ninox.');
                                        });
                                    });
                                }).catch((error) => {
                                    (0, error_handler_1.apiErrorHandler)(error, res, 'Error al enviar mensaje de whatsapp.');
                                });
                                break;
                            }
                            case 'Ayuda':
                                ninox_service_1.ninoxService.createField([{
                                        fields: {
                                            Departamento: (responseGetTaskById[0].data().sequence_task)[1],
                                            Numero: responseGetTaskById[0].data().external_id,
                                            Descripcion: (responseGetTaskById[0].data().sequence_task)[2]
                                        }
                                    }])
                                    .then(() => {
                                    whatsapp_service_1.default.sendMessageWhatsapp(responseGetParameterForAnswerTask.parameters, responseGetParameterForAnswerTask.type, '113492004941110', 'EAAFlbvoSH6YBAMgP8cyLT7dGPGL4fpHPzPAwuMBjTg6kYdLHrnSUiHUdZC9coGUpnARY7YCKCOnnvTJlnjz7gFueZAkN9YUxO8U6RWNnbigel6SNuf9izhPaX7xC17cVquvWzzZAOSFhyP2xsXXF28E8ZC7WZAu4ZCYJ8GPd5EXMD0yyCPrvAM0tF2wxKuyUeZB00y8oa4yxAZDZD', body.messages[0].from)
                                        .then(() => {
                                        res.send('EVENT_RECEIVED');
                                    }).catch((error) => {
                                        (0, error_handler_1.apiErrorHandler)(error, res, 'Error al enviar respuesta.');
                                    });
                                })
                                    .catch((error) => {
                                    (0, error_handler_1.apiErrorHandler)(error, res, 'Error al crear registro en Ninox.');
                                });
                                break;
                        }
                    }
                }
            }).catch((error) => {
                (0, error_handler_1.apiErrorHandler)(error, res, 'Error al revisar tareas existentes en firebase.');
            });
        }
        catch (error) {
            res.status(400).send('NOT_RECEIVED');
        }
    }
    /* requestTypeTask (body: any,
      responseGetTaskById: any,
      responseGetParameterForAnswerTask: any
    ): void {
    }
   */
    requestTypeConversation({ body }, res) {
        const id = body.contacts[0].wa_id;
        conversation_service_1.conversationService.getConversationById(id).then((responseGetConversationById) => {
            new Promise((resolve, reject) => {
                if (responseGetConversationById[0] != null) {
                    resolve(responseGetConversationById[0].id);
                }
                else {
                    (() => __awaiter(this, void 0, void 0, function* () {
                        return yield conversation_service_1.conversationService.createConversation(new conversation_service_1.SchemaConversation(id, body.contacts[0].profile.name, body.messages[0].from, body.messages[0].id).conversation);
                    }))().then((responseCreateConversation) => resolve(responseCreateConversation.id))
                        .catch((error) => reject(error));
                }
            }).then((idConversation) => {
                const schemaMessage = new message_service_1.SchemaMessage(body.messages[0].id, body.messages[0].from, body.messages[0].type, body.messages[0][body.messages[0].type]);
                message_service_1.messageService.createMessage(schemaMessage.message, idConversation).then(() => {
                    res.send('EVENT_RECEIVED');
                }).catch((error) => {
                    throw new Error('ERROR: CREACION DEL MENSAJE - ' + String(error));
                });
            }).catch((error) => {
                throw new Error('ERROR: EXTRACCION DE ID - ' + String(error));
            });
        }).catch((error) => {
            throw new Error('ERROR: REVISION DE CONVERSACION EXISTENTE - ' + String(error));
        });
    }
}
exports.default = WhatsappController;
