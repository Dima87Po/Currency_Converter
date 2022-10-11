import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { combineLatest, merge, Subject } from 'rxjs';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})
export class ConverterComponent implements OnInit, OnDestroy {

  @Input()
  currencies!: string[];

  @Input()
  rate!: number;

  @Input()
  activeCurrency!: string;

  @Output() currencyChanged = new EventEmitter<{ from: string, to: string }>();

  form!: FormGroup;

  destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      fromAmount: 0,
      fromCurrency: null,
      toAmount: 0,
      toCurrency: null
    });

    const controlValueChanges =
      (controlName: string) => (this.form.get(controlName) as any).valueChanges.pipe(distinctUntilChanged());

    merge([
      controlValueChanges('fromAmount'),
      controlValueChanges('toAmount'),
    ]).pipe(takeUntil(this.destroy$))
      .subscribe(() => {

        
        (this.form.get('fromAmount') as any).updateValueAndValidity({ emitEvent: false });
        (this.form.get('toAmount') as any).updateValueAndValidity({ emitEvent: false });
      }
    );

    combineLatest([
      controlValueChanges('fromCurrency'),
      controlValueChanges('toCurrency')
    ]).pipe(
      filter(([from, to]: any) => Boolean(from) && Boolean(to)),
      takeUntil(this.destroy$)
    ).subscribe(([from, to]) => this.currencyChanged.emit({ from, to }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
