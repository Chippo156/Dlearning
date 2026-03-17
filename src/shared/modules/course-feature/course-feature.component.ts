import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { CourseService } from '@services/course.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-course-feature',
  templateUrl: './course-feature.component.html',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, CommonModule, RouterLink],
})
export class CourseFeatureComponent {
  @Input() course: any;
  @Input() totalLessons = 0;
  @Input() isPurchase = false;
  @Input() courseId!: string;

  isLogin$: Observable<boolean>;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService,
  ) {
    this.isLogin$ = this.authService.isLogin$;
  }

  ngOnInit(): void {
    this.checkCoursePurchased();
  }

  handleAction() {
    if (this.isPurchase) {
      this.router.navigate(['/lesson-detail', this.courseId]);
    } else {
      this.handleEnrollNow();
    }
  }

  handleEnrollNow() {
    this.courseService.buyCourse(this.courseId).subscribe({
      next: (response) => {
        if (response.code == 200) {
        }
      },
      error: (error) => {
        console.error('Enrollment failed:', error);
      },
    });
  }

  checkCoursePurchased() {
    this.courseService.checkPurchase(this.courseId).subscribe({
      next: (response) => {
        if (response.code == 200) {
          this.isPurchase = response.data.purchased;
        }
      },
      error: (error) => {
        console.error('Check purchase failed:', error);
      },
    });
  }
}
