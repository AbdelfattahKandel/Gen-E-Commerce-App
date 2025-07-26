import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, LoadingService, ErrorService } from '../../core/services';
import { RegisterRequest } from '../../core/models/user.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading = false;
  registerData: RegisterRequest = {
    email: '',
    username: '',
    password: '',
    name: {
      firstname: '',
      lastname: '',
    },
    address: {
      city: '',
      street: '',
      number: 0,
      zipcode: '',
    },
    phone: '',
  };
  confirmPassword = '';
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    // Check if user is already logged in
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    if (!this.validateForm()) {
      return;
    }

    this.loading = true;
    this.loadingService.setLoadingState('register', true);

    this.authService.register(this.registerData).subscribe({
      next: (user) => {
        this.loading = false;
        this.loadingService.setLoadingState('register', false);
        this.errorService.addError(
          `Welcome, ${user.name.firstname}! Registration successful.`,
          'info'
        );
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.loading = false;
        this.loadingService.setLoadingState('register', false);
        this.errorService.addError(
          'Registration failed. Please try again.',
          'error'
        );
      },
    });
  }

  private validateForm(): boolean {
    if (
      !this.registerData.email ||
      !this.registerData.password ||
      !this.registerData.username ||
      !this.registerData.name.firstname ||
      !this.registerData.name.lastname
    ) {
      this.errorService.addError('Please fill in all required fields', 'error');
      return false;
    }

    if (this.registerData.password !== this.confirmPassword) {
      this.errorService.addError('Passwords do not match', 'error');
      return false;
    }

    if (this.registerData.password.length < 6) {
      this.errorService.addError(
        'Password must be at least 6 characters long',
        'error'
      );
      return false;
    }

    if (!this.isValidEmail(this.registerData.email)) {
      this.errorService.addError('Please enter a valid email address', 'error');
      return false;
    }

    return true;
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onGoogleSignUp() {
    this.errorService.addError('Google sign up is not implemented yet', 'info');
  }

  onFacebookSignUp() {
    this.errorService.addError(
      'Facebook sign up is not implemented yet',
      'info'
    );
  }
}
