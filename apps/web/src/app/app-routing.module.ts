import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { BannerLayoutComponent } from '@shared/layout/banner-layout/banner-layout.component';
import { NoBannerLayoutComponent } from '@shared/layout/no-banner-layout/no-banner-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: BannerLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        // canActivate: [AuthGuard],

        loadChildren: () =>
          import('./home-page/home-page.module').then((m) => m.HomePageModule),
      },
      {
        path: 'about',
        loadChildren: () =>
          import('./about-page/about-page.module').then(
            (m) => m.AboutPageModule
          ),
      },
      {
        path: 'contact',
        loadComponent: () =>
          import('@uis/info-contact/info-contact.component').then(
            (m) => m.InfoContactComponent
          ),
      },
    ],
  },
  {
    path: '',
    component: NoBannerLayoutComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('./login-page/login-page.module').then(
            (m) => m.LoginPageModule
          ),
      },

      {
        path: 'register',
        loadChildren: () =>
          import('./register-page/register-page.module').then(
            (m) => m.RegisterPageModule
          ),
      },
      {
        path: 'forgot-password',
        loadChildren: () =>
          import('./forgot-password-page/forgot-password-page.module').then(
            (m) => m.ForgotPasswordPageModule
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
        path: 'community',
        loadComponent: () =>
          import('./community-page/community-page.component').then(
            (m) => m.CommunityPageComponent
          ),
      },
      {
        path: 'ads',
        loadChildren: () =>
          import('./ads-page/ads-page.module').then((m) => m.AdsPageModule),
      },
      {
        path: 'user-certificates',
        loadChildren: () =>
          import('./user-certificate-page/user-certificate-page.module').then(
            (m) => m.UserCertificatePageModule
          ),
      },
      {
        path: 'certificates',
        loadChildren: () =>
          import(
            './certificate-template-page/certificate-template-page.module'
          ).then((m) => m.CertificateTemplatePageModule),
      },
      {
        path: 'deposit',
        loadChildren: () =>
          import('./deposit-page/deposit-page.module').then(
            (m) => m.DepositPageModule
          ),
      },
      {
        path: 'teach-now',
        loadComponent: () =>
          import('./teach-now-page/teach-now-page.component').then(
            (m) => m.TeachNowPageComponent
          ),
      },
      {
        path: 'favourites',
        loadChildren: () =>
          import('./favourites-page/favourites-page.module').then(
            (m) => m.FavouritesPageModule
          ),
      },
      {
        path: 'my-courses',
        loadChildren: () =>
          import('./my-courses-page/my-courses-page.module').then(
            (m) => m.MyCoursesPageModule
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
        path: 'profile',
        loadComponent: () =>
          import('./profile-page/profile-page.component').then(
            (m) => m.ProfilePageComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top', // luôn scroll lên đầu
      anchorScrolling: 'enabled', // hỗ trợ #anchor
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
