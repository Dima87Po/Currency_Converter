export interface IExchangeRateResponse {
    motd: {
        msg: string;
    };
    base: string;
    rates: {
        [key: string]: number;
    }
    result: number;
} 
