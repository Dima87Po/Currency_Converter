import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CurrencyApiService } from './shared/services/currency.api.service'; 
import { IExchangeConvertRatesResponse, IExchangeRateResponse } from './shared/model/exchange.rate.model';
import { Rate } from './shared/model/rate.model';

export const DEFUALT_CURRENCY = 'UAH';
export const HEADER_CURRENCIES = ['USD', 'EUR'];
export const CURRENCIES = ['USD', 'EUR', 'UAH'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  rate: number = 1;
  rates$!: Observable<Rate[]>;

  currenciesToDisplay: string[] = HEADER_CURRENCIES;
  currenciesToConvert: string[] = CURRENCIES;
  defaultCurrency = DEFUALT_CURRENCY;

  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.rates$ = this.currencyApiService.getCurrencyRates(this.defaultCurrency).pipe(
      map((res: IExchangeConvertRatesResponse) => {
        return this.currenciesToDisplay.reduce((acc: any, next) => {
          return [...acc, { value: 1 / res.rates[next], displayName: next }];
        }, []);
      }),
    );
  }

  constructor(
    private currencyApiService: CurrencyApiService
  ) { }

  loadRate(event: { from: string; to: string }): void {
    this.currencyApiService.getRate(event.from, event.to)
      .pipe(takeUntil(this.destroy$))
      .subscribe((rate: number) => {
        this.rate = rate;
      });
  }
}

