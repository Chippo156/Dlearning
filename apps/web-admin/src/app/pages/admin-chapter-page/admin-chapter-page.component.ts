import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChapterResponse } from '@shared/models/chapter-response.model';
import { CourseDropdownItem } from '@shared/models/course-dropdown-item.model';
import { ChapterCreationRequest } from '@shared/models/request/chapter-creation.request';
import { ChapterUpdateRequest } from '@shared/models/request/chapter-update.request';
import { ChapterService } from '@shared/services/chapter.service';
import { CourseService } from '@shared/services/course.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-admin-chapter-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzCardModule,
    NzButtonModule,
    NzAlertModule,
    NzTableModule,
    NzEmptyModule,
    NzModalModule,
    NzSpinModule,
    NzSelectModule,
  ],
  templateUrl: './admin-chapter-page.component.html',
})
export class AdminChapterPageComponent implements OnInit {
  chapters: ChapterResponse[] = [];
  courseOptions: CourseDropdownItem[] = [];

  selectedChapterId: number | null = null;
  selectedCourseFilterId: number | null = null;

  loading = false;
  loadingCourses = false;
  submitting = false;
  isModalVisible = false;
  message = '';
  error = '';

  form = this.fb.group({
    courseId: [null as number | null],
    chapterName: ['', [Validators.required, Validators.maxLength(255)]],
    description: [''],
  });

  constructor(
    private fb: FormBuilder,
    private chapterService: ChapterService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadCoursesForDropdown();
  }

  get isEditing(): boolean {
    return this.selectedChapterId !== null;
  }

  loadCoursesForDropdown(): void {
    this.loadingCourses = true;
    this.error = '';

    this.courseService.getCoursesForDropdown().subscribe({
      next: (res) => {
        this.courseOptions = res || [];
        this.loadingCourses = false;

        if (!this.courseOptions.length) {
          this.chapters = [];
          return;
        }

        if (this.selectedCourseFilterId === null) {
          this.selectedCourseFilterId = this.courseOptions[0].id;
        }

        this.loadChapters();
      },
      error: (err) => {
        this.error =
          err?.error?.message || 'Failed to load courses for filter.';
        this.loadingCourses = false;
      },
    });
  }

  loadChapters(): void {
    if (this.selectedCourseFilterId === null) {
      this.chapters = [];
      return;
    }

    this.loading = true;
    this.error = '';

    this.chapterService
      .getChaptersByCourse(this.selectedCourseFilterId)
      .subscribe({
        next: (res) => {
          this.chapters = res || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = err?.error?.message || 'Failed to load chapters.';
          this.loading = false;
        },
      });
  }

  onFilterCourseChange(courseId: number | null): void {
    this.selectedCourseFilterId = courseId;
    this.loadChapters();
  }

  openCreateModal(): void {
    this.resetForm();

    if (this.selectedCourseFilterId !== null) {
      this.form.patchValue({ courseId: this.selectedCourseFilterId });
    }

    this.isModalVisible = true;
  }

  closeModal(): void {
    if (this.submitting) {
      return;
    }

    this.isModalVisible = false;
    this.resetForm();
  }

  editChapter(chapter: ChapterResponse): void {
    this.selectedChapterId = chapter.chapterId;
    this.message = '';
    this.error = '';

    this.form.patchValue({
      courseId: chapter.courseId,
      chapterName: chapter.chapterName,
      description: chapter.description || '',
    });

    this.isModalVisible = true;
  }

  resetForm(): void {
    this.selectedChapterId = null;
    this.message = '';
    this.error = '';

    this.form.reset({
      courseId: null,
      chapterName: '',
      description: '',
    });
  }

  submit(): void {
    this.message = '';
    this.error = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const courseId = this.form.controls.courseId.value;
    if (!this.isEditing && !courseId) {
      this.error = 'Course is required.';
      return;
    }

    const chapterName = this.form.controls.chapterName.value?.trim() || '';
    if (!chapterName) {
      this.error = 'Chapter name is required.';
      return;
    }

    this.submitting = true;

    const action$ = this.isEditing
      ? this.chapterService.updateChapter(
          this.selectedChapterId as number,
          {
            courseId: courseId,
            chapterName,
            description: this.form.controls.description.value || '',
          } as ChapterUpdateRequest
        )
      : this.chapterService.createChapter({
          courseId: courseId as number,
          chapterName,
          description: this.form.controls.description.value || '',
        } as ChapterCreationRequest);

    action$.subscribe({
      next: (res) => {
        this.message = res.message || 'Saved successfully.';
        this.submitting = false;
        this.isModalVisible = false;
        this.resetForm();
        this.loadChapters();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Save failed.';
        this.submitting = false;
      },
    });
  }

  deleteChapter(chapter: ChapterResponse): void {
    const ok = window.confirm(`Delete chapter \"${chapter.chapterName}\"?`);
    if (!ok) {
      return;
    }

    this.message = '';
    this.error = '';

    this.chapterService.deleteChapter(chapter.chapterId).subscribe({
      next: (res) => {
        this.message = res.message || 'Deleted successfully.';
        this.loadChapters();
      },
      error: (err) => {
        this.error = err?.error?.message || 'Delete failed.';
      },
    });
  }

  getCourseTitle(courseId: number): string {
    return (
      this.courseOptions.find((item) => item.id === courseId)?.courseName ||
      'N/A'
    );
  }
}
