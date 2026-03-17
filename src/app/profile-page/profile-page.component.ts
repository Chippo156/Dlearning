import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { FormUpdateProfileComponent } from './components/form-update-profile/form-update-profile.component';
import {
  PasswordFormValue,
  ProfileData,
} from './components/form-update-profile/form-update-profile.component';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  standalone: true,
  imports: [CommonModule, FormUpdateProfileComponent, NzMessageModule],
})
export class ProfilePageComponent implements OnInit {
  profileData: ProfileData = {
    firstName: '',
    lastName: '',
    gender: 'MALE',
    phoneNumber: '',
    dateOfBirth: '',
    address: '',
    description: '',
  };
  avatar: string | null = null;

  constructor(private message: NzMessageService) {}

  ngOnInit(): void {
    document.title = 'Profile';
  }

  onUpdateProfile(values: ProfileData): void {
    this.profileData = {
      ...this.profileData,
      ...values,
    };
    this.message.success('Profile updated');
  }

  onUpdatePassword(_: PasswordFormValue): void {
    this.message.success('Password updated');
  }

  async onUpdateAvatar(file: File): Promise<void> {
    this.avatar = await this.toBase64(file);
    this.message.success('Avatar updated');
  }

  private toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
}
