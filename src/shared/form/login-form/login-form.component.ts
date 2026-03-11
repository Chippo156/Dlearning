import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginRequest } from '../../../models/request/login-request.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  constructor(private fb: FormBuilder) {}
  @Input() loading: boolean = false;
  @Output() loginSubmit = new EventEmitter<LoginRequest>();

  loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(5)]],
  });
  handleLogin() {
    if (this.loginForm.valid) {
      this.loginSubmit.emit(this.loginForm.getRawValue());
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  handleGoogleLogin() {
    console.log('Google login');
  }

  handleFacebookLogin() {
    console.log('Facebook login');
  }

  handleGithubLogin() {
    console.log('Github login');
  }
}
