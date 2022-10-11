import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CoinsService } from 'src/app/shared/services/currency.api.service';
import { IExchangeRateResponse } from './shared/model/exchange.rate.model';

export const DEFUALT_CURRENCY = 'UAH';
export const CURRENCIES = ['USD', 'EUR', 'UAH'];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rate: number = 1;
  rates$!: Observable<IExchangeRateResponse>;
  currenciesToDisplay = CURRENCIES;
  defaultCurrency = DEFUALT_CURRENCY;

  destroy$ = new Subject<void>();

  ngOnInit() {
    this.rates$ = this.coinsService.getCurrencyRate(this.defaultCurrency).pipe(
      map((res) => {
        return this.currenciesToDisplay.reduce((acc: any, next) => {
          return [...acc, { value: 1 / res.rates[next], displayName: next }]
        }, [])
      })
    )
  }

  constructor(private coinsService: CoinsService) { }

  loadRate(event: { from: string; to: string }) {
    this.coinsService.getRate(event.from, event.to)
      .pipe(takeUntil(this.destroy$))
      .subscribe((rate: number) => {
        this.rate = rate
      });
  }
}

