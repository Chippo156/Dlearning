import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';
import { ChapterResponse } from '@shared/models/chapter-response.model';
import { CourseDropdownItem } from '@shared/models/course-dropdown-item.model';
import { LessonCreationResponse } from '@shared/models/lesson-creation-response.model';
import { LessonCreationRequest } from '@shared/models/request/lesson-creation.request';
import { UpdateLessonRequest } from '@shared/models/request/update-lesson.request';
import { ChapterService } from '@shared/services/chapter.service';
import { CourseService } from '@shared/services/course.service';
import { LessonService } from '@shared/services/lesson.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTableModule } from 'ng-zorro-antd/table';

type LessonRow = LessonCreationResponse & {
  chapterName?: string;
  description?: string;
};

@Component({
  selector: 'app-admin-lesson-page',
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
  templateUrl: './admin-lesson-page.component.html',
})
export class AdminLessonPageComponent implements OnInit {
  allLessons: LessonRow[] = [];
  courseOptions: CourseDropdownItem[] = [];
  chapterOptions: ChapterResponse[] = [];

  selectedLessonId: number | null = null;
  selectedCourseFilterId: number | null = null;
  selectedChapterFilterId: number | null = null;
  selectedVideo: File | null = null;

  loading = false;
  loadingCourses = false;
  loadingChapters = false;
  submitting = false;
  isModalVisible = false;
  message = '';
  error = '';

  form = this.fb.group({
    courseId: [null as number | null],
    chapterId: [null as number | null],
    lessonName: ['', [Validators.required, Validators.maxLength(255)]],
    description: ['', [Validators.required]],
  });

  constructor(
    private fb: FormBuilder,
    private lessonService: LessonService,
    private chapterService: ChapterService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.form.controls.courseId.valueChanges.subscribe((courseId) => {
      this.onFormCourseChange(courseId);
    });

    this.loadCoursesForDropdown();
    this.loadLessons();
  }

  get lessons(): LessonRow[] {
    return this.allLessons.filter((lesson) => {
      const matchCourse =
        this.selectedCourseFilterId === null ||
        lesson.courseId === this.selectedCourseFilterId;
      const matchChapter =
        this.selectedChapterFilterId === null ||
        lesson.chapterId === this.selectedChapterFilterId;
      return matchCourse && matchChapter;
    });
  }

  get lessonsWithVideoCount(): number {
    return this.lessons.filter((item) => !!item.videoUrl).length;
  }

  get activeFilterCount(): number {
    return (
      Number(this.selectedCourseFilterId !== null) +
      Number(this.selectedChapterFilterId !== null)
    );
  }

  get isEditing(): boolean {
    return this.selectedLessonId !== null;
  }

  loadCoursesForDropdown(): void {
    this.loadingCourses = true;
    this.error = '';

    this.courseService
      .getCoursesForDropdown()
      .pipe(
        finalize(() => {
          this.loadingCourses = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.courseOptions = res || [];

          if (!this.courseOptions.length) {
            this.chapterOptions = [];
            this.selectedCourseFilterId = null;
            this.selectedChapterFilterId = null;
            return;
          }

          this.loadChaptersByCourse(this.selectedCourseFilterId);
        },
        error: (err) => {
          this.error =
            err?.error?.message || 'Failed to load courses for filter.';
        },
      });
  }

  loadChaptersByCourse(courseId: number | null): void {
    if (courseId === null) {
      this.chapterOptions = [];
      this.selectedChapterFilterId = null;
      return;
    }

    this.loadingChapters = true;
    this.error = '';

    this.chapterService
      .getChaptersByCourse(courseId)
      .pipe(
        finalize(() => {
          this.loadingChapters = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.chapterOptions = res || [];

          if (
            this.selectedChapterFilterId !== null &&
            !this.chapterOptions.some(
              (chapter) => chapter.chapterId === this.selectedChapterFilterId
            )
          ) {
            this.selectedChapterFilterId = null;
          }
        },
        error: (err) => {
          this.error = err?.error?.message || 'Failed to load chapters.';
        },
      });
  }

  loadLessons(): void {
    this.loading = true;
    this.error = '';

    this.lessonService
      .getAllLessons()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.allLessons = res.result || [];
        },
        error: (err) => {
          this.error = err?.error?.message || 'Failed to load lessons.';
        },
      });
  }

  onFilterCourseChange(courseId: number | null): void {
    this.selectedCourseFilterId = courseId;
    this.loadChaptersByCourse(courseId);
  }

  onFilterChapterChange(chapterId: number | null): void {
    this.selectedChapterFilterId = chapterId;
  }

  clearFilters(): void {
    this.selectedCourseFilterId = null;
    this.selectedChapterFilterId = null;
    this.chapterOptions = [];
  }

  onFormCourseChange(courseId: number | null): void {
    if (!courseId) {
      this.form.patchValue({ chapterId: null });
      this.chapterOptions = [];
      return;
    }

    this.chapterService.getChaptersByCourse(courseId).subscribe({
      next: (res) => {
        this.chapterOptions = res || [];

        const currentChapterId = this.form.controls.chapterId.value;
        if (
          !currentChapterId ||
          !this.chapterOptions.some(
            (chapter) => chapter.chapterId === currentChapterId
          )
        ) {
          this.form.patchValue({
            chapterId: this.chapterOptions[0]?.chapterId ?? null,
          });
        }
      },
      error: () => {
        this.chapterOptions = [];
        this.form.patchValue({ chapterId: null });
      },
    });
  }

  onVideoChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedVideo = input.files?.[0] || null;
  }

  openCreateModal(): void {
    this.resetForm();

    if (this.selectedCourseFilterId !== null) {
      this.form.patchValue({ courseId: this.selectedCourseFilterId });
    }

    if (this.selectedChapterFilterId !== null) {
      this.form.patchValue({ chapterId: this.selectedChapterFilterId });
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

  editLesson(lesson: LessonRow): void {
    this.selectedLessonId = lesson.lessonId;
    this.selectedVideo = null;
    this.message = '';
    this.error = '';

    this.form.patchValue({
      courseId: lesson.courseId,
      chapterId: lesson.chapterId,
      lessonName: lesson.lessonName,
      description: lesson.description || lesson.lessonDescription || '',
    });

    this.isModalVisible = true;
  }

  resetForm(): void {
    this.selectedLessonId = null;
    this.selectedVideo = null;
    this.message = '';
    this.error = '';

    this.form.reset({
      courseId: null,
      chapterId: null,
      lessonName: '',
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
    const chapterId = this.form.controls.chapterId.value;
    const lessonName = this.form.controls.lessonName.value?.trim() || '';
    const description = this.form.controls.description.value?.trim() || '';

    if (!courseId) {
      this.error = 'Course is required.';
      return;
    }
    if (!chapterId) {
      this.error = 'Chapter is required.';
      return;
    }
    if (!lessonName) {
      this.error = 'Lesson name is required.';
      return;
    }

    this.submitting = true;

    if (this.isEditing) {
      this.lessonService
        .updateLesson(
          {
            courseId,
            chapterId,
            lessonId: this.selectedLessonId as number,
            lessonName,
            description,
          } as UpdateLessonRequest,
          this.selectedVideo
        )
        .pipe(
          finalize(() => {
            this.submitting = false;
          })
        )
        .subscribe({
          next: (res) => {
            this.message = res.message || 'Lesson updated successfully.';
            this.isModalVisible = false;
            this.resetForm();
            this.loadLessons();
          },
          error: (err) => {
            this.error = err?.error?.message || 'Update failed.';
          },
        });

      return;
    }

    this.lessonService
      .createLesson(
        {
          courseId,
          chapterId,
          lessonName,
          description,
        } as LessonCreationRequest,
        this.selectedVideo
      )
      .pipe(
        finalize(() => {
          this.submitting = false;
        })
      )
      .subscribe({
        next: (res) => {
          this.message = res.message || 'Lesson created successfully.';
          this.isModalVisible = false;
          this.resetForm();
          this.loadLessons();
        },
        error: (err) => {
          this.error = err?.error?.message || 'Create failed.';
        },
      });
  }

  deleteLesson(lesson: LessonRow): void {
    const ok = window.confirm(`Delete lesson \"${lesson.lessonName}\"?`);
    if (!ok) {
      return;
    }

    this.message = '';
    this.error = '';

    this.lessonService.deleteLesson(lesson.lessonId).subscribe({
      next: (res) => {
        this.message = res.message || 'Deleted successfully.';
        this.loadLessons();
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

  getChapterName(lesson: LessonRow): string {
    return (
      lesson.chapterName ||
      this.chapterOptions.find(
        (chapter) => chapter.chapterId === lesson.chapterId
      )?.chapterName ||
      'N/A'
    );
  }
}
