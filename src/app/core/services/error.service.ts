import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface AppError {
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
  code?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private errorsSubject = new BehaviorSubject<AppError[]>([]);
  public errors$ = this.errorsSubject.asObservable();

  addError(
    message: string,
    type: AppError['type'] = 'error',
    code?: string
  ): void {
    const error: AppError = {
      message,
      type,
      timestamp: new Date(),
      code,
    };

    const currentErrors = this.errorsSubject.value;
    this.errorsSubject.next([...currentErrors, error]);

    // Auto-remove errors after 5 seconds
    setTimeout(() => {
      this.removeError(error);
    }, 5000);
  }

  removeError(error: AppError): void {
    const currentErrors = this.errorsSubject.value;
    const filteredErrors = currentErrors.filter((e) => e !== error);
    this.errorsSubject.next(filteredErrors);
  }

  clearErrors(): void {
    this.errorsSubject.next([]);
  }

  getErrors(): AppError[] {
    return this.errorsSubject.value;
  }

  handleHttpError(error: any): void {
    let message = 'An unexpected error occurred';

    if (error.status === 401) {
      message = 'Unauthorized access. Please login again.';
    } else if (error.status === 403) {
      message = "Access denied. You don't have permission for this action.";
    } else if (error.status === 404) {
      message = 'Resource not found.';
    } else if (error.status === 500) {
      message = 'Server error. Please try again later.';
    } else if (error.error?.message) {
      message = error.error.message;
    }

    this.addError(message, 'error', error.status?.toString());
  }
}
