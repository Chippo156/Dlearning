import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HTTP_BASE_SERVICE_CONFIG } from '@shared/services/http-base.service';
import { SIGNALR_NOTIFICATION_CONFIG } from '@shared/services/signalr-notification.service';
import { environment } from './environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations'; // ✅ THÊM
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import {
  BarChartOutline,
  BellOutline,
  BookOutline,
  CheckCircleFill,
  ClockCircleOutline,
  CloseCircleFill,
  CodeOutline,
  DollarCircleOutline,
  EditOutline,
  EnvironmentOutline,
  FacebookOutline,
  FilterOutline,
  GlobalOutline,
  GoldOutline,
  HeartOutline,
  InstagramOutline,
  LeftOutline,
  LinkedinOutline,
  LockOutline,
  LogoutOutline,
  MailOutline,
  PhoneOutline,
  PictureOutline,
  PlayCircleOutline,
  PlusCircleOutline,
  PlusOutline,
  RightOutline,
  SafetyCertificateOutline,
  SendOutline,
  SettingOutline,
  SmileOutline,
  TeamOutline,
  TrophyOutline,
  TwitterOutline,
  UserOutline,
  VideoCameraOutline,
  WalletOutline,
  YoutubeOutline,
  MenuOutline,
} from '@ant-design/icons-angular/icons';
import { ApiInterceptor } from './interceptors/api.interceptor';

const icons: IconDefinition[] = [
  BarChartOutline,
  BellOutline,
  BookOutline,
  CheckCircleFill,
  ClockCircleOutline,
  CloseCircleFill,
  CodeOutline,
  DollarCircleOutline,
  EditOutline,
  EnvironmentOutline,
  FacebookOutline,
  FilterOutline,
  GlobalOutline,
  GoldOutline,
  HeartOutline,
  { ...HeartOutline, name: 'heart-o' },
  InstagramOutline,
  LeftOutline,
  LinkedinOutline,
  LockOutline,
  LogoutOutline,
  MailOutline,
  PhoneOutline,
  PictureOutline,
  PlayCircleOutline,
  PlusCircleOutline,
  PlusOutline,
  RightOutline,
  SafetyCertificateOutline,
  SendOutline,
  SettingOutline,
  SmileOutline,
  TeamOutline,
  TrophyOutline,
  TwitterOutline,
  UserOutline,
  VideoCameraOutline,
  WalletOutline,
  YoutubeOutline,
  MenuOutline,
];

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    { provide: NZ_ICONS, useValue: icons },
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
});
