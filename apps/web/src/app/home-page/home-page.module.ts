import { NgModule } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';

import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page.component';
import { ContactSectionComponent } from '@uis/contact-section/contact-section.component';
import { EducationHighlightsComponent } from '@uis/education-highlights/education-highlights.component';
import { FeedbackSectionComponent } from '@uis/feedback-section/feedback-section.component';
import { InfoContactComponent } from '@uis/info-contact/info-contact.component';
import { InstructorsSectionComponent } from '@uis/instructors-section/instructors-section.component';
import { IntroSectionComponent } from '@uis/intro-section/intro-section.component';
import { OurCoursesComponent } from '@uis/our-courses/our-courses.component';
import { PromoModalComponent } from '@modules/promo-modal/promo-modal.component';
import { CommonModule } from '@angular/common';
import { GetActiveAdvertisementsUx } from '@uxs/advertisement-uxs/get-active-advertisements/get-active-advertisements.ux';

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),

    CommonModule,

    NzSpinModule,
    NzModalModule,
    NzButtonModule,
    ContactSectionComponent,
    EducationHighlightsComponent,
    FeedbackSectionComponent,
    InfoContactComponent,
    InstructorsSectionComponent,
    IntroSectionComponent,
    OurCoursesComponent,
    PromoModalComponent,
    GetActiveAdvertisementsUx,
  ],
  declarations: [HomePageComponent],
})
export class HomePageModule {}
