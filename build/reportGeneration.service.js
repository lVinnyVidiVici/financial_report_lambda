"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportGenerationService = void 0;
class ReportGenerationService {
    static generateIpoReport(ipoEvents) {
        let ipoReport = `${ipoEvents.length} Initial Public Offering(s) today\n\n`;
        ipoEvents.forEach((event) => {
            ipoReport += `${event.name} (${event.symbol}) will be `
                + `releasing ${event.numberOfShares} shares today. `
                + `The initial price will be set between ${event.price} USD\n\n`;
        });
        return ipoReport;
    }
    static generateEarningsReport(earningsEvents, bestReturn, mostAnticipated) {
        let earningsReport = `${earningsEvents.length} earnings calls today\n\n`;
        earningsEvents.forEach((event) => {
            earningsReport += `${event.symbol} reporting quarter ${event.quarter} `
                + `earnings. Expected EPS: ${event.epsEstimate}\n`;
        });
        earningsReport += `\nBest yearly return of all companies today: ${bestReturn.symbol} with ${bestReturn["52WeekPriceReturnDaily"]}\n`;
        earningsReport += `Most anticipated earnings this week: ${mostAnticipated.symbol}`;
        return earningsReport;
    }
}
exports.ReportGenerationService = ReportGenerationService;
