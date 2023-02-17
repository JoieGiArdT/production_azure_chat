"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = require("fs");
class Routes {
    constructor(app) {
        this.PATH_ROUTER = `${__dirname}`;
        this.router = (0, express_1.Router)();
        this.intializeRoutes(app);
    }
    intializeRoutes(app) {
        (0, fs_1.readdirSync)(this.PATH_ROUTER).forEach((fileName) => {
            var _a;
            const route = String(this.getRouteName(fileName));
            if (route !== 'index') {
                (_a = `./${route}.routes`, Promise.resolve().then(() => __importStar(require(_a)))).then((moduleRouter) => {
                    app.use(`/${route}`, moduleRouter.router);
                }).catch((error) => console.error(error));
            }
        });
    }
    getRouteName(fileName) {
        return String(fileName.split('.').shift());
    }
}
exports.default = Routes;
