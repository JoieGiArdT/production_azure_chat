import { Router } from 'express'
import MessageController from '../controllers/message.controllers'

class WhatsappRoutes {
  router: Router = Router()
  messageController = new MessageController()
  constructor () {
    this.intializeRoutes()
  }

  intializeRoutes (): void {
    this.router.route('/').post(this.messageController.sendMessage)
  }
}

const router = (new WhatsappRoutes()).router
export { router }
