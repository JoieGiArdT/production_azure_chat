export interface Conversation {
  external_id: string
  tarjet_information: TarjetInformation
  last_message_id: string
  last_update: string | null
  status_conversation: string // 'SIN ASIGNACION' | 'EN PROCESO' | 'CERRADO'
  atention_type: string // 'BOT' | 'ADVISER'
  area_type: string // 'ADMINISTRACION' | 'SERVICIOS PUBLICOS' | 'REPARACIONES' | 'DESCOCUPACIONES' | 'CONTABILIDAD' | 'TESORERIA' | 'EMPLEADOS' | 'COMERCIAL' | 'UNKNOWN'
}

interface TarjetInformation {
  display_name: string
  photo: string | null
  to: string
}

export class SchemaConversation {
  conversation!: Conversation
  constructor (
    id: string,
    tarjetDisplayName: string,
    tarjetTo: string,
    lastMessageId: string,
    tarjetPhoto?: string,
    lastUpdate?: string,
    statusConversation?: string,
    atentionType?: string,
    areaType?: string
  ) {
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
    }
  }
}
