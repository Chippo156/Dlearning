import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { CommonModule, registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HTTP_BASE_SERVICE_CONFIG } from '@shared/services/http-base.service';
import { SIGNALR_NOTIFICATION_CONFIG } from '@shared/services/signalr-notification.service';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { HeaderModule } from '@shared/layout/header/header.module';
import { TopBarModule } from '@shared/layout/top-bar/top-bar.module';
import { FooterComponent } from '@shared/layout/footer/footer.component';
import { BannerComponent } from '@shared/layout/banner/banner.component';
import { NzIconModule, NZ_ICONS } from 'ng-zorro-antd/icon';
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
  PictureTwoTone,
} from '@ant-design/icons-angular/icons';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { ApiInterceptor } from '../interceptors/api.interceptor';

registerLocaleData(en);
const ngZorroConfig: NzConfig = {
  button: { nzSize: 'large' },
  notification: { nzDuration: 3000, nzPlacement: 'bottomRight' },
  message: { nzDuration: 3000 },
};

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
  PictureTwoTone,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    RouterModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HeaderModule,
    TopBarModule,
    FooterComponent,
    BannerComponent,
    NzIconModule,
    CommonModule,
  ],
  bootstrap: [AppComponent],
  providers: [
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
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_ICONS, useValue: icons },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    { provide: NZ_CONFIG, useValue: ngZorroConfig },

    provideAnimationsAsync(),
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
