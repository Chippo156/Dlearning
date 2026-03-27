import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LearningPageComponent } from './learning-page.component';
import { FormsModule } from '@angular/forms';
import { ReviewLessonComponent } from '@modules/review-lesson/review-lesson.component';
import { ProgressBarComponent } from '@modules/progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
import { LearningPageUx } from '@uxs/learning-page-ux/learning-page.ux';
import { IonicModule } from '@ionic/angular';

const routes: Routes = [
  {
    path: '',
    component: LearningPageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    IonicModule,
    FormsModule,
    CommonModule,

    ReviewLessonComponent,
    ProgressBarComponent,
    LearningPageUx,
  ],
  declarations: [LearningPageComponent],
})
export class LearningPageModule {}
