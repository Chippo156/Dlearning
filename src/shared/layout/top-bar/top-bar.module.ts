import { NgModule } from '@angular/core';

import { TopBarComponent } from './top-bar.component';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [RouterModule],
  declarations: [TopBarComponent],
  exports: [TopBarComponent],
})
export class TopBarModule {}
