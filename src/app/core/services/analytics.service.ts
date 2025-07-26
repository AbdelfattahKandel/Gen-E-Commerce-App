import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: Date;
}

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AnalyticsService {
  private events: AnalyticsEvent[] = [];

  constructor(private router: Router) {
    this.trackPageViews();
  }

  private trackPageViews(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        const navigationEnd = event as NavigationEnd;
        this.trackEvent('page_view', 'navigation', 'page_view', navigationEnd.urlAfterRedirects);
      });
  }

  trackEvent(event: string, category: string, action: string, label?: string, value?: number): void {
    const analyticsEvent: AnalyticsEvent = {
      event,
      category,
      action,
      label,
      value,
      timestamp: new Date(),
    };

    this.events.push(analyticsEvent);
    this.sendToAnalytics(analyticsEvent);
  }

  trackUserAction(action: string, label?: string, value?: number): void {
    this.trackEvent('user_action', 'user_interaction', action, label, value);
  }

  trackProductView(productId: number, productName: string): void {
    this.trackEvent('product_view', 'ecommerce', 'view_item', productName, productId);
  }

  trackAddToCart(productId: number, productName: string, price: number): void {
    this.trackEvent('add_to_cart', 'ecommerce', 'add_to_cart', productName, price);
  }

  trackPurchase(orderId: string, total: number): void {
    this.trackEvent('purchase', 'ecommerce', 'purchase', orderId, total);
  }

  trackLogin(method: string): void {
    this.trackEvent('login', 'authentication', 'login', method);
  }

  trackRegistration(method: string): void {
    this.trackEvent('registration', 'authentication', 'sign_up', method);
  }

  trackSearch(query: string, resultsCount: number): void {
    this.trackEvent('search', 'search', 'search', query, resultsCount);
  }

  private sendToAnalytics(event: AnalyticsEvent): void {
    // In a real application, you would send this to Google Analytics, Mixpanel, etc.
    console.log('Analytics Event:', event);
    
    // Example: Google Analytics 4
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  }

  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getEventsByCategory(category: string): AnalyticsEvent[] {
    return this.events.filter(event => event.category === category);
  }

  getEventsByDateRange(startDate: Date, endDate: Date): AnalyticsEvent[] {
    return this.events.filter(event => 
      event.timestamp >= startDate && event.timestamp <= endDate
    );
  }

  clearEvents(): void {
    this.events = [];
  }
} 