import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExchangeRateResponse, IExchangeConvertRatesResponse } from '../model/exchange.rate.model';

@Injectable({ providedIn: 'root' })
export class CurrencyApiService {

  BASE_URL = 'https://api.exchangerate.host';

  constructor(
    private http: HttpClient
  ) {}

  getCurrencyRates(defaultCurrency: string): Observable<IExchangeConvertRatesResponse> {
    return this.http.get<IExchangeConvertRatesResponse>(`${this.BASE_URL}/latest?base=${defaultCurrency}`);
  }

  getRate(from: string, to: string): Observable<number> {
    return this.http.get<IExchangeRateResponse>(`${this.BASE_URL}/convert?from=${from}&to=${to}`).pipe(
      map((res: IExchangeRateResponse) => res.result),
    );
  }
}
