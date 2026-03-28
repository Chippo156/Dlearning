import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseLevel } from '@shared/models/enum/course-level.enum';
import { CourseResponse } from '@shared/models/course-response.model';
import { CourseCreationRequest } from '@shared/models/request/course-creation.request';
import { Pagination } from '@shared/models/request/pagination.model';
import { CourseService } from '@shared/services/course.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';

@Component({
  selector: 'app-admin-course-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzAlertModule,
    NzTableModule,
    NzTagModule,
    NzEmptyModule,
    NzModalModule,
    NzSpinModule,
  ],
  templateUrl: './admin-course-page.component.html',
})
export class AdminCoursePageComponent implements OnInit {
  readonly courseLevels = Object.values(CourseLevel);

  pagination: Pagination = {
    currentPage: 1,
    pageSize: 10,
  };

  courses: CourseResponse[] = [];
  totalElements = 0;
  selectedCourseId: number | null = null;
  selectedFile: File | null = null;
  selectedVideo: File | null = null;
  loading = false;
  submitting = false;
  isModalVisible = false;
  message = '';
  error = '';

  form = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required]],
    duration: [1, [Validators.required, Validators.min(1)]],
    language: ['', [Validators.required, Validators.maxLength(50)]],
    courseLevel: [CourseLevel.BEGINNER, [Validators.required]],
    points: [0, [Validators.required, Validators.min(0)]],
  });

  constructor(private fb: FormBuilder, private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  get isEditing(): boolean {
    return this.selectedCourseId !== null;
  }

  loadCourses(): void {
    this.loading = true;
    this.error = '';

    this.courseService.getCoursesCaching(this.pagination).subscribe({
      next: (res) => {
        this.courses = res.data.result;
        this.totalElements = res.data.totalElements;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Failed to load courses.';
        this.loading = false;
      },
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] || null;
  }

  onVideoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedVideo = input.files?.[0] || null;
  }

  openCreateModal(): void {
    this.resetForm();
    this.isModalVisible = true;
  }

  closeModal(): void {
    if (this.submitting) {
      return;
    }

    this.isModalVisible = false;
    this.resetForm();
  }

  editCourse(course: CourseResponse): void {
    this.selectedCourseId = course.id;
    this.selectedFile = null;
    this.selectedVideo = null;
    this.message = '';
    this.error = '';

    this.form.patchValue({
      title: course.title,
      description: course.description,
      duration: course.duration,
      language: course.language,
      courseLevel: course.courseLevel,
      points: course.points,
    });

    this.isModalVisible = true;
  }

  resetForm(): void {
    this.selectedCourseId = null;
    this.selectedFile = null;
    this.selectedVideo = null;
    this.message = '';
    this.error = '';

    this.form.reset({
      title: '',
      description: '',
      duration: 1,
      language: '',
      courseLevel: CourseLevel.BEGINNER,
      points: 0,
    });
  }

  submit(): void {
    this.message = '';
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue() as CourseCreationRequest;
    this.submitting = true;

    const action$ = this.isEditing
      ? this.courseService.updateCourse(
          this.selectedCourseId as number,
          payload,
          this.selectedFile,
          this.selectedVideo
        )
      : this.courseService.createCourse(
          payload,
          this.selectedFile,
          this.selectedVideo
        );

    action$.subscribe({
      next: (res) => {
        this.message = res.message || 'Saved successfully.';
        this.submitting = false;
        this.isModalVisible = false;
        this.resetForm();
        this.loadCourses();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Save failed.';
        this.submitting = false;
      },
    });
  }

  deleteCourse(course: CourseResponse): void {
    const ok = window.confirm(`Delete course \"${course.title}\"?`);
    if (!ok) {
      return;
    }

    this.message = '';
    this.error = '';

    this.courseService.deleteCourse(course.id).subscribe({
      next: (res) => {
        this.message = res.message || 'Deleted successfully.';
        this.loadCourses();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Delete failed.';
      },
    });
  }

  goToPage(page: number): void {
    if (page < 1) {
      return;
    }
    this.pagination.currentPage = page;
    this.loadCourses();
  }
}
