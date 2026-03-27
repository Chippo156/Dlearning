import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-search-course',
  templateUrl: './search-course.component.html',
  styleUrls: ['./search-course.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzRadioModule,
    NzIconModule,
    NzDividerModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class SearchCourseComponent {
  @Input() searchControl!: FormControl;

  level: string[] = [];
  type: string[] = [];

  duration = '';

  levels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];

  types = ['CAREER', 'SKILL', 'CERTIFICATE', 'COURSE'];

  durations = [
    { label: 'Less than 5 hours', value: '<5' },
    { label: '5 - 10 hours', value: '5-10' },
    { label: '10 - 20 hours', value: '10-20' },
    { label: '20 - 60 hours', value: '20-60' },
    { label: 'More than 60 hours', value: '>60' },
  ];

  get countSearch(): number {
    let count = 0;
    if (this.searchControl.value?.trim()) count++;
    if (this.level.length > 0) count++;
    if (this.type.length > 0) count++;
    if (this.duration) count++;
    return count;
  }

  toggleLevel(lvl: string) {
    if (this.level.includes(lvl)) {
      this.level = this.level.filter((l) => l !== lvl);
    } else {
      this.level.push(lvl);
    }
  }

  toggleType(t: string) {
    if (this.type.includes(t)) {
      this.type = this.type.filter((x) => x !== t);
    } else {
      this.type.push(t);
    }
  }

  clearFilter() {
    this.searchControl.reset();
    this.level = [];
    this.type = [];
    this.duration = '';
  }
}
