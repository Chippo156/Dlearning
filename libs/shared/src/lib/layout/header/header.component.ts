import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginResponse } from '@shared/models/data/login-response.model';
import { NotificationResponse } from '@shared/models/data/notification-response.model';
import { UserCredentials } from '@shared/models/data/user-credential.model';
import { UserProfile } from '@shared/models/data/user-profile.model';

import { AuthStore } from '@shared/services/auth-store.service';
import { AuthService } from '@shared/services/auth.service';
import { SignalRNotificationService } from '@shared/services/signalr-notification.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable, Subject, takeUntil } from 'rxjs';

interface NotificationItem {
  id: number | string;
  message: string;
  read?: boolean;
  createdAt?: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  points = 150;

  avatar = 'https://i.pravatar.cc/150';

  unreadCount = 0;
  isMenuOpen = false;
  isLogin$!: Observable<boolean>;
  userCredential$: Observable<LoginResponse | null>;
  userProfile$: Observable<UserProfile | null>;
  notifications: NotificationItem[] = [];

  private destroy$ = new Subject<void>();
  private nextNotificationId = 1;

  constructor(
    private authService: AuthService,
    private authStore: AuthStore,
    private notification: NzNotificationService,
    private notificationHub: SignalRNotificationService
  ) {
    this.isLogin$ = this.authService.isLogin$;
    this.userCredential$ = this.authStore.credentials$;
    this.userProfile$ = this.authStore.userProfile$;
  }

  ngOnInit(): void {
    this.isLogin$.pipe(takeUntil(this.destroy$)).subscribe((isLogin) => {
      if (isLogin) {
        void this.notificationHub.connect();
      } else {
        void this.notificationHub.disconnect();
      }
    });

    this.notificationHub.notifications$
      .pipe(takeUntil(this.destroy$))
      .subscribe((payload) => {
        this.pushNotification(payload);
      });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  markAsRead(id: number | string) {
    const target = this.notifications.find((item) => item.id === id);
    if (!target || target.read) {
      return;
    }

    target.read = true;
    this.updateUnreadCount();
  }

  logout() {
    this.authService.logout(this.authStore.token);
    this.notification.success('Logout Success', 'You have been logged out.');
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    void this.notificationHub.disconnect();
  }

  private pushNotification(payload: NotificationResponse) {
    const message =
      (typeof payload === 'string' ? payload : payload?.message) ||
      payload?.title ||
      'New notification';

    const item: NotificationResponse = {
      id: payload.id || this.nextNotificationId++,
      message,
      isRead: payload.isRead,
      senderId: payload.senderId,
      username: payload.username,
      title: payload.title,
      avatarUrl: payload.avatarUrl,
      url: payload.url,
    };

    this.notifications = [item, ...this.notifications].slice(0, 20);
    this.updateUnreadCount();
  }

  private updateUnreadCount() {
    this.unreadCount = this.notifications.filter((item) => !item.read).length;
  }
}
