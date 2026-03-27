import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { FormsModule } from '@angular/forms';
import { DepositPageComponent } from './deposit-page.component';
import { CommonModule, DecimalPipe } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: DepositPageComponent,
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    NzButtonModule,
    NzInputModule,
    NzIconModule,
    NzMessageModule,
    FormsModule,
    DecimalPipe,
    CommonModule,
  ],
  declarations: [DepositPageComponent],
})
export class DepositPageModule {}
