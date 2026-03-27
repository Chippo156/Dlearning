import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CourseResponse } from '@shared/models/course-response.model';

@Component({
  selector: 'app-course-list-card',
  templateUrl: './course-list-card.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class CourseListCardComponent {
  @Input({ required: true }) course!: CourseResponse;
  @Input() showTypeBadge = false;
  @Input() showPoints = true;
  @Output() viewDetail = new EventEmitter<CourseResponse>();
  @Output() addFavourite = new EventEmitter<CourseResponse>();

  getLevelBadgeClass(level?: string): string {
    const normalized = (level || '').toLowerCase();
    if (normalized.includes('beginner')) {
      return 'bg-emerald-100 text-emerald-700';
    }
    if (normalized.includes('intermediate')) {
      return 'bg-amber-100 text-amber-700';
    }
    if (normalized.includes('advanced')) {
      return 'bg-rose-100 text-rose-700';
    }
    return 'bg-slate-100 text-slate-600';
  }

  onViewDetail() {
    this.viewDetail.emit(this.course);
  }

  onAddFavourite() {
    this.addFavourite.emit(this.course);
  }
}
