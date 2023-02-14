import { Conversation, SchemaConversation } from '../types/conversation.types'
import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  DocumentReference,
  DocumentData,
  QueryDocumentSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import FireStore from '../config/firebase.database'

class ConversationService {
  async createConversation (
    conversation: Conversation
  ): Promise<DocumentReference> {
    return await addDoc(
      collection(FireStore.dataBase, 'conversations')
      ,
      Object.defineProperties(conversation, {
        last_update: {
          value: serverTimestamp()
        }
      })
    )
  }

  async getConversationById (
    id: string
  ): Promise<Array<QueryDocumentSnapshot<DocumentData>>> {
    const _query = query(
      collection(FireStore.dataBase, 'conversations')
      ,
      where('external_id', '==', id)
    )
    const querySnapshot = await getDocs(_query)
    const response: Array<QueryDocumentSnapshot<DocumentData>> = []
    querySnapshot.forEach((doc) => {
      response.push(doc)
    })
    return response
  }
}
const conversationService = new ConversationService()
export { conversationService, SchemaConversation }
