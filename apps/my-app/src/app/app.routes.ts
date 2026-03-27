import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home-page/home-page.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login-page/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'register',
    loadChildren: () =>
      import('./register-page/register-page.module').then(
        (m) => m.RegisterPageModule
      ),
  },
  {
    path: 'courses',
    loadChildren: () =>
      import('./course-page/course-page.module').then(
        (m) => m.CoursePageModule
      ),
  },
  {
    path: 'learning/:courseId',
    loadChildren: () =>
      import('./learning-page/learning-page.module').then(
        (m) => m.LearningPageModule
      ),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
