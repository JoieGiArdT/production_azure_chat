import { Message, SchemaMessage } from '../types/message.types'
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  DocumentData,
  QueryDocumentSnapshot,
  DocumentReference,
  serverTimestamp
} from 'firebase/firestore'
import FireStore from '../config/firebase.database'

class MessageService {
  async createMessage (
    message: Message,
    idConversation: any
  ): Promise<DocumentReference> {
    return await addDoc(
      collection(FireStore.dataBase, 'messages')
      ,
      Object.defineProperties(message, {
        timestamp: {
          value: serverTimestamp()
        },
        conversation_id: {
          value: idConversation
        }
      }
      )
    )
  }

  async getMessagesByConversationId (
    id: string
  ): Promise<Array<QueryDocumentSnapshot<DocumentData>>> {
    const _query = query(
      collection(FireStore.dataBase, 'messages')
      ,
      where('conversation_id', '==', id)
    )
    const querySnapshot = await getDocs(_query)
    const resultMessages: Array<QueryDocumentSnapshot<DocumentData>> = []
    querySnapshot.forEach((doc) => {
      resultMessages.push(doc)
    })
    return resultMessages
  }
}
const messageService = new MessageService()
export { messageService, SchemaMessage }
