import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLoginMode = true;
  loading = false;
  showPassword = false;
  showConfirmPassword = false;

  // Form data
  formData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  // Form validation
  errors = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.resetForm();
  }

  resetForm() {
    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
    this.errors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  validateForm(): boolean {
    this.errors = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
    };

    let isValid = true;

    if (!this.isLoginMode) {
      if (!this.formData.firstName.trim()) {
        this.errors.firstName = 'First name is required';
        isValid = false;
      }

      if (!this.formData.lastName.trim()) {
        this.errors.lastName = 'Last name is required';
        isValid = false;
      }

      if (!this.formData.phone.trim()) {
        this.errors.phone = 'Phone number is required';
        isValid = false;
      }
    }

    if (!this.formData.email.trim()) {
      this.errors.email = 'Email is required';
      isValid = false;
    } else if (!this.isValidEmail(this.formData.email)) {
      this.errors.email = 'Please enter a valid email';
      isValid = false;
    }

    if (!this.formData.password) {
      this.errors.password = 'Password is required';
      isValid = false;
    } else if (this.formData.password.length < 6) {
      this.errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (
      !this.isLoginMode &&
      this.formData.password !== this.formData.confirmPassword
    ) {
      this.errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    return isValid;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  onSubmit() {
    if (this.validateForm()) {
      this.loading = true;

      // Simulate API call
      setTimeout(() => {
        this.loading = false;
        if (this.isLoginMode) {
          console.log('Login attempt:', {
            email: this.formData.email,
            password: this.formData.password,
          });
          // Handle login logic here
        } else {
          console.log('Register attempt:', this.formData);
          // Handle register logic here
        }
      }, 2000);
    }
  }

  onSocialLogin(provider: string) {
    console.log(`${provider} login clicked`);
    // Handle social login logic here
  }
}
