import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  tap,
  shareReplay,
  interval,
  Subject,
  switchMap,
  takeUntil,
  take,
  first,
} from 'rxjs';
// <ul>
// <li *ngFor="let completedObs of completedObservables">{{completedObs}}</li>
// </ul>
@Component({
  selector: 'share-replay',
  template: `
    <button (click)="subscribe()">Subscribe</button>
    <button (click)="unsub()">ngDestroy</button>

    <div style="display: flex; justify-content: space-around">
      <div>
        <ul>
          <li>
            <strong>takeUntil()</strong>
            <span *ngIf="isTakeUntilComplete"> 🏁</span>
          </li>
          <li *ngFor="let val of takeUntilValues">{{val}}</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <strong>take(4)</strong>
            <span *ngIf="isTakeComplete"> 🏁</span>
          </li>
          <li *ngFor="let val of takeValues">{{val}}</li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <strong>first()</strong>
            <span *ngIf="isFirstComplete"> 🏁</span>
          </li>
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
  isTakeUntilComplete = false;
  isTakeComplete = false;
  isFirstComplete = false;

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
        complete: () => (this.isTakeUntilComplete = true),
      });

    this.timer$
      .pipe(
        tap((timer) => this.takeValues.push(`timer : ${timer}`)),
        take(4)
      )
      .subscribe({
        complete: () => (this.isTakeComplete = true),
      });

    this.timer$
      .pipe(
        tap((timer) => this.firstValues.push(`timer : ${timer}`)),
        first()
      )
      .subscribe({
        complete: () => (this.isFirstComplete = true),
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
