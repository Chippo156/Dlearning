import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EducationHighlightsComponent } from '@shared/uis/education-highlights/education-highlights.component';
import { IntroSectionComponent } from '@shared/uis/intro-section/intro-section.component';

import { AboutPageComponent } from './about-page.component';

const routes: Routes = [
  {
    path: '',
    component: AboutPageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    EducationHighlightsComponent,
    IntroSectionComponent,
  ],
  declarations: [AboutPageComponent],
})
export class AboutPageModule {}
