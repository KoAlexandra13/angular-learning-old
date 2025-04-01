import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class AuthComponent {
  authForm: FormGroup;
  isLoginMode = true;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.authForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      return;
    }

    const { email, password } = this.authForm.value;

    if (this.isLoginMode) {
      this.authService.login(email, password).subscribe(isLoggedIn => {
        if (isLoggedIn.length > 0) {
          this.router.navigate(['/']);
          this.errorMessage = null;
        } else {
          this.errorMessage = 'Invalid credentials!';
        }
      });
    } else {
      this.authService.register(email, password).subscribe(() => {
        this.authService.login(email, password).subscribe(() => {
          this.router.navigate(['/']);
        });
      });
    }
  }
}