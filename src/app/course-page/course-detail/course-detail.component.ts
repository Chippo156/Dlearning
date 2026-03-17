import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseResponse } from '@models/course-response.model';
import { CourseService } from '@services/course.service';
// import Swal from 'sweetalert2';

// import { checkPurchase } from 'src/app/services/enrollment.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
})
export class CourseDetailComponent implements OnInit {
  courseId!: string;

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
    private courseService: CourseService,
  ) {}

  ngOnInit() {
    document.title = 'Course Detail';

    this.courseId = this.route.snapshot.paramMap.get('id')!;

    this.getCourseDetail();
    this.getChapters();
  }

  getChapters() {
    this.courseService.getChapterById(this.courseId).subscribe((res) => {
      if (res.data) {
        this.chapters = res.data;
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

  handleEnrollNow() {
    this.courseService.buyCourse(this.courseId).subscribe((res) => {
      if (res.code == 200) {
        console.log('Success');
      } else {
      }
    });
  }
}
