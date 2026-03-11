import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-info-contact',
  templateUrl: './info-contact.component.html',
  standalone: true,
  imports: [CommonModule, NzIconModule],
})
export class InfoContactComponent {
  contacts = [
    {
      title: 'Our Location',
      value: 'Binh Thanh, HCM, VN',
      icon: 'environment',
      color: 'bg-blue-500',
    },
    {
      title: 'Call Us',
      value: '+038888888',
      icon: 'phone',
      color: 'bg-gray-500',
    },
    {
      title: 'Email Us',
      value: 'hiepdeptrai@gmail.com',
      icon: 'mail',
      color: 'bg-yellow-500',
    },
  ];
}
