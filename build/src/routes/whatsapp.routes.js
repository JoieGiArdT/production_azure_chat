"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const whatsapp_controller_1 = __importDefault(require("../controllers/whatsapp.controller"));
class WhatsappRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.whatsappController = new whatsapp_controller_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').get(this.whatsappController.verifyToken);
        this.router.route('/').post(this.whatsappController.receivedMessageWhatsapp);
    }
}
const router = (new WhatsappRoutes()).router;
exports.router = router;
