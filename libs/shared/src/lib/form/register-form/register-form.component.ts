import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterRequest } from '@shared/models/request/register-request.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterComponent {
  @Input() loading: boolean = false;

  @Output() registerSubmit = new EventEmitter<RegisterRequest>();
  @Output() otpSubmit = new EventEmitter<string>();

  registerForm!: FormGroup;
  otpForm!: FormGroup;

  isOtpSent = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    });

    this.otpForm = this.fb.group({
      otp: ['', Validators.required],
    });
  }

  submitRegister() {
    if (this.registerForm.invalid) return;

    const data = this.registerForm.value;
    data.confirmPassword = undefined; // Remove confirmPassword from the data sent to the backend
    this.registerSubmit.emit(data);
  }

  submitOtp() {
    if (this.otpForm.invalid) return;

    this.otpSubmit.emit(this.otpForm.value.otp);
  }
}
