import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

//imported by Nonhlelo
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';
import { NgModule, isDevMode } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';

import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';


//Guard
import { AuthGuard } from '../core/guards/auth.guard';

//debugging imports
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    provideClientHydration(),
    BrowserAnimationsModule,
    BrowserModule,
    provideRouter(routes),
    provideAnimationsAsync(),
    BaseChartDirective,
    MatDialogModule, provideAnimationsAsync(),
    NgModule, provideCharts(withDefaultRegisterables()), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
};
