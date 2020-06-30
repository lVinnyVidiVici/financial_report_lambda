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
const moment_1 = __importDefault(require("moment"));
const financialApi_service_1 = require("./financialApi.service");
const mobilePush_service_1 = require("./mobilePush.service");
const reportGeneration_service_1 = require("./reportGeneration.service");
function init() {
    return __awaiter(this, void 0, void 0, function* () {
        let ipoReport = 'No IPOs today\n';
        let earningsReport = 'No earnings today\n';
        const startDate = moment_1.default().format('YYYY-MM-DD');
        const endDate = moment_1.default().add(1, 'day').format('YYYY-MM-DD');
        const ipoResult = yield financialApi_service_1.FinancialApiService.getIpoData(startDate, endDate);
        const earningsResult = yield financialApi_service_1.FinancialApiService.getEarningsData(startDate, endDate);
        const companyEarningsDetails = yield Promise.all(earningsResult.map((event) => {
            return financialApi_service_1.FinancialApiService.getCompanyMetrics(event.symbol);
        }));
        if (ipoResult.length > 0)
            ipoReport = reportGeneration_service_1.ReportGenerationService.generateIpoReport(ipoResult);
        if (companyEarningsDetails.length > 0) {
            const bestYearlyReturn = getBestYearlyReturn(companyEarningsDetails);
            const mostAnticipatedEarnings = getMostAnticipated(companyEarningsDetails);
            earningsReport = reportGeneration_service_1.ReportGenerationService.generateEarningsReport(earningsResult, bestYearlyReturn, mostAnticipatedEarnings);
        }
        yield mobilePush_service_1.MobilePushService.sendText(`Daily financial summary for ${moment_1.default().format('ddd MMM DD YYYY')}\n`
            + ipoReport + earningsReport);
    });
}
function getBestYearlyReturn(companies) {
    return companies.reduce((currentBest, contender) => {
        return currentBest["52WeekPriceReturnDaily"] > contender["52WeekPriceReturnDaily"] ?
            currentBest : contender;
    });
}
function getMostAnticipated(companies) {
    return companies.reduce((currentBest, contender) => {
        const contenderAnticipationScore = percentIncrease(contender["3MonthAverageTradingVolume"], contender["10DayAverageTradingVolume"]);
        const currentBestAnticipationScore = percentIncrease(currentBest["3MonthAverageTradingVolume"], currentBest["10DayAverageTradingVolume"]);
        return currentBestAnticipationScore > contenderAnticipationScore ? currentBest : contender;
    });
}
function percentIncrease(baseline, comparator) {
    return (comparator - baseline) / baseline;
}
exports.handler = init;
