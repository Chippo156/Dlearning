import { ApplicationConfig } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { HTTP_BASE_SERVICE_CONFIG } from '@shared/services/http-base.service';
import { SIGNALR_NOTIFICATION_CONFIG } from '@shared/services/signalr-notification.service';
import { environment } from '../environments/environment';
import { ApiInterceptor } from '../interceptors/api.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(appRoutes),
    provideHttpClient(withInterceptorsFromDi()),

    {
      provide: HTTP_BASE_SERVICE_CONFIG,
      useValue: {
        baseUrl: environment.apiConfig.base,
      },
    },
    {
      provide: SIGNALR_NOTIFICATION_CONFIG,
      useValue: {
        hubUrl: environment.signalR.userQueueNotificationsHub,
      },
    },
    {
      provide: 'API_CONFIG',
      useValue: {
        baseUrl: environment.apiConfig?.base,
      },
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
};
