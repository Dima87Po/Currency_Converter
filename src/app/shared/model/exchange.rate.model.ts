export interface IExchangeBaseResponse {
    motd: {
        msg: string;
    };
    success: boolean;
}

export interface IExchangeRateResponse extends IExchangeBaseResponse {
    base: string;
    result: number;
} 

export interface IExchangeConvertRatesResponse  extends IExchangeBaseResponse {
    rates: {
        [key: string]: number;
    }
    result: number;
} 
