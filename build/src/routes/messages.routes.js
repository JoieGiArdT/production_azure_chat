"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const message_controllers_1 = __importDefault(require("../controllers/message.controllers"));
class WhatsappRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.messageController = new message_controllers_1.default();
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.route('/').post(this.messageController.sendMessage);
    }
}
const router = (new WhatsappRoutes()).router;
exports.router = router;
