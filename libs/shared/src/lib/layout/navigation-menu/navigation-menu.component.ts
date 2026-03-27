import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginResponse } from '@shared/models/data/login-response.model';
import { AuthStore } from '@shared/services/auth-store.service';
import { AuthService } from '@shared/services/auth.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.less',
  standalone: true,
  imports: [NzButtonModule, RouterModule, CommonModule],
})
export class NavigationMenuComponent {
  userCredential$: Observable<LoginResponse | null>;
  constructor(private authStore: AuthStore) {
    console.log(this.authStore.credentials$);

    this.userCredential$ = this.authStore.credentials$;
  }
}
