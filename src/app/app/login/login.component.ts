import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService, ErrorService, LoadingService } from '../../core/services';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  credentials = {
    email: '',
    password: '',
  };
  showPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private errorService: ErrorService,
    private loadingService: LoadingService
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSubmit() {
    if (!this.credentials.email || !this.credentials.password) {
      this.errorService.addError('Please fill in all fields', 'error');
      return;
    }

    this.loadingService.setLoadingState('login', true);

    this.authService.login(this.credentials).subscribe({
      next: (user) => {
        this.loadingService.setLoadingState('login', false);
        this.errorService.addError(
          `Welcome back, ${user.name.firstname}!`,
          'info'
        );

        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.loadingService.setLoadingState('login', false);
        this.errorService.addError(
          error.message || 'Login failed. Please check your credentials.',
          'error'
        );
      },
    });
  }
}
