import { inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from '@shared/services/auth.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private notification = inject(NzNotificationService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.credentials?.token;

    if (
      token &&
      !req.url.includes('/sign-in') &&
      !req.url.includes('/register')
    ) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let message = 'Something went wrong';

        if (error.error?.message) {
          message = error.error.message;
        }

        this.notification.error(`Error ${error.status}`, message);

        return throwError(() => error);
      })
    );
  }
}
