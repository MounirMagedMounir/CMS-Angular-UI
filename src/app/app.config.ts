import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { tokenInterceptor } from './core/interceptor/token.interceptor';
import { refreshTokenInterceptor } from './core/interceptor/refresh-token.interceptor';
import { AuthenticationService } from './core/services/authentication/authentication.service';
import { MessageService } from 'primeng/api';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(), 
    provideAnimationsAsync(),
    provideAppInitializer(() => {inject(AuthenticationService).initializeAuthentication();inject(MessageService)}),
    provideHttpClient(
      withInterceptors([refreshTokenInterceptor, tokenInterceptor])
    ),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),MessageService
  ],
};
