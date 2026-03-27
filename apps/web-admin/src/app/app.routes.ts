import { Route } from '@angular/router';
import { AdminCoursePageComponent } from './pages/admin-course-page/admin-course-page.component';
import { AdminHomePageComponent } from './pages/admin-home-page/admin-home-page.component';

import { LoginPageSharedComponent } from '@shared/page/login-page-shared/login-page-shared.component';

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
    path: 'login',
    component: LoginPageSharedComponent,
  },
];
