import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes'; // Changed from 'routes' to 'APP_ROUTES'
import { jwtInterceptor } from './services/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideRouter(APP_ROUTES) // Use APP_ROUTES here
  ]
};