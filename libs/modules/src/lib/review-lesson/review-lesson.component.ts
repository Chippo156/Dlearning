import { Component, Input } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-review-lesson',
  templateUrl: './review-lesson.component.html',
  standalone: true,
  imports: [
    CommonModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    FormsModule,
  ],
})
export class ReviewLessonComponent {
  @Input() comments: any[] = [];
  @Input() avatar!: string;

  @Input() newCommentLesson!: string;

  @Input() handleAddCommentLesson!: (text: string) => void;
  @Input() handleNewCommentChange!: (text: string) => void;

  @Input() toggleReplyInput!: (id: number) => void;
  @Input() handleReplySubmit!: (id: number, text: string) => void;
  @Input() handleReplyChange!: (id: number, text: string) => void;

  @Input() activeReply!: number | null;

  @Input() replyContent: Record<number, string> = {};
}
