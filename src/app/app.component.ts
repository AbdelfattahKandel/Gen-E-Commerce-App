import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './app/header/header.component';
import { FooterComponent } from './app/footer/footer.component';
import { ErrorMessagesComponent } from './app/shared/error-messages/error-messages.component';
import { ErrorBoundaryComponent } from './app/shared/error-boundary/error-boundary.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    ErrorMessagesComponent,
    ErrorBoundaryComponent,
  ],
  template: `
    <app-error-boundary />
    <app-error-messages />
    <app-header />
    <main>
      <router-outlet />
    </main>
    <app-footer />
  `,
  styles: [
    `
      main {
        min-height: calc(100vh - 200px);
      }
    `,
  ],
})
export class AppComponent {}
