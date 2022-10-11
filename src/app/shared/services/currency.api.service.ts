import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IExchangeRateResponse } from '../model/exchange.rate.model';

@Injectable({ providedIn: 'root' })
export class CoinsService {

  BASE_URL = 'https://api.exchangerate.host';

  constructor(private http: HttpClient) {
  }

  getCurrencyRate(defaultCurrency: string): Observable<IExchangeRateResponse> {
    return this.http.get<IExchangeRateResponse>(`${this.BASE_URL}/latest?base=${defaultCurrency}`);
  }

  getRate(from: any, to: any) {
    return this.http.get<IExchangeRateResponse>(`${this.BASE_URL}/convert?from=${from}&to=${to}`).pipe(
      map((res) => res.result)
    );
  }



}
