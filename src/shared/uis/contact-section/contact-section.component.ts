import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-contact-section',
  templateUrl: './contact-section.component.html',
  standalone: true,
  imports: [NzInputModule, NzFormModule, NzButtonModule, ReactiveFormsModule],
})
export class ContactSectionComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: [''],
      message: [''],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Success:', this.contactForm.value);
    } else {
      console.log('Failed');
    }
  }
}
