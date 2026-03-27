import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LearningPageComponent } from './learning-page.component';
import { FormsModule } from '@angular/forms';
import { FavouritesComponent } from '@modules/favourites/favourites.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReviewLessonComponent } from '@modules/review-lesson/review-lesson.component';
import { ProgressBarComponent } from '@modules/progress-bar/progress-bar.component';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LearningPageUx } from '@uxs/learning-page-ux/learning-page.ux';

const routes: Routes = [
  {
    path: '',
    component: LearningPageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NzLayoutModule,
    NzMenuModule,
    NzIconModule,
    NzButtonModule,
    NzInputModule,
    FormsModule,
    CommonModule,
    NzModalModule,

    ReviewLessonComponent,
    ProgressBarComponent,
    LearningPageUx,
  ],
  declarations: [LearningPageComponent],
})
export class LearningPageModule {}
