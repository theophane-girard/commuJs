import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ChangeDetectionComponent } from './app/change-detection.component';
import { FormComponent } from './app/form.component';
import { MapOperatorComponent } from './app/map-operator.component';
import { ShareReplayComponent } from './app/share-replay.component';
import { TypesComponent } from './app/types.component';
import { UnsubscribeComponent } from './app/unsubscribe.component';
import './polyfills';

export const routes: Routes = [
  {
    path: 'form-change',
    component: FormComponent,
    data: {
      imgUrl: 'https://zupimages.net/up/23/06/evxr.png',
    },
  },
  {
    path: 'map-operator',
    component: MapOperatorComponent,
    data: {
      imgUrl: 'https://zupimages.net/up/23/07/42sy.png',
    },
  },
  {
    path: 'share-replay',
    component: ShareReplayComponent,
    data: {
      imgUrl: 'https://zupimages.net/up/23/07/u9z4.png',
    },
  },
  {
    path: 'unsubscribe',
    component: UnsubscribeComponent,
    data: {
      imgUrl: 'https://zupimages.net/up/23/07/jm5o.png',
    },
  },
  {
    path: 'type-utils',
    component: TypesComponent,
    data: {
      imgUrl: 'https://zupimages.net/up/23/07/e1ze.png',
    },
  },
  // {
  //   path: 'change-detection',
  //   component: ChangeDetectionComponent,
  //   data: {
  //     imgUrl: '',
  //   },
  // },
];
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(routes))],
});
