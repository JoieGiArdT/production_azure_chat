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
exports.ninoxService = void 0;
const axios_1 = __importDefault(require("axios"));
class NinoxService {
    uploadImage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, axios_1.default)('https://api.ninox.com/v1/teams/HzoowJreFjyRd3JhF/databases/k4h0mrecekgk/tables/A/records/4/files/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: 'Bearer 4099b180-a72b-11ed-be60-4be7ff369d7f'
                },
                data
            });
        });
    }
    createField(data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, axios_1.default)('https://api.ninox.com/v1/teams/HzoowJreFjyRd3JhF/databases/k4h0mrecekgk/tables/C/records', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer 4099b180-a72b-11ed-be60-4be7ff369d7f'
                },
                data
            });
        });
    }
}
const ninoxService = new NinoxService();
exports.ninoxService = ninoxService;
