import { CommonModule } from '@angular/common';
import { Component, VERSION } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '../main';
import { FormComponent } from './form.component';
import { HelloComponent } from './hello.component';
import { MapOperatorComponent } from './map-operator.component';

@Component({
  selector: 'my-app',
  template: `
    <hello name="{{ name }}"></hello>
    <nav>
      <ul>
        <li *ngFor="let route of routes">
          <a [routerLink]="route.path">{{route.path}}</a>
        </li>
      </ul>
    </nav>
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
}
