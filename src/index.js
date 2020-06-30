"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ipo_service_1 = require("./ipo.service");
function init() {
    const ipoService = new ipo_service_1.IpoService();
    ipoService.getIpoData().then((result) => {
        // format and send to pushbullet
        console.log(result);
    }).catch((error) => {
        console.error(`Problem Retrieving IPO Data: ${error}`);
    });
}
