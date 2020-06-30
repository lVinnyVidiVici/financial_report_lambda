import moment from "moment";
import {FinancialApiService} from "./financialApi.service";
import {MobilePushService} from "./mobilePush.service";
import {ReportGenerationService} from "./reportGeneration.service";
import {CompanyMetric, EarningsEvent} from "./types/apiResponse";


async function init() {
    let ipoReport = 'No IPOs today\n';
    let earningsReport = 'No earnings today\n';
    const startDate = moment().format('YYYY-MM-DD');
    const endDate = moment().add(1, 'day').format('YYYY-MM-DD');

    const ipoResult = await FinancialApiService.getIpoData(startDate, endDate);
    const earningsResult = await FinancialApiService.getEarningsData(startDate, endDate);

    const companyEarningsDetails = await Promise.all(earningsResult.map((event: EarningsEvent) => {
         return FinancialApiService.getCompanyMetrics(event.symbol);
    }));

    if(ipoResult.length > 0) ipoReport = ReportGenerationService.generateIpoReport(ipoResult);
    if(companyEarningsDetails.length > 0) {
        const bestYearlyReturn = getBestYearlyReturn(companyEarningsDetails);
        const mostAnticipatedEarnings = getMostAnticipated(companyEarningsDetails);
        earningsReport = ReportGenerationService.generateEarningsReport(earningsResult, bestYearlyReturn, mostAnticipatedEarnings);
    }

    await MobilePushService.sendText(
        `Daily financial summary for ${moment().format('ddd MMM DD YYYY')}\n`
    + ipoReport + earningsReport);
}

function getBestYearlyReturn(companies: CompanyMetric[]): CompanyMetric {
    return companies.reduce((currentBest, contender) => {
        return currentBest["52WeekPriceReturnDaily"] > contender["52WeekPriceReturnDaily"] ?
            currentBest : contender
    });
}

function getMostAnticipated(companies: CompanyMetric[]): CompanyMetric {
    return companies.reduce((currentBest, contender) => {
        const contenderAnticipationScore = percentIncrease(contender["3MonthAverageTradingVolume"], contender["10DayAverageTradingVolume"]);
        const currentBestAnticipationScore = percentIncrease(currentBest["3MonthAverageTradingVolume"], currentBest["10DayAverageTradingVolume"]);
        return currentBestAnticipationScore > contenderAnticipationScore ? currentBest : contender;
    });
}

function percentIncrease(baseline: number, comparator: number) {
    return (comparator - baseline) / baseline;
}

exports.handler = init;