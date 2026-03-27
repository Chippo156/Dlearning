import { Component } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-instructors-section',
  templateUrl: './instructors-section.component.html',
  imports: [NzCardModule, NzIconModule, RouterModule, CommonModule],
  standalone: true,
})
export class InstructorsSectionComponent {
  instructors = [
    {
      name: 'Chippo Designer',
      role: 'Web Designer & Developer',
      image: 'assets/img/instructor1.jpg',
    },
    {
      name: 'Chippo Designer',
      role: 'Web Designer & Developer',
      image: 'assets/img/instructor2.jpg',
    },
    {
      name: 'Chippo Designer',
      role: 'Web Designer & Developer',
      image: 'assets/img/instructor3.jpg',
    },
    {
      name: 'Chippo Designer',
      role: 'Web Designer & Developer',
      image: 'assets/img/instructor4.jpg',
    },
  ];
}
