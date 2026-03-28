import { Route } from '@angular/router';
import { AdminCoursePageComponent } from './pages/admin-course-page/admin-course-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';
import { AdminChapterPageComponent } from './pages/admin-chapter-page/admin-chapter-page.component';
import { AdminLessonPageComponent } from './pages/admin-lesson-page/admin-lesson-page.component';

import { LoginPageSharedComponent } from '@shared/page/login-page-shared/login-page-shared.component';
import { RegisterPageSharedComponent } from '@shared/page/register-page-shared/register-page-shared.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: AdminHomePageComponent,
  },
  {
    path: 'courses',
    component: AdminCoursePageComponent,
  },
  {
    path: 'chapters',
    component: AdminChapterPageComponent,
  },
  {
    path: 'lessons',
    component: AdminLessonPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageSharedComponent,
  },
  {
    path: 'login',
    component: LoginPageSharedComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
];
