import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-course-page-header',
  templateUrl: './course-page-header.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CoursePageHeaderComponent {
  @Input() totalElements = 0;
  @Input() keyword = '';
  @Input() option = '0';

  get sortLabel(): string {
    if (this.option === '1') {
      return 'Most Popular';
    }
    if (this.option === '2') {
      return 'Highest Rated';
    }
    if (this.option === '3') {
      return 'Newest';
    }
    if (this.option === '4') {
      return 'Oldest';
    }
    return 'All Courses';
  }
}
