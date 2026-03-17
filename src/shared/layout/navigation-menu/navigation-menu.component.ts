import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
interface MenuItem {
  label: string;
  path: string;
}
@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.less',
  standalone: true,
  imports: [NzButtonModule, RouterModule, CommonModule],
})
export class NavigationMenuComponent {
  constructor() {}

  menus: MenuItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Certificate', path: '/certificates' },
    { label: 'Courses', path: '/courses' },
    { label: 'Community', path: '/community' },
    { label: 'Contact', path: '/contact' },
    { label: 'About', path: '/about' },
  ];
}
