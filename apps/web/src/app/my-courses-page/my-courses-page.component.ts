import { Component, OnInit } from '@angular/core';
import { BuyCourseResponse } from '@shared/models/data/buy-course-response.model';
import { CourseService } from '@shared/services/course.service';

@Component({
  selector: 'app-my-courses-page',
  templateUrl: './my-courses-page.component.html',
})
export class MyCoursesPageComponent implements OnInit {
  courses: BuyCourseResponse[] = [];
  loading = true;
  errorMessage = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    document.title = 'My Courses';
    window.scrollTo(0, 0);
    this.fetchCourses();
  }

  fetchCourses() {
    this.loading = true;
    this.errorMessage = '';

    this.courseService.getCoursesByUser().subscribe({
      next: (courses) => {
        this.courses = courses || [];
      },
      error: () => {
        this.errorMessage =
          'Cannot load your enrolled courses right now. Please try again.';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
