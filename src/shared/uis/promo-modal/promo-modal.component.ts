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
  selector: 'app-promo-modal',
  templateUrl: './promo-modal.component.html',
  standalone: true,
  imports: [NzInputModule, NzFormModule, NzButtonModule, ReactiveFormsModule],
})
export class PromoModalComponent {
  @Input() ads: any[] = [];
  @Output() close = new EventEmitter<void>();
}
