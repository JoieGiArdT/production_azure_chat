import { Request, Response } from 'express'
import { DocumentData, DocumentReference } from 'firebase/firestore'
import { conversationService } from '../services/conversation.service'
import { messageService, SchemaMessage } from '../services/message.service'
import whatsappService from '../services/whatsapp.service'
import { SchemaConversation } from '../types/conversation.types'

export default class MessageController {
  sendMessage ({ body }: Request, res: Response): void {
    try {
      whatsappService.sendMessageWhatsapp(
        body.parameters,
        body.type,
        body.from,
        body.token,
        body.to)
        .then((responseSendMessageWhatsapp) => {
          new Promise((resolve, reject) => {
            if (body.idConversation != null) {
              resolve(body.id_conversation)
            } else {
              (async (): Promise<DocumentReference<DocumentData>> => {
                return await conversationService.createConversation(
                  new SchemaConversation(
                    responseSendMessageWhatsapp.response_whatsapp.whatsappId,
                    body.to,
                    body.from,
                    responseSendMessageWhatsapp.response_whatsapp.messageId
                  ).conversation)
              })().then((responseCreateConversation) => resolve(responseCreateConversation.id))
                .catch((error) => reject(error))
            }
          }).then((responseId) => {
            const schemaMessage = new SchemaMessage(
              responseSendMessageWhatsapp.response_whatsapp.messageId,
              body.to,
              body.type,
              responseSendMessageWhatsapp[body.type]
            )
            messageService.createMessage(schemaMessage.message, responseId)
              .then((responseCreateMessage) => {
                res.send(responseCreateMessage)
              }).catch((error) => {
                throw new Error('ERROR: GUARDAR MENSAJE - ' + String(error))
              })
          }).catch((error) => {
            throw new Error('ERROR: OBTENER ID - ' + String(error))
          })
        }).catch((error) => {
          throw new Error('ERROR: ENVIAR MENSAJE - ' + String(error))
        })
    } catch (error) {
      res.status(400).send('NOT_RECEIVED')
    }
  }
}
