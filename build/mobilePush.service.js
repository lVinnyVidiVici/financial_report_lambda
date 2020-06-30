"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobilePushService = void 0;
const request = __importStar(require("request-promise"));
class MobilePushService {
    static sendText(formattedMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = this.buildRequestOptions(formattedMessage);
            yield request.post(`${this.BASE_URL}/texts`, options)
                .catch((error) => {
                throw new Error(`Mobile Push error: ${error}`);
            });
        });
    }
    static buildRequestOptions(formattedMessage) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Token': this.API_KEY
            },
            body: {
                data: {
                    target_device_iden: this.NOKIA_DEVICE_ID,
                    addresses: ["+12039154679"],
                    message: formattedMessage
                }
            },
            json: true
        };
    }
}
exports.MobilePushService = MobilePushService;
MobilePushService.BASE_URL = 'https://api.pushbullet.com/v2';
MobilePushService.API_KEY = 'o.1mOLBoSFPCBjoCbQIrOdQnNwFOgcfxGR';
MobilePushService.NOKIA_DEVICE_ID = 'ujEJ1LNd60isjvqSNdjZaS';
