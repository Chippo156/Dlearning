import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-otp-form',
  templateUrl: './otp-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    NzButtonModule,
    CommonModule,
  ],
})
export class OtpComponent {
  @Input() loading: boolean = false;

  @Output() otpSubmit = new EventEmitter<string>();

  otpForm!: FormGroup;

  isOtpSent = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  submitOtp() {
    if (this.otpForm.invalid) return;

    this.otpSubmit.emit(this.otpForm.value.otp);
  }
}
