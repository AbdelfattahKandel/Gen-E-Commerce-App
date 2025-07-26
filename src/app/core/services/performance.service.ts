import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: Date;
  category: string;
}

export interface PageLoadMetrics {
  url: string;
  loadTime: number;
  domContentLoaded: number;
  firstContentfulPaint?: number;
  largestContentfulPaint?: number;
  timestamp: Date;
}

  declare global {
  interface Window {
    gtag?: (command: string, targetId: string, config?: any) => void;
  }
}

@Injectable({
  providedIn: 'root',
})
export class PerformanceService {
  private metrics: PerformanceMetric[] = [];
  private pageLoads: PageLoadMetrics[] = [];

  constructor(private router: Router) {
    this.initializePerformanceMonitoring();
  }

  private initializePerformanceMonitoring(): void {

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.measurePageLoad();
      });


    this.monitorCoreWebVitals();
  }

  private measurePageLoad(): void {
    if (typeof window !== 'undefined' && window.performance) {
      const navigation = performance.getEntriesByType(
        'navigation'
      )[0] as PerformanceNavigationTiming;

      if (navigation) {
        const pageLoad: PageLoadMetrics = {
          url: this.router.url,
          loadTime: navigation.loadEventEnd - navigation.loadEventStart,
          domContentLoaded:
            navigation.domContentLoadedEventEnd -
            navigation.domContentLoadedEventStart,
          timestamp: new Date(),
        };

        this.pageLoads.push(pageLoad);
        this.logPerformanceMetric(
          'page_load_time',
          pageLoad.loadTime,
          'navigation'
        );
      }
    }
  }

  private monitorCoreWebVitals(): void {
    if (typeof window !== 'undefined') {

      this.observeLCP();


      this.observeFID();


      this.observeCLS();
    }
  }

  private observeLCP(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];

        this.logPerformanceMetric(
          'lcp',
          lastEntry.startTime,
          'core_web_vitals'
        );
      });

      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }

  private observeFID(): void {
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {

          const firstInputEntry = entry as any;
          if (firstInputEntry.processingStart) {
            this.logPerformanceMetric(
              'fid',
              firstInputEntry.processingStart - firstInputEntry.startTime,
              'core_web_vitals'
            );
          }
        });
      });

      observer.observe({ entryTypes: ['first-input'] });
    }
  }

  private observeCLS(): void {
    if ('PerformanceObserver' in window) {
      let clsValue = 0;
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        });

        this.logPerformanceMetric('cls', clsValue, 'core_web_vitals');
      });

      observer.observe({ entryTypes: ['layout-shift'] });
    }
  }

  logPerformanceMetric(name: string, value: number, category: string): void {
    const metric: PerformanceMetric = {
      name,
      value,
      category,
      timestamp: new Date(),
    };

    this.metrics.push(metric);
    this.sendToAnalytics(metric);
  }

  measureApiCall(url: string, startTime: number, endTime: number): void {
    const duration = endTime - startTime;
    this.logPerformanceMetric('api_call_duration', duration, 'api');

    if (duration > 1000) {
      console.warn(`Slow API call detected: ${url} took ${duration}ms`);
    }
  }

  measureComponentRender(componentName: string, renderTime: number): void {
    this.logPerformanceMetric(
      `${componentName}_render_time`,
      renderTime,
      'component'
    );
  }

  measureUserInteraction(interactionName: string, duration: number): void {
    this.logPerformanceMetric(
      `user_interaction_${interactionName}`,
      duration,
      'user_interaction'
    );
  }

  getMemoryUsage(): number {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return (memory.usedJSHeapSize / memory.totalJSHeapSize) * 100;
    }
    return 0;
  }

  getMetricsByCategory(category: string): PerformanceMetric[] {
    return this.metrics.filter((metric) => metric.category === category);
  }

  getMetricsByTimeRange(startDate: Date, endDate: Date): PerformanceMetric[] {
    return this.metrics.filter(
      (metric) => metric.timestamp >= startDate && metric.timestamp <= endDate
    );
  }

  getAverageMetric(name: string): number {
    const metrics = this.metrics.filter((metric) => metric.name === name);
    if (metrics.length === 0) return 0;

    const sum = metrics.reduce((acc, metric) => acc + metric.value, 0);
    return sum / metrics.length;
  }

  getSlowestPages(limit: number = 5): PageLoadMetrics[] {
    return this.pageLoads
      .sort((a, b) => b.loadTime - a.loadTime)
      .slice(0, limit);
  }

  private sendToAnalytics(metric: PerformanceMetric): void {

    console.log('Performance Metric:', metric);


    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value,
        metric_category: metric.category,
      });
    }
  }

  clearMetrics(): void {
    this.metrics = [];
    this.pageLoads = [];
  }

  generatePerformanceReport(): any {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const recentMetrics = this.getMetricsByTimeRange(last24Hours, now);

    return {
      totalMetrics: this.metrics.length,
      recentMetrics: recentMetrics.length,
      averagePageLoadTime: this.getAverageMetric('page_load_time'),
      averageLCP: this.getAverageMetric('lcp'),
      averageFID: this.getAverageMetric('fid'),
      averageCLS: this.getAverageMetric('cls'),
      slowestPages: this.getSlowestPages(),
      memoryUsage: this.getMemoryUsage(),
      reportGeneratedAt: now,
    };
  }
}
