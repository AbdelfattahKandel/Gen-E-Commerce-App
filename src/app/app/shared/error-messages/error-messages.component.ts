import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService, AppError } from '../../../core/services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css'],
})
export class ErrorMessagesComponent implements OnInit, OnDestroy {
  errors: AppError[] = [];
  private errorSubscription: Subscription | undefined;

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorSubscription = this.errorService.errors$.subscribe(errors => {
      this.errors = errors;
    });
  }

  ngOnDestroy() {
    if (this.errorSubscription) {
      this.errorSubscription.unsubscribe();
    }
  }

  removeError(error: AppError) {
    this.errorService.removeError(error);
  }

  getErrorClass(type: string): string {
    switch (type) {
      case 'error':
        return 'error-message';
      case 'warning':
        return 'warning-message';
      case 'info':
        return 'info-message';
      default:
        return 'error-message';
    }
  }

  getIcon(type: string): string {
    switch (type) {
      case 'error':
        return 'fa-exclamation-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-exclamation-circle';
    }
  }
}
