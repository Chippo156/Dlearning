import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-feedback-section',
  templateUrl: './feedback-section.component.html',
  standalone: true,
  imports: [NzCarouselModule, NzIconModule, CommonModule],
})
export class FeedbackSectionComponent {
  feedbacks = [
    {
      name: 'John Doe',
      role: 'Web Design',
      image:
        'https://i.pinimg.com/236x/a6/ea/90/a6ea9049f7863e397a5792d4993c09b4.jpg',
      message:
        'Sed et elitr ipsum labore dolor diam, ipsum duo vero sed sit est est ipsum eos clita est ipsum.',
    },
    {
      name: 'Student Name',
      role: 'Web Design',
      image:
        'https://i.pinimg.com/236x/70/99/d0/7099d0e9baa592129218b840e007edb3.jpg',
      message:
        'Sed et elitr ipsum labore dolor diam, ipsum duo vero sed sit est est ipsum eos clita est ipsum.',
    },
    {
      name: 'Student Name',
      role: 'Web Design',
      image:
        'https://i.pinimg.com/236x/ee/86/34/ee8634272b8b54442899975e21fef87a.jpg',
      message:
        'Sed et elitr ipsum labore dolor diam, ipsum duo vero sed sit est est ipsum eos clita est ipsum.',
    },
    {
      name: 'Student Name',
      role: 'Web Design',
      image:
        'https://i.pinimg.com/236x/fc/f8/1f/fcf81f6542f9f7cb44ba9e5e4cd3d08c.jpg',
      message:
        'Sed et elitr ipsum labore dolor diam, ipsum duo vero sed sit est est ipsum eos clita est ipsum.',
    },
  ];
}
