import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FavouritePageComponent } from './favourites-page.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavouritesComponent } from '@modules/favourites/favourites.component';
import { NzTabLinkTemplateDirective } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

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
    NzButtonModule,
    NzMessageModule,
    NzIconModule,
    DecimalPipe,
    FormsModule,
    CommonModule,
    FavouritesComponent,
    NzTabLinkTemplateDirective,
  ],
  declarations: [FavouritePageComponent],
})
export class FavouritesPageModule {}
