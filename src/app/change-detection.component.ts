import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ColorPipe } from './color.pipe';
import { ColorService } from './color.service';
import { OnPushComponent } from './on-push.component';
import { interval, map, tap } from 'rxjs';
import { DefaultComponent } from './default.component';

@Component({
  selector: 'change-detection',
  template: `
    <h2>Change detection</h2>
    <h4>[style.background]="getColor()"</h4>
    <section [style.background]="getColor()">
      je suis une section stylée
    </section>
    <ul>
      <li *ngFor="let val of templateFunctionValues">{{val}}</li>
    </ul>

    <h4>ChangeDetectionStrategy.OnPush</h4>
    <on-push (colorChange)="onPushChange($event)"></on-push>
    <ul>
      <li *ngFor="let val of onPushValues">{{val}}</li>
    </ul>

    <h4>ChangeDetectionStrategy.Default</h4>
    <section [style.background]="color$ | async">
      je suis une section stylée
    </section>
    <ul>
      <li *ngFor="let val of defaultValues">{{val}}</li>
    </ul>

    <h4>"red" | colorPipe</h4>
    <section [style.background]="'red' | color">
      je suis une section stylée
    </section>
    <ul>
    <li *ngFor="let val of pipeValues">{{val}}</li>
  </ul>
  `,
  standalone: true,
  imports: [CommonModule, OnPushComponent, ColorPipe, DefaultComponent],
})
export class ChangeDetectionComponent {
  templateFunctionValues = [];
  onPushValues = [];
  defaultValues = [];
  pipeValues = [];
  obsValues = [];
  color$ = interval(1000).pipe(
    tap(() => this.obsValues.push("j'assigne la couleur")),
    map(() => 'red')
  );

  constructor(private colorService: ColorService) {
    this.colorService.colorChange$
      .pipe(tap((val) => this.pipeValues.push(val)))
      .subscribe();
  }

  getColor() {
    this.templateFunctionValues.push("j'assigne la couleur");
    return 'red';
  }

  onPushChange($event) {
    this.onPushValues.push($event);
  }

  defaultChange($event) {
    this.defaultValues.push($event);
  }
}
