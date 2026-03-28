import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginResponse } from '@shared/models/data/login-response.model';
import { UserProfile } from '@shared/models/data/user-profile.model';
import { AuthService } from '@shared/services/auth.service';
import { AuthStore } from '@shared/services/auth-store.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzButtonModule } from 'ng-zorro-antd/button';

interface AdminNavItem {
  label: string;
  route: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, NzButtonModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private authService = inject(AuthService);
  private authStore = inject(AuthStore);
  private notification = inject(NzNotificationService);

  title = 'web-admin';

  navItems: AdminNavItem[] = [
    { label: 'Dashboard', route: '/home' },
    { label: 'Courses', route: '/courses' },
    { label: 'Chapters', route: '/chapters' },
    { label: 'Lessons', route: '/lessons' },
  ];

  isMenuOpen = false;
  isLogin$!: Observable<boolean>;
  userCredential$: Observable<LoginResponse | null>;
  userProfile$: Observable<UserProfile | null>;

  constructor() {
    this.isLogin$ = this.authService.isLogin$;
    this.userCredential$ = this.authStore.credentials$;
    this.userProfile$ = this.authStore.userProfile$;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  logout() {
    this.authService.logout(this.authStore.token);
    this.notification.success('Logout Success', 'You have been logged out.');
  }
}
