/* IPO */
export interface IpoCalendarResponse {
    ipoCalendar: IpoEvent[];
}

export interface IpoEvent {
    date: string,
    exchange: string,
    name: string,
    numberOfShares: number,
    price: string;
    status: IpoStatus;
    symbol: string;
    totalSharesValue: number;
}

export enum IpoStatus {
    EXPECTED = 'expected',
    PRICED = 'priced',
    WITHDRAWN = 'withdrawn',
    FILED = 'filed'
}

/* Earnings */
export interface EarningsCalendarResponse {
    earningsCalendar: EarningsEvent[];
}

export interface EarningsEvent {
    date: string,
    epsActual: number,
    epsEstimate: number,
    hour: string,
    quarter: number,
    revenueActual: number,
    revenueEstimate: number,
    symbol: string,
    year: number
}

export interface CompanyMetricResponse {
    metric: CompanyMetric;
    metricType: MetricType;
    symbol: string;
}

export enum MetricType {
    ALL = "all",
    PRICE = "price",
    VALUATION = "valuation",
    MARGIN = "margin"
}

export interface CompanyMetric {
    "10DayAverageTradingVolume": number;
    "13WeekPriceReturnDaily": number;
    "26WeekPriceReturnDaily": number;
    "3MonthAverageTradingVolume": number;
    "52WeekHigh": number;
    "52WeekHighDate": string;
    "52WeekLow": number;
    "52WeekLowDate": string;
    "52WeekPriceReturnDaily": number;
    "5DayPriceReturnDaily": number;
    "beta": number;
    "marketCapitalization": number;
    "symbol"?: string; // Not part of API response, added at runtime
}