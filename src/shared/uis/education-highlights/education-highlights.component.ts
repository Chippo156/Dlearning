import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
@Component({
  selector: 'app-education-highlights',
  templateUrl: './education-highlights.component.html',
  standalone: true,
  imports: [NzIconModule],
})
export class EducationHighlightsComponent implements OnInit {
  subjects = 0;
  courses = 0;
  teachers = 0;
  students = 0;

  ngOnInit(): void {
    this.animateCounter(1234, (value) => (this.subjects = value));
    this.animateCounter(3456, (value) => (this.courses = value));
    this.animateCounter(7890, (value) => (this.teachers = value));
    this.animateCounter(5678, (value) => (this.students = value));
  }

  animateCounter(end: number, callback: (v: number) => void) {
    let start = 0;
    const duration = 3000;
    const stepTime = 30;

    const step = Math.ceil(end / (duration / stepTime));

    const interval = setInterval(() => {
      start += step;

      if (start >= end) {
        start = end;
        clearInterval(interval);
      }

      callback(start);
    }, stepTime);
  }
}
