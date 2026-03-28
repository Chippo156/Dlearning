import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CourseLevel } from '@shared/models/enum/course-level.enum';
import { CourseResponse } from '@shared/models/course-response.model';
import { Pagination } from '@shared/models/request/pagination.model';
import { CourseService } from '@shared/services/course.service';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

@Component({
  selector: 'app-admin-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NzCardModule,
    NzStatisticModule,
    NzProgressModule,
  ],
  templateUrl: './admin-home-page.component.html',
})
export class AdminHomePageComponent implements OnInit {
  loading = false;
  error = '';

  totalCourses = 0;
  loadedCourses: CourseResponse[] = [];
  totalPoints = 0;
  avgDuration = 0;
  topCourseTitle = '-';

  beginnerPercent = 0;
  intermediatePercent = 0;
  advancedPercent = 0;
  expertPercent = 0;

  private readonly pagination: Pagination = {
    currentPage: 1,
    pageSize: 24,
  };

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.loading = true;
    this.error = '';

    this.courseService.getCourses(this.pagination).subscribe({
      next: (res) => {
        const data = res.data;
        this.totalCourses = data.totalElements;
        this.loadedCourses = data.result || [];

        this.totalPoints = this.loadedCourses.reduce(
          (sum, item) => sum + (item.points || 0),
          0
        );

        const totalDuration = this.loadedCourses.reduce(
          (sum, item) => sum + (item.duration || 0),
          0
        );
        this.avgDuration = this.loadedCourses.length
          ? Number((totalDuration / this.loadedCourses.length).toFixed(1))
          : 0;

        const best = [...this.loadedCourses].sort(
          (a, b) => (b.averageRating || 0) - (a.averageRating || 0)
        )[0];
        this.topCourseTitle = best?.title || '-';

        this.beginnerPercent = this.computeLevelPercent(CourseLevel.BEGINNER);
        this.intermediatePercent = this.computeLevelPercent(
          CourseLevel.INTERMEDIATE
        );
        this.advancedPercent = this.computeLevelPercent(CourseLevel.ADVANCED);
        this.expertPercent = this.computeLevelPercent(CourseLevel.EXPERT);

        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load dashboard stats.';
        this.loading = false;
      },
    });
  }

  private computeLevelPercent(level: CourseLevel): number {
    if (!this.loadedCourses.length) {
      return 0;
    }

    const count = this.loadedCourses.filter(
      (course) => course.courseLevel === level
    ).length;
    return Math.round((count * 100) / this.loadedCourses.length);
  }
}
