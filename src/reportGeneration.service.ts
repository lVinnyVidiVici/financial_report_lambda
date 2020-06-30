import {CompanyMetric, EarningsEvent, IpoEvent} from "./types/apiResponse";

export class ReportGenerationService {

    static generateIpoReport(ipoEvents: IpoEvent[]): string {
        let ipoReport = `${ipoEvents.length} Initial Public Offering(s) today\n\n`;
        ipoEvents.forEach((event: IpoEvent) => {
            ipoReport += `${event.name} (${event.symbol}) will be `
            + `releasing ${event.numberOfShares} shares today. `
            + `The initial price will be set between ${event.price} USD\n\n`;
        });
        return ipoReport;
    }

    static generateEarningsReport(earningsEvents: EarningsEvent[], bestReturn: CompanyMetric, mostAnticipated: CompanyMetric): string {
        let earningsReport = `${earningsEvents.length} earnings calls today\n\n`;
        earningsEvents.forEach((event: EarningsEvent) => {
            earningsReport += `${event.symbol} reporting quarter ${event.quarter} `
            + `earnings. Expected EPS: ${event.epsEstimate}\n`
        });
        earningsReport += `\nBest yearly return of all companies today: ${bestReturn.symbol} with ${bestReturn["52WeekPriceReturnDaily"]}\n`
        earningsReport += `Most anticipated earnings this week: ${mostAnticipated.symbol}`;
        return earningsReport;
    }
}