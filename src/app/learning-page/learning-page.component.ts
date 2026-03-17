import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-learning-page',
  templateUrl: './learning-page.component.html',
})
export class LearningPageComponent implements OnInit {
  @ViewChild('videoPlayer') videoRef!: ElementRef<HTMLVideoElement>;

  id!: string;

  courseTitle = '';
  chapters: any[] = [];

  currentLesson: any = null;
  currentChapter: any = null;

  loading = true;

  completedLessons: number[] = [];

  lastTime = 0;
  hasUpdatedCompletion = false;

  avatar = '';
  username = '';

  commentLesson: any[] = [];
  newCommentLesson = '';

  replyContent: Record<number, string> = {};
  activeReply: number | null = null;

  completionData = {
    totalLessonComplete: 0,
    totalLessons: 0,
    completionPercentage: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private message: NzMessageService,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    document.title = 'Learning';

    this.loadCourse();
  }

  loadCourse() {
    // gọi API giống React
  }

  handleMenuClick(lesson: any) {
    this.currentLesson = lesson;
  }

  handleNewCommentChange(value: string) {
    this.newCommentLesson = value;
  }

  toggleReplyInput(id: number) {
    this.activeReply = this.activeReply === id ? null : id;
  }

  handleReplyChange(id: number, value: string) {
    this.replyContent[id] = value;
  }

  handleAddCommentLesson() {
    if (!this.newCommentLesson.trim()) {
      this.message.error('Please enter a comment');
      return;
    }

    const newComment = {
      id: Date.now(),
      name: this.username,
      content: this.newCommentLesson,
      replies: [],
    };

    this.commentLesson = [newComment, ...this.commentLesson];

    this.newCommentLesson = '';
  }

  handleReplySubmit(commentId: number) {
    const reply = {
      id: Date.now(),
      name: this.username,
      content: this.replyContent[commentId],
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
}
