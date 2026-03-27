import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseResponse } from '@shared/models/course-response.model';
import { AuthStore } from '@shared/services/auth-store.service';
import { AuthService } from '@shared/services/auth.service';
import { CourseService } from '@shared/services/course.service';
import { ProfileService } from '@shared/services/profile.service';
// import Swal from 'sweetalert2';

// import { checkPurchase } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css'],
})
export class CourseDetailComponent implements OnInit {
  courseId!: number;

  course!: CourseResponse;
  chapters: any[] = [];

  loading = true;
  isPurchase = false;

  reviews = [
    { name: 'John Brown', review: 'good course' },
    { name: 'Jim Green', review: 'bad course' },
    { name: 'Joe Black', review: 'good course' },
  ];
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private courseService: CourseService,
    private authService: AuthService,
    private authStore: AuthStore
  ) {}

  ngOnInit() {
    document.title = 'Course Detail';

    this.courseId = Number(this.route.snapshot.paramMap.get('id'));

    this.getCourseDetail();
    this.getChapters();
  }

  getChapters() {
    this.courseService.getChapterById(this.courseId).subscribe((res) => {
      if (res) {
        this.chapters = res.chapters || [];
      }
    });
  }

  getCourseDetail() {
    this.courseService.getCourseDetailById(this.courseId).subscribe((res) => {
      if (res.data) {
        this.course = res.data;
        this.loading = false;
        // this.isPurchase = checkPurchase(this.courseId);
      }
    });
  }

  getPointsCurrent() {
    this.authService.getPointsCurrent().subscribe({
      next: (res) => {
        console.log('Current points:', res);
        this.authStore.updatePoints(res.points);
      },
      error: (error) => {
        console.error('Failed to fetch current points:', error);
      },
    });
  }
}
