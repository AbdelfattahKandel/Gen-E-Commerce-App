import { Component, ErrorHandler, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-boundary',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-boundary" *ngIf="hasError">
      <div class="error-container">
        <div class="error-icon">
          <i class="fas fa-exclamation-triangle"></i>
        </div>
        <h2 class="error-title">Oops! Something went wrong</h2>
        <p class="error-message">
          {{ errorMessage || 'An unexpected error occurred. Please try refreshing the page.' }}
        </p>
        <div class="error-actions">
          <button class="btn btn-primary" (click)="retry()">
            <i class="fas fa-redo"></i>
            Try Again
          </button>
          <button class="btn btn-outline" (click)="goHome()">
            <i class="fas fa-home"></i>
            Go Home
          </button>
          <button class="btn btn-outline" (click)="refresh()">
            <i class="fas fa-sync"></i>
            Refresh Page
          </button>
        </div>
        <div class="error-details" *ngIf="showDetails">
          <details>
            <summary>Error Details</summary>
            <pre class="error-stack">{{ errorStack }}</pre>
          </details>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .error-boundary {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      padding: 2rem;
    }

    .error-container {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(10px);
      border-radius: 16px;
      padding: 3rem;
      text-align: center;
      max-width: 500px;
      width: 100%;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .error-icon {
      font-size: 4rem;
      color: #ef4444;
      margin-bottom: 1rem;
    }

    .error-title {
      color: #1f2937;
      font-size: 1.875rem;
      font-weight: 700;
      margin-bottom: 1rem;
    }

    .error-message {
      color: #6b7280;
      font-size: 1.125rem;
      margin-bottom: 2rem;
      line-height: 1.6;
    }

    .error-actions {
      display: flex;
      flex-direction: column;
      gap: 1rem;
      margin-bottom: 2rem;
    }

    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      cursor: pointer;
      border: none;
      font-size: 1rem;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
    }

    .btn-primary:hover {
      background: #1d4ed8;
      transform: translateY(-2px);
    }

    .btn-outline {
      background: transparent;
      color: #374151;
      border: 2px solid #d1d5db;
    }

    .btn-outline:hover {
      background: #f9fafb;
      border-color: #9ca3af;
      transform: translateY(-2px);
    }

    .error-details {
      margin-top: 2rem;
      text-align: left;
    }

    .error-details summary {
      color: #374151;
      font-weight: 600;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 4px;
      background: #f3f4f6;
    }

    .error-details summary:hover {
      background: #e5e7eb;
    }

    .error-stack {
      background: #1f2937;
      color: #f3f4f6;
      padding: 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
      overflow-x: auto;
      margin-top: 0.5rem;
      white-space: pre-wrap;
      word-break: break-word;
    }

    @media (max-width: 640px) {
      .error-container {
        padding: 2rem;
        margin: 1rem;
      }

      .error-title {
        font-size: 1.5rem;
      }

      .error-message {
        font-size: 1rem;
      }

      .error-actions {
        flex-direction: column;
      }
    }

    @media (prefers-color-scheme: dark) {
      .error-container {
        background: rgba(31, 41, 55, 0.95);
        color: #f3f4f6;
      }

      .error-title {
        color: #f3f4f6;
      }

      .error-message {
        color: #d1d5db;
      }

      .btn-outline {
        color: #f3f4f6;
        border-color: #4b5563;
      }

      .btn-outline:hover {
        background: #374151;
        border-color: #6b7280;
      }

      .error-details summary {
        color: #f3f4f6;
        background: #374151;
      }

      .error-details summary:hover {
        background: #4b5563;
      }
    }
  `]
})
export class ErrorBoundaryComponent {
  private router = inject(Router);
  private errorHandler = inject(ErrorHandler);

  hasError = false;
  errorMessage = '';
  errorStack = '';
  showDetails = false;

  handleError(error: Error): void {
    console.error('Error caught by boundary:', error);
    
    this.hasError = true;
    this.errorMessage = error.message || 'An unexpected error occurred';
    this.errorStack = error.stack || '';
    
    // Check if it's a chunk loading error
    if (error.message.includes('Failed to fetch dynamically imported module') || 
        error.message.includes('Loading chunk') ||
        error.message.includes('ChunkLoadFailed')) {
      this.errorMessage = 'Failed to load page content. This might be due to a network issue or outdated cache.';
      this.showDetails = true;
    }

    // Report error to error handler
    this.errorHandler.handleError(error);
  }

  retry(): void {
    this.hasError = false;
    this.errorMessage = '';
    this.errorStack = '';
    this.showDetails = false;
    
    // Reload the current route
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigateByUrl(currentUrl);
    });
  }

  goHome(): void {
    this.hasError = false;
    this.errorMessage = '';
    this.errorStack = '';
    this.showDetails = false;
    this.router.navigate(['/']);
  }

  refresh(): void {
    window.location.reload();
  }
}
