import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';

@Component({
  selector: 'app-course-page-sort-bar',
  templateUrl: './course-page-sort-bar.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, NzSelectModule],
})
export class CoursePageSortBarComponent {
  @Input() totalElements = 0;
  @Input() option = '0';
  @Output() optionChange = new EventEmitter<string>();

  onOptionChanged(value: string) {
    this.optionChange.emit(value);
  }
}
