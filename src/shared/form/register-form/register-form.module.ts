import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RegisterComponent } from './register-form.component';
import { CommonModule } from '@angular/common';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@NgModule({
  imports: [
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,

    CommonModule,
    NzSpinModule,
    NzButtonModule,
  ],
  declarations: [RegisterComponent],
  exports: [RegisterComponent],
})
export class RegisterFormModule {}
