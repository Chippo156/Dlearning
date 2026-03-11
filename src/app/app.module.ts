import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { HTTP_BASE_SERVICE_CONFIG } from '../services/http-base.service';
import { ApiInterceptor } from '../interceptors/api.interceptor';
import { NZ_CONFIG, NzConfig } from 'ng-zorro-antd/core/config';
import { HeaderModule } from '../shared/layout/header/header.module';
import { TopBarModule } from '../shared/layout/top-bar/top-bar.module';
import { FooterComponent } from '../shared/layout/footer/footer.component';
import { BannerComponent } from '../shared/layout/banner/banner.component';
import { NzIconTestModule } from 'ng-zorro-antd/icon/testing';

registerLocaleData(en);
const ngZorroConfig: NzConfig = {
  button: { nzSize: 'large' },
  notification: { nzDuration: 3000, nzPlacement: 'bottomRight' },
  message: { nzDuration: 3000 },
};

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
    NzIconTestModule,
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
      provide: 'API_CONFIG',
      useValue: {
        baseUrl: environment.apiConfig?.base,
      },
    },
    { provide: NZ_I18N, useValue: en_US },
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
