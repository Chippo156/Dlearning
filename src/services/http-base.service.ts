import { Injectable, InjectionToken, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const HTTP_BASE_SERVICE_CONFIG = new InjectionToken<{ baseUrl: string }>(
  'http-base.service.config',
);

@Injectable({ providedIn: 'root' })
export class HttpBaseService {
  protected readonly baseUrl: string;

  constructor(
    protected http: HttpClient,
    protected injector: Injector,
  ) {
    this.baseUrl = this.injector.get(HTTP_BASE_SERVICE_CONFIG).baseUrl;
  }
}
