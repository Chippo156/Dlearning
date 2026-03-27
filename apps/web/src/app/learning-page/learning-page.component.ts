import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  ChapterResponse,
  CourseChapter,
  LessonResponse,
} from '@shared/models/data/course-chapter.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserCompletionLesson } from '@shared/models/data/user-completion-lessson.model';
import { LessonProgessResponse } from '@shared/models/data/lesson-progress-response.model';
import { LearningPageUx } from '@uxs/learning-page-ux/learning-page.ux';

interface LessonReply {
  id: number;
  name: string;
  content: string;
}

interface LessonComment {
  id: number;
  name: string;
  content: string;
  replies: LessonReply[];
}

@Component({
  selector: 'app-learning-page',
  templateUrl: './learning-page.component.html',
})
export class LearningPageComponent implements OnInit {
  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;
  @ViewChild('learningUx', { static: true })
  learningUx!: LearningPageUx;

  courseId!: number;

  courseTitle: string = '';
  chapters: ChapterResponse[] = [];
  totalLessons = 0;

  currentLesson!: LessonResponse;
  currentChapter!: ChapterResponse;

  completedLessons: number[] = [];

  lastTime = 0;
  hasUpdatedCompletion = false;

  avatar = '';
  username = '';

  commentLesson: LessonComment[] = [];
  newCommentLesson = '';

  replyContent: Record<number, string> = {};
  activeReply: number | null = null;

  isVideoModalVisible = false;

  completionData = {
    totalLessonComplete: 0,
    totalLessons: 0,
    completionPercentage: 0,
  };

  isPlaying = false;
  safeVideoUrl: SafeResourceUrl | null = null;

  get hasVideoUrl(): boolean {
    return Boolean(this.currentLesson?.videoUrl);
  }

  constructor(
    private route: ActivatedRoute,
    private message: NzMessageService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'));

    document.title = 'Learning';

    this.loadCourse();
  }

  loadCourse(): void {
    this.learningUx.getCourseDetail(this.courseId);
  }

  handleMenuClick(lesson: LessonResponse, chapter?: ChapterResponse): void {
    if (!lesson || this.currentLesson?.lessonId === lesson.lessonId) {
      return;
    }

    this.setCurrentLesson(lesson, chapter);
  }

  handleNewCommentChange(value: string): void {
    this.newCommentLesson = value;
  }

  toggleReplyInput(id: number): void {
    this.activeReply = this.activeReply === id ? null : id;
  }

  handleReplyChange(id: number, value: string): void {
    this.replyContent[id] = value;
  }

  handleAddCommentLesson(): void {
    const content = this.newCommentLesson.trim();
    if (!content) {
      this.message.error('Please enter a comment');
      return;
    }

    const newComment: LessonComment = {
      id: Date.now(),
      name: this.username,
      content,
      replies: [],
    };

    this.commentLesson = [newComment, ...this.commentLesson];

    this.newCommentLesson = '';
  }

  handleReplySubmit(commentId: number): void {
    const content = (this.replyContent[commentId] || '').trim();
    if (!content) {
      this.message.error('Please enter a reply');
      return;
    }

    const reply = {
      id: Date.now(),
      name: this.username,
      content,
    };

    this.commentLesson = this.commentLesson.map((c) => {
      if (c.id === commentId) {
        return {
          ...c,
          replies: [...(c.replies || []), reply],
        };
      }
      return c;
    });

    this.replyContent[commentId] = '';
    this.activeReply = null;
  }

  playVideo(): void {
    this.isPlaying = true;
    const videoUrl = this.currentLesson?.videoUrl || '';
    if (!videoUrl) {
      this.message.error('Video url is missing');
      return;
    }

    this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      videoUrl.replace('watch?v=', 'embed/')
    );
  }

  getThumbnailFromVideo(url: string): string {
    if (!url) {
      return '';
    }

    return url
      .replace('/video/upload/', '/video/upload/so_1,w_800,h_450,c_fill/')
      .replace('.mp4', '.jpg');
  }

  handleSeeking(): void {
    const video = this.videoRef.nativeElement;
    if (video) {
      if (this.isLessonCompleted(this.currentLesson?.lessonId)) {
        this.lastTime = video.currentTime;
        return;
      }

      const currentTime = video.currentTime;
      if (currentTime > this.lastTime) {
        video.currentTime = this.lastTime;
        this.message.warning('Seeking forward is not allowed');
      } else {
        this.lastTime = currentTime;
      }
    }
  }

  handleTimeUpdate(): void {
    const video = this.videoRef.nativeElement;
    if (video && this.currentLesson) {
      const currentTime = video.currentTime;
      if (!video.seeking && !video.paused && currentTime > this.lastTime) {
        this.lastTime = currentTime;
      }
      const duration = video.duration;
      if (!duration || Number.isNaN(duration)) {
        return;
      }

      const progress = (currentTime / duration) * 100;
      if (progress >= 90 && !this.hasUpdatedCompletion) {
        this.learningUx.completeLesson(this.currentLesson.lessonId);
      }
    }
  }

  checkCourseCompletion(): void {
    if (
      this.completionData.totalLessons > 0 &&
      this.completionData.totalLessonComplete ===
        this.completionData.totalLessons
    ) {
      Swal.fire({
        title: 'Congratulations!',
        text: 'You have completed the course!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  }

  private setInitialLesson(): void {
    if (this.chapters.length > 0 && this.chapters[0].lessonDto.length > 0) {
      this.setCurrentLesson(this.chapters[0].lessonDto[0], this.chapters[0]);
    }
  }

  private setCurrentLesson(
    lesson: LessonResponse,
    chapter?: ChapterResponse
  ): void {
    this.currentLesson = lesson;
    if (chapter) {
      this.currentChapter = chapter;
    }

    this.resetLessonState();
  }

  private resetLessonState(): void {
    this.lastTime = 0;
    this.isPlaying = false;
    this.safeVideoUrl = null;
    if (this.videoRef?.nativeElement) {
      this.videoRef.nativeElement.currentTime = 0;
    }
    this.syncLessonCompletionState();
  }

  onCourseLoaded(res: CourseChapter): void {
    this.courseTitle = res.courseTitle;
    this.chapters = res.chapters || [];
    this.totalLessons = res.totalLessons;
    this.completionData.totalLessons = res.totalLessons || 0;
    this.completionData.totalLessonComplete = 0;
    this.completionData.completionPercentage = 0;

    this.setInitialLesson();
    this.resetLessonState();

    this.learningUx.getCompletion(this.courseId);
  }

  onCourseFailed(error: any): void {
    console.error('Failed to load course:', error);
    this.message.error('Failed to load course. Please try again later.');
  }

  onCompletionLoaded(res: UserCompletionLesson): void {
    this.applyCompletionData(res);
    this.syncLessonCompletionState();
  }

  onCompletionFailed(error: any): void {
    console.error('Failed to load completion data:', error);
  }

  onLessonCompleted(res: LessonProgessResponse): void {
    if (res?.isComplete) {
      this.applyLessonCompletion(res.lessonId);
      this.syncLessonCompletionState();

      this.message.success('Lesson marked as completed!');
      this.checkCourseCompletion();
    }
  }

  onLessonCompleteFailed(error: any): void {
    console.error('Failed to update lesson completion:', error);
  }

  private applyCompletionData(res: UserCompletionLesson): void {
    this.completionData.totalLessonComplete = res.totalLessonComplete || 0;
    this.completionData.totalLessons = res.totalLessons || 0;
    this.completionData.completionPercentage = res.completionPercentage || 0;
    this.completedLessons = (res.lessonCompletes || []).map(
      (lesson) => lesson.lessonId
    );
  }

  private applyLessonCompletion(lessonId: number): void {
    if (!this.completedLessons.includes(lessonId)) {
      this.completedLessons.push(lessonId);
      this.completionData.totalLessonComplete += 1;
    }

    if (this.completionData.totalLessons > 0) {
      this.completionData.completionPercentage =
        (this.completionData.totalLessonComplete /
          this.completionData.totalLessons) *
        100;
    }
  }

  private syncLessonCompletionState(): void {
    this.hasUpdatedCompletion = this.isLessonCompleted(
      this.currentLesson?.lessonId
    );
  }

  isLessonCompleted(lessonId?: number): boolean {
    return Boolean(lessonId && this.completedLessons.includes(lessonId));
  }
}
