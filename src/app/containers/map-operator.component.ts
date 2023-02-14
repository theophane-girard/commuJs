import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  interval,
  of,
  delay,
  switchMap,
  concatMap,
  map,
  mergeMap,
  from,
  distinctUntilChanged,
  debounceTime,
  shareReplay,
  tap,
  exhaustMap,
} from 'rxjs';

@Component({
  selector: 'map-operator',
  standalone: true,
  template: `
  <form [formGroup]="form">
    <input formControlName="textField"/>
  </form>
  <h4>SwitchMap</h4>
  <ul>
    <li *ngFor="let req of switchMap$ | async">Envoie de la valeur : {{req}}</li>
  </ul>
  <h4>mergeMap</h4>
  <ul>
    <li *ngFor="let req of mergeMap$ | async">Envoie de la valeur : {{req}}</li>
  </ul>
  <h4>exhaustMap</h4>
  <ul>
    <li *ngFor="let req of exhaustMap$ | async">Envoie de la valeur : {{req}}</li>
  </ul>
  <h4>concatMap</h4>
  <ul>
    <li *ngFor="let req of concatMap$ | async">Envoie de la valeur : {{req}}</li>
  </ul>
  `,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
})
export class MapOperatorComponent {
  switchMapRequests = [];
  mergeMapRequests = [];
  exhaustMapRequests = [];
  concatMapRequests = [];
  form: FormGroup = new FormGroup({
    textField: new FormControl(''),
  });

  valueChange$ = this.form.controls['textField'].valueChanges.pipe(
    map((val) => this.obsWithDelay(val)),
    shareReplay()
  );

  switchMap$ = this.valueChange$.pipe(
    switchMap((val) => val),
    map((val) => this.updateRequests(this.switchMapRequests, val))
  );
  mergeMap$ = this.valueChange$.pipe(
    mergeMap((val) => val),
    map((val) => this.updateRequests(this.mergeMapRequests, val))
  );
  exhaustMap$ = this.valueChange$.pipe(
    exhaustMap((val) => val),
    map((val) => this.updateRequests(this.exhaustMapRequests, val))
  );
  concatMap$ = this.valueChange$.pipe(
    concatMap((val) => val),
    map((val) => this.updateRequests(this.concatMapRequests, val))
  );

  updateRequests(requests: any[], value) {
    requests.push(value);
    return requests;
  }

  obsWithDelay(val) {
    return of(val).pipe(delay(Math.random() * 1000));
  }
}
