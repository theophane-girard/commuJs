import { CommonModule } from '@angular/common';
import { Component, VERSION } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter, map, Observable, tap } from 'rxjs';
import { routes } from '../main';
import { FormComponent } from './form.component';
import { HelloComponent } from './hello.component';
import { MapOperatorComponent } from './map-operator.component';

@Component({
  selector: 'my-app',
  template: `
    <hello name="{{ name }}"></hello>
    <div style="display: flex; justify-content: space-evenly">
      <nav>
        <ul>
          <li *ngFor="let route of routes">
            <a [routerLink]="route.path">{{route.path}}</a>
          </li>
        </ul>
      </nav>
      <div style="display: flex">
        <img [src]="currentExercise$ | async" alt="" />
      </div>
    </div>
    <router-outlet></router-outlet>
  `,
  standalone: true,
  imports: [
    CommonModule,
    HelloComponent,
    FormComponent,
    MapOperatorComponent,
    RouterModule,
  ],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  routes = routes;
  currentExercise$: Observable<string>;
  constructor(private router: Router) {
    this.currentExercise$ = router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      tap((data) => console.log(data)),
      map((data: ActivationEnd) => (data.snapshot.data as any).imgUrl)
    );
  }
}
