import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { CourseService } from '@shared/services/course.service';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Observable } from 'rxjs';
import { ProfileService } from '@shared/services/profile.service';
import { CourseResponse } from '@shared/models/course-response.model';

@Component({
  selector: 'app-course-feature',
  templateUrl: './course-feature.component.html',
  standalone: true,
  imports: [NzButtonModule, NzIconModule, CommonModule, RouterLink],
})
export class CourseFeatureComponent {
  @Input() course!: CourseResponse;
  @Input() totalLessons = 0;
  @Input() isPurchase = false;
  @Input() courseId!: number;

  @Output() onEnrollSuccess = new EventEmitter<void>();

  isLogin$: Observable<boolean>;

  constructor(
    private router: Router,
    private courseService: CourseService,
    private authService: AuthService,
    private notification: NzNotificationService,
    private profileService: ProfileService
  ) {
    this.isLogin$ = this.authService.isLogin$;
  }

  ngOnInit(): void {
    this.checkCoursePurchased();
  }

  handleAction() {
    if (this.isPurchase) {
      this.router.navigate(['/learning', this.courseId]);
    } else {
      this.handleEnrollNow();
    }
  }

  handleEnrollNow() {
    this.courseService.buyCourse(this.courseId).subscribe({
      next: () => {
        this.notification.success(
          'Enrollment Successful',
          'You have successfully enrolled in the course.'
        );
        this.onEnrollSuccess.emit();
      },
      error: (error) => {
        this.notification.error(
          'Enrollment Failed',
          'Failed to enroll in the course.'
        );
        console.error('Enrollment failed:', error);
      },
      complete: () => {
        this.checkCoursePurchased();
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
