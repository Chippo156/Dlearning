import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { UploadFileComponent } from '../upload-file/upload-file.component';
import { UserProfile } from '@shared/models/data/user-profile.model';

export interface PasswordFormValue {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

@Component({
  selector: 'app-form-update-profile',
  templateUrl: './form-update-profile.component.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzAvatarModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzIconModule,
    NzInputModule,
    NzModalModule,
    NzSelectModule,
    UploadFileComponent,
  ],
})
export class FormUpdateProfileComponent implements OnChanges {
  @Input() profileData: UserProfile | null = null;
  @Input() avatar: string | null = null;

  @Output() updateProfile = new EventEmitter<UserProfile>();
  @Output() updatePassword = new EventEmitter<PasswordFormValue>();
  @Output() updateAvatar = new EventEmitter<File>();

  profileForm: FormGroup;
  passwordForm: FormGroup;

  isUploadModalOpen = false;
  isPasswordModalOpen = false;
  isFormDisabled = false;

  private readonly defaultCover =
    'https://placehold.co/800x500/png?text=Profile+Cover';

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['MALE', Validators.required],
      phoneNumber: [''],
      dateOfBirth: [''],
      address: [''],
      description: [''],
    });

    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profileData'] && this.profileData) {
      this.profileForm.patchValue({
        firstName: this.profileData.firstName,
        lastName: this.profileData.lastName,
        gender: this.profileData.gender || 'MALE',
        phoneNumber: this.profileData.phoneNumber || '',
        dateOfBirth: this.profileData.dateOfBirth || '',
        address: this.profileData.address || '',
        description: this.profileData.description || '',
      });
    }
  }

  get fullName(): string {
    if (!this.profileData) {
      return 'Profile';
    }
    return `${this.profileData.firstName} ${this.profileData.lastName}`.trim();
  }

  get coverImage(): string {
    return this.avatar || this.defaultCover;
  }

  openUploadModal(): void {
    this.isUploadModalOpen = true;
  }

  closeUploadModal(): void {
    this.isUploadModalOpen = false;
  }

  openPasswordModal(): void {
    this.isPasswordModalOpen = true;
  }

  closePasswordModal(): void {
    this.isPasswordModalOpen = false;
  }

  toggleEdit(): void {
    this.isFormDisabled = !this.isFormDisabled;
    if (this.isFormDisabled) {
      this.profileForm.disable({ emitEvent: false });
    } else {
      this.profileForm.enable({ emitEvent: false });
    }
  }

  submitProfile(): void {
    if (this.isFormDisabled) {
      return;
    }

    if (this.profileForm.invalid) {
      this.profileForm.markAllAsTouched();
      return;
    }

    this.updateProfile.emit(this.profileForm.getRawValue() as UserProfile);
  }

  submitPassword(): void {
    if (this.passwordForm.invalid) {
      this.passwordForm.markAllAsTouched();
      return;
    }

    this.updatePassword.emit(this.passwordForm.value as PasswordFormValue);
    this.passwordForm.reset();
    this.closePasswordModal();
  }

  handleAvatarUpdated(file: File): void {
    this.updateAvatar.emit(file);
    this.closeUploadModal();
  }
}
