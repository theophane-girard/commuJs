import { CommonModule } from '@angular/common';
import { Component, VERSION } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ActivationEnd,
  Router,
  RouterModule,
} from '@angular/router';
import { filter, map, Observable, shareReplay, tap } from 'rxjs';
import { routes } from '../main';
import { FormComponent } from './containers/form.component';
import { HelloComponent } from './ui/hello.component';
import { MapOperatorComponent } from './containers/map-operator.component';

@Component({
  selector: 'my-app',
  template: `
    <hello name="{{ title$ | async }}"/>
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
    <router-outlet />
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
  title$;
  routes = routes;
  currentExercise$: Observable<string>;
  routeChange$ = this.router.events.pipe(
    filter((event) => event instanceof ActivationEnd),
    shareReplay()
  );
  constructor(private router: Router) {
    this.currentExercise$ = this.routeChange$.pipe(
      map((data: ActivationEnd) => (data.snapshot.data as any).imgUrl)
    );
    this.title$ = this.routeChange$.pipe(
      map((data: ActivationEnd) => data.snapshot.title)
    );
  }
}
