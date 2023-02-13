import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import {
  count,
  of,
  map,
  tap,
  shareReplay,
  interval,
  Subject,
  switchMap,
  takeUntil,
  take,
  first,
} from 'rxjs';

@Component({
  selector: 'share-replay',
  template: `
    <button (click)="subscribe()">Subscribe</button>
    <button (click)="unsub()">ngDestroy</button>
    <ul>
      <li *ngFor="let completedObs of completedObservables">{{completedObs}}</li>
    </ul>
    <div style="display: flex; justify-content: space-around">
      <div>
        <ul>
          <li><strong>takeUntil()</strong></li>
          <li *ngFor="let val of takeUntilValues">{{val}}</li>
        </ul>
      </div>
      <div>
        <ul>
          <li><strong>take(4)</strong></li>
          <li *ngFor="let val of takeValues">{{val}}</li>
        </ul>
      </div>
      <div>
        <ul>
          <li><strong>first()</strong></li>
          <li *ngFor="let val of firstValues">{{val}}</li>
        </ul>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class UnsubscribeComponent {
  takeUntilValues = [];
  takeValues = [];
  firstValues = [];
  completedObservables = [];

  subject$ = new Subject<number>();
  destroy$ = new Subject<void>();
  timer$ = this.subject$.pipe(
    switchMap(() => interval(1000)),
    shareReplay()
  );

  constructor() {
    this.timer$
      .pipe(
        tap((timer) => this.takeUntilValues.push(`timer : ${timer}`)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        complete: () =>
          this.completedObservables.push(`Observable completed : takeUntil()`),
      });
    this.timer$
      .pipe(
        tap((timer) => this.takeValues.push(`timer : ${timer}`)),
        take(4)
      )
      .subscribe({
        complete: () =>
          this.completedObservables.push(`Observable completed : take(4)`),
      });
    this.timer$
      .pipe(
        tap((timer) => this.firstValues.push(`timer : ${timer}`)),
        first()
      )
      .subscribe({
        complete: () =>
          this.completedObservables.push(`Observable completed : first()`),
      });
  }

  unsub() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  subscribe() {
    this.subject$.next(1);
  }
}
