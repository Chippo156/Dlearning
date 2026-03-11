import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-our-courses',
  templateUrl: './our-courses.component.html',
  standalone: true,
  imports: [NzInputModule, NzFormModule, NzButtonModule, ReactiveFormsModule],
})
export class OurCoursesComponent {
  @Input() courses: any[] = [];
  @Input() hasMore: boolean = false;

  @Output() loadMore = new EventEmitter<void>();
}
