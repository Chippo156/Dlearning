import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  standalone: true,
  imports: [NzProgressModule, NzIconModule, NzButtonModule],
})
export class ProgressBarComponent {
  @Input() courseTitle!: string;
  @Input() completionData!: any;

  constructor(private router: Router) {}

  get totalLessonComplete() {
    return this.completionData?.totalLessonComplete || 0;
  }

  get totalLessons() {
    return this.completionData?.totalLessons || 0;
  }

  get completionPercentage() {
    return this.completionData?.completionPercentage || 0;
  }

  goHome() {
    this.router.navigate(['/']);
  }

  progressFormat = (percent: number) => `${percent}%`;
}
