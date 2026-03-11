import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserCredentials } from '../../models/data/user-credential.model';
import { ApiResponse } from '../../models/api-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  canActivate() {
    const token = this.authService.credentials?.token;
    console.log('====================================');
    console.log(token);
    console.log('====================================');
    if (!token) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return this.authService.introspect(token).pipe(
      map((res: any) => {
        if (res.data.valid) {
          this.authService.saveUserProfile(res.data);
          return true;
        }

        this.router.navigate(['/login']);
        return false;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      }),
    );
  }
}
