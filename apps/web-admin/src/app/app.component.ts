import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface AdminNavItem {
  label: string;
  route: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'web-admin';

  navItems: AdminNavItem[] = [
    { label: 'Dashboard', route: '/home' },
    { label: 'Course CRUD', route: '/courses' },
    { label: 'Login', route: '/login' },
  ];
}
