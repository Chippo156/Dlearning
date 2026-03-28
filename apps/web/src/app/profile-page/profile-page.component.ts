import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { FormUpdateProfileComponent } from '@modules/form-update-profile/form-update-profile.component';
import { PasswordFormValue } from '@modules/form-update-profile/form-update-profile.component';
import { AuthStore } from '@shared/services/auth-store.service';
import { ProfileService } from '@shared/services/profile.service';

import { UserProfile } from '@shared/models/data/user-profile.model';
import { UserProfileRequest } from '@shared/models/request/user-profile.request';
import { Observable } from 'rxjs';
import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  standalone: true,
  imports: [CommonModule, FormUpdateProfileComponent, NzMessageModule],
})
export class ProfilePageComponent implements OnInit {
  profileData!: UserProfile;
  avatar: string;
  constructor(
    private message: NzMessageService,
    private authStore: AuthStore,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {
    const userProfile = this.authStore.userProfile;
    this.authService.isLogin$.subscribe((isLogin) => {
      if (!isLogin) {
        this.router.navigate(['/']);
      }
    });

    this.profileData = { ...this.profileData, ...userProfile };

    this.avatar = userProfile?.avatar || null;
  }

  ngOnInit(): void {
    document.title = 'Profile';
  }

  onUpdateProfile(values: UserProfile): void {
    const { points, ...rest } = values;

    this.profileData = {
      ...this.profileData,
      ...values,
    };
    const buildRequest: UserProfileRequest = {
      ...rest,
      avatar: values.avatar || this.avatar,
    };
    this.profileService.updateProfile(buildRequest).subscribe({
      next: (res) => {
        this.message.success('Profile updated');
        this.profileService.getProfile().subscribe({
          next: (res) => {
            this.profileData = res;
            this.authStore.userProfile = res;
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.message.error('Failed to update profile');
      },
    });
  }

  onUpdatePassword(_: PasswordFormValue): void {
    this.message.success('Password updated');
  }

  async onUpdateAvatar(file: File) {
    this.avatar = await this.toBase64(file);
    this.profileService.uploadAvatar(file).subscribe({
      next: (res) => {
        this.profileService.getProfile().subscribe({
          next: (res) => {
            this.profileData = res;
            this.authStore.userProfile = res;
          },
          error: (err) => {
            console.error(err);
          },
        });
      },
      error: (err) => {
        console.error(err);
        this.message.error('Failed to update avatar');
      },
    });
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
