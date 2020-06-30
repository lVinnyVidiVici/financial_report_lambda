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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialDataService = void 0;
const request = __importStar(require("request-promise"));
class FinancialDataService {
    static getIpoData(startDate, endDate) {
        const options = this.buildRequestOptions(startDate, endDate);
        return request.get(`${this.BASE_URL}/calendar/ipo`, options)
            .then((response) => {
            return response.ipoCalendar;
        })
            .catch((error) => {
            console.error(`Couldn't Retrieve IPO Data: ${error}`);
            return;
        });
    }
    static getEarningsData(startDate, endDate, symbol) {
        let options = this.buildRequestOptions(startDate, endDate, symbol);
        return request.get(`${this.BASE_URL}/calendar/earnings`, options)
            .then((response) => {
            return response.earningsCalendar;
        })
            .catch((error) => {
            console.error(`Couldn't Retrieve Earnings Data: ${error}`);
            return;
        });
    }
    static buildRequestOptions(startDate, endDate, symbol) {
        let queryString = {
            token: this.API_KEY,
            from: startDate.format('YYYY-MM-DD'),
            to: endDate.format('YYYY-MM-DD')
        };
        if (symbol)
            Object.assign(queryString, { symbol: symbol });
        return {
            qs: queryString,
            json: true
        };
    }
}
exports.FinancialDataService = FinancialDataService;
FinancialDataService.BASE_URL = 'https://finnhub.io/api/v1';
FinancialDataService.API_KEY = 'brqbinnrh5rc4v2pjthg';
