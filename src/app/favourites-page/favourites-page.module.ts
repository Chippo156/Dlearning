import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FavouritePageComponent } from './favourites-page.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritesComponent } from '@shared/modules/favourites/favourites.component';

const routes: Routes = [
  {
    path: '',
    component: FavouritePageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NzBreadCrumbModule,
    NzPaginationModule,
    NzSpinModule,
    NzMessageModule,
    DecimalPipe,
    FormsModule,
    CommonModule,

    FavouritesComponent,
  ],
  declarations: [FavouritePageComponent],
})
export class FavouritesPageModule {}
