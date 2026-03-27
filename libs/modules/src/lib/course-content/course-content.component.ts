import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges } from '@angular/core';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  standalone: true,
  imports: [NzCollapseModule, NzIconModule, CommonModule],
})
export class CourseContentComponent implements OnChanges {
  @Input() chapters: any[] = [];

  totalLessons = 0;

  ngOnChanges() {
    this.totalLessons = this.chapters.reduce(
      (acc, chapter) => acc + (chapter.lessonDto?.length || 0),
      0,
    );
  }
}
