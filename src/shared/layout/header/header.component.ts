import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  points = 150;

  avatar = 'https://i.pravatar.cc/150';

  unreadCount = 3;

  notifications = [
    { id: 1, message: 'New course available' },
    { id: 2, message: 'Your lesson updated' },
    { id: 3, message: 'New message from teacher' },
  ];

  markAsRead(id: number) {
    console.log('read notification', id);
  }

  handleLogout() {
    console.log('logout');
  }
}
