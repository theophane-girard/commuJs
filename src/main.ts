import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ChangeDetectionComponent } from './app/change-detection.component';
import { FormComponent } from './app/form.component';
import { MapOperatorComponent } from './app/map-operator.component';
import { ShareReplayComponent } from './app/share-replay.component';
import { UnsubscribeComponent } from './app/unsubscribe.component';
import './polyfills';

export const routes: Routes = [
  { path: 'form-change', component: FormComponent },
  { path: 'map-operator', component: MapOperatorComponent },
  { path: 'share-replay', component: ShareReplayComponent },
  { path: 'unsubscribe', component: UnsubscribeComponent },
  { path: 'change-detection', component: ChangeDetectionComponent },
];
bootstrapApplication(AppComponent, {
  providers: [importProvidersFrom(RouterModule.forRoot(routes))],
});
