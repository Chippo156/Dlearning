import { Injectable } from '@angular/core';
import { LoginResponse } from '../models/data/login-response.model';
import { LocalStorageKey } from '../models/local-storage-keys.model';

@Injectable({ providedIn: 'root' })
export class AuthStore {
  set credentials(v: LoginResponse) {
    window.localStorage.setItem(LocalStorageKey.CREDENTIALS, JSON.stringify(v));
  }

  get credentials(): any {
    const data = window.localStorage.getItem(LocalStorageKey.CREDENTIALS);
    return data ? JSON.parse(data) : null;
  }

  get token(): string {
    return this.credentials?.token;
  }

  clearUserLogin() {
    localStorage.removeItem(LocalStorageKey.CREDENTIALS);
    localStorage.removeItem(LocalStorageKey.USER_INFO);
  }
}
