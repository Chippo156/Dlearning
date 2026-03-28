import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { TeacherRegistrationResponse } from '@shared/models/data/teacher-registration-response.model';
import { TeacherRegistrationRequest } from '@shared/models/request/teacher-registration.request';
import { TeacherRegistrationService } from '@shared/services/teacher-registration.service';

@Component({
  selector: 'app-teach-now-page',
  templateUrl: './teach-now-page.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzIconModule,
    NzMessageModule,
    NzSpinModule,
  ],
})
export class TeachNowPageComponent {
  form: FormGroup;
  cvFile: File | null = null;
  certificateFile: File | null = null;
  cvFileName = '';
  certificateFileName = '';
  submitting = false;
  registration?: TeacherRegistrationResponse;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherRegistrationService,
    private message: NzMessageService
  ) {
    document.title = 'Teach Now';
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      expertise: ['', [Validators.required]],
      yearsOfExperience: [0, [Validators.required, Validators.min(0)]],
      bio: ['', [Validators.required]],
      facebookLink: ['', [Validators.required]],
      cvUrl: [''],
    });
  }

  get f() {
    return this.form.controls;
  }

  onCvChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.cvFile = file;
    this.cvFileName = file?.name || '';
  }

  onCertificateChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;
    this.certificateFile = file;
    this.certificateFileName = file?.name || '';
  }

  submit() {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      this.message.warning('Please fill all required fields.');
      return;
    }

    if (!this.cvFile || !this.certificateFile) {
      this.message.warning('Please upload your CV and certificate files.');
      return;
    }

    const value = this.form.value;
    const request: TeacherRegistrationRequest = {
      email: value.email,
      fullName: value.fullName,
      phoneNumber: value.phoneNumber,
      expertise: value.expertise,
      yearsOfExperience: Number(value.yearsOfExperience) || 0,
      bio: value.bio,
      facebookLink: value.facebookLink,
      certificate: this.certificateFile?.name || '',
      cvUrl: value.cvUrl || '',
    };

    this.submitting = true;

    this.teacherService
      .registerTeacher(request, this.cvFile, this.certificateFile)
      .subscribe({
        next: (res) => {
          this.registration = res;
          this.message.success('Registration submitted successfully.');
        },
        error: () => {
          this.message.error('Registration failed. Please try again.');
        },
        complete: () => {
          this.submitting = false;
        },
      });
  }

  isInvalid(controlName: string): boolean {
    const control = this.form.get(controlName);
    return Boolean(
      control && control.invalid && (control.dirty || control.touched)
    );
  }
}
