import {
  Inject,
  Injectable,
  InjectionToken,
  OnDestroy,
  Optional,
} from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';
import { Subject } from 'rxjs';
import { AuthStore } from './auth-store.service';
import { NotificationResponse } from '@shared/models/data/notification-response.model';

export interface SignalRNotificationConfig {
  hubUrl: string;
}

export const SIGNALR_NOTIFICATION_CONFIG =
  new InjectionToken<SignalRNotificationConfig>('signalr.notification.config');

@Injectable({ providedIn: 'root' })
export class SignalRNotificationService implements OnDestroy {
  private readonly notificationEvent = 'user/queue/notifications';
  private readonly hubUrl: string | null;
  private connection: HubConnection | null = null;
  private connectionStart?: Promise<void>;
  private notificationSubject = new Subject<NotificationResponse>();

  readonly notifications$ = this.notificationSubject.asObservable();

  constructor(
    private authStore: AuthStore,
    @Optional()
    @Inject(SIGNALR_NOTIFICATION_CONFIG)
    config?: SignalRNotificationConfig
  ) {
    this.hubUrl = config?.hubUrl?.trim() || null;
  }

  get isConfigured(): boolean {
    return !!this.hubUrl;
  }

  connect(): Promise<void> {
    if (!this.hubUrl) {
      return Promise.resolve();
    }

    if (this.connection) {
      return this.connectionStart ?? Promise.resolve();
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(this.hubUrl, {
        accessTokenFactory: () => this.authStore.token ?? '',
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    this.connection.on(
      this.notificationEvent,
      (payload: NotificationResponse) => {
        this.notificationSubject.next(payload);
      }
    );

    this.connection.onclose(() => {
      this.connection = null;
    });

    this.connectionStart = this.connection.start().finally(() => {
      this.connectionStart = undefined;
    });

    return this.connectionStart;
  }

  disconnect(): Promise<void> {
    if (!this.connection) {
      return Promise.resolve();
    }

    const current = this.connection;
    this.connection = null;
    current.off(this.notificationEvent);

    return current.stop();
  }

  ngOnDestroy(): void {
    void this.disconnect();
  }
}
