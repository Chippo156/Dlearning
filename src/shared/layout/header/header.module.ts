import { NgModule } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { HeaderComponent } from './header.component';
import { CommonModule } from '@angular/common';
@NgModule({
  imports: [
    NzIconModule,
    NzAvatarModule,
    NzBadgeModule,
    NzDropDownModule,
    NzButtonModule,
    CommonModule,
  ],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class HeaderModule {}
