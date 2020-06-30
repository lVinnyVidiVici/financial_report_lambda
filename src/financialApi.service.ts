import * as request from 'request-promise';
import {
    CompanyMetric, CompanyMetricResponse,
    EarningsCalendarResponse,
    EarningsEvent,
    IpoCalendarResponse,
    IpoEvent
} from "./types/apiResponse";

export class FinancialApiService {

    private static readonly BASE_URL = 'https://finnhub.io/api/v1';
    private static readonly API_KEY = 'brqbinnrh5rc4v2pjthg';

    static getIpoData(startDate: string, endDate: string): Promise<IpoEvent[]> {
        const options = this.buildRequestOptions(
            {
                from: startDate,
                to: endDate
            });
        return request.get(`${this.BASE_URL}/calendar/ipo`, options)
            .then((response: IpoCalendarResponse) => {
                return response.ipoCalendar;
            })
            .catch((error) => {
                console.error(`Couldn't Retrieve IPO Data: ${error}`);
            });
    }

    static getEarningsData(startDate: string, endDate: string, symbol?: string): Promise<EarningsEvent[]> {
        let options = this.buildRequestOptions(
            {
                from: startDate,
                to: endDate,
                symbol: symbol
            });

        return request.get(`${this.BASE_URL}/calendar/earnings`, options)
            .then((response: EarningsCalendarResponse) => {
                return response.earningsCalendar;
            })
            .catch((error) => {
                console.error(`Couldn't Retrieve Earnings Data: ${error}`);
            });
    }

    static getCompanyMetrics(symbol: string): Promise<CompanyMetric> {
        let options = this.buildRequestOptions({ symbol: symbol });

        return request.get(`${this.BASE_URL}/stock/metric`, options)
            .then((response: CompanyMetricResponse) => {
                Object.assign(response.metric, { symbol: symbol }); // Tie Metric to the company
                return response.metric;
            })
            .catch((error) => {
                console.error(`Couldn't Retrieve Metric Data: ${error}`);
            })
    }

    private static buildRequestOptions(queryString: object): FinancialRequestOptions {
        return {
            qs: Object.assign(queryString, { token: this.API_KEY }),
            json: true
        }
    }
}

interface FinancialRequestOptions {
    qs: {
        token: string;
        from?: string;
        to?: string;
        symbol?: string; // Unique stock symbol i.e. TSLA
    },
    json: boolean;
}