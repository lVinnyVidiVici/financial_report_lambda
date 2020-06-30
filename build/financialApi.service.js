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
exports.FinancialApiService = void 0;
const request = __importStar(require("request-promise"));
class FinancialApiService {
    static getIpoData(startDate, endDate) {
        const options = this.buildRequestOptions({
            from: startDate,
            to: endDate
        });
        return request.get(`${this.BASE_URL}/calendar/ipo`, options)
            .then((response) => {
            return response.ipoCalendar;
        })
            .catch((error) => {
            console.error(`Couldn't Retrieve IPO Data: ${error}`);
        });
    }
    static getEarningsData(startDate, endDate, symbol) {
        let options = this.buildRequestOptions({
            from: startDate,
            to: endDate,
            symbol: symbol
        });
        return request.get(`${this.BASE_URL}/calendar/earnings`, options)
            .then((response) => {
            return response.earningsCalendar;
        })
            .catch((error) => {
            console.error(`Couldn't Retrieve Earnings Data: ${error}`);
        });
    }
    static getCompanyMetrics(symbol) {
        let options = this.buildRequestOptions({ symbol: symbol });
        return request.get(`${this.BASE_URL}/stock/metric`, options)
            .then((response) => {
            Object.assign(response.metric, { symbol: symbol }); // Tie Metric to the company
            return response.metric;
        })
            .catch((error) => {
            console.error(`Couldn't Retrieve Metric Data: ${error}`);
        });
    }
    static buildRequestOptions(queryString) {
        return {
            qs: Object.assign(queryString, { token: this.API_KEY }),
            json: true
        };
    }
}
exports.FinancialApiService = FinancialApiService;
FinancialApiService.BASE_URL = 'https://finnhub.io/api/v1';
FinancialApiService.API_KEY = 'brqbinnrh5rc4v2pjthg';
