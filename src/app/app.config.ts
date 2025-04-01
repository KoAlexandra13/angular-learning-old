import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';
import { SearchPipe } from './shared/pipes/search.pipe';
import { CommonModule } from '@angular/common';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    importProvidersFrom(FormsModule),
    importProvidersFrom(ReactiveFormsModule),
    importProvidersFrom(CommonModule),
    importProvidersFrom(RouterModule),
    importProvidersFrom(SearchPipe),
  ]
};