import { Component } from '@angular/core';
import { LoginResponse } from '@shared/models/data/login-response.model';
import { UserCredentials } from '@shared/models/data/user-credential.model';
import { UserProfile } from '@shared/models/data/user-profile.model';

import { AuthStore } from '@shared/services/auth-store.service';
import { AuthService } from '@shared/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  points = 150;

  avatar = 'https://i.pravatar.cc/150';

  unreadCount = 3;
  isMenuOpen = false;
  isLogin$!: Observable<boolean>;
  userCredential$: Observable<LoginResponse | null>;
  userProfile$: Observable<UserProfile | null>;

  constructor(
    private authService: AuthService,
    private authStore: AuthStore,
    private notification: NzNotificationService
  ) {
    this.isLogin$ = this.authService.isLogin$;
    this.userCredential$ = this.authStore.credentials$;
    this.userProfile$ = this.authStore.userProfile$;
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  notifications = [
    { id: 1, message: 'New course available' },
    { id: 2, message: 'Your lesson updated' },
    { id: 3, message: 'New message from teacher' },
  ];

  markAsRead(id: number) {
    console.log('read notification', id);
  }

  logout() {
    this.authService.logout(this.authStore.token);
    this.notification.success('Logout Success', 'You have been logged out.');
  }
}
