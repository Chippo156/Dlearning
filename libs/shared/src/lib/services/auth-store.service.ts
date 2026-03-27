import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/data/login-response.model';
import { LocalStorageKey } from '../models/local-storage-keys.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  userProfile$ = new BehaviorSubject<any>(this.userProfile);
  credentials$ = new BehaviorSubject<LoginResponse | null>(this.credentials);

  set credentials(v: LoginResponse) {
    window.localStorage.setItem(LocalStorageKey.CREDENTIALS, JSON.stringify(v));
    this.credentials$.next(v);
  }

  get credentials(): any {
    const data = window.localStorage.getItem(LocalStorageKey.CREDENTIALS);
    return data ? JSON.parse(data) : null;
  }

  set userProfile(v: any) {
    window.localStorage.setItem(LocalStorageKey.USER_INFO, JSON.stringify(v));
    this.userProfile$.next(v);
  }

  get userProfile() {
    const data = window.localStorage.getItem(LocalStorageKey.USER_INFO);
    return data ? JSON.parse(data) : null;
  }

  get token(): string {
    return this.credentials?.token;
  }

  updatePoints(points: number) {
    const currentProfile = this.userProfile;
    if (currentProfile) {
      const updatedProfile = { ...currentProfile, points };
      this.userProfile = updatedProfile;
    }
    window.localStorage.setItem(
      LocalStorageKey.USER_INFO,
      JSON.stringify(this.userProfile)
    );
    this.userProfile$.next(this.userProfile);
  }

  resetCredentials() {
    window.localStorage.removeItem(LocalStorageKey.CREDENTIALS);
    window.localStorage.removeItem(LocalStorageKey.USER_INFO);
    this.credentials$.next(null);
    this.userProfile$.next(null);
  }

  clearUserLogin() {
    localStorage.removeItem(LocalStorageKey.CREDENTIALS);
    localStorage.removeItem(LocalStorageKey.USER_INFO);
    this.credentials$.next(null);
    this.userProfile$.next(null);
  }
}
