import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { timeout, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  ProductService,
  LoadingService,
  ErrorService,
} from '../../core/services';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  loading = true;
  featuredProducts: Product[] = [];
  categories: string[] = [];
  error = false;
  showScrollTop = false;

  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadFeaturedProducts();
    this.loadCategories();
    this.setupScrollListener();
  }

  private setupScrollListener() {
    window.addEventListener('scroll', () => {
      this.showScrollTop = window.scrollY > 300;
      this.cdr.detectChanges();
    });
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  private loadFeaturedProducts() {
    this.loadingService.setLoadingState('home-products', true);
    this.error = false;

    this.productService
      .getAllProducts()
      .pipe(
        timeout(10000), // 10 seconds timeout
        catchError((error) => {
          console.error('Error loading products:', error);
          this.error = true;
          this.loading = false;
          this.loadingService.setLoadingState('home-products', false);
          this.cdr.detectChanges();
          return of([]);
        })
      )
      .subscribe({
        next: (products) => {
          this.featuredProducts = products.slice(0, 4);
          this.loading = false;
          this.loadingService.setLoadingState('home-products', false);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error in subscription:', error);
          this.errorService.handleHttpError(error);
          this.error = true;
          this.loading = false;
          this.loadingService.setLoadingState('home-products', false);
          this.cdr.detectChanges();
        },
      });
  }

  private loadCategories() {
    this.productService
      .getAllCategories()
      .pipe(
        timeout(5000), // 5 seconds timeout
        catchError((error) => {
          console.error('Error loading categories:', error);
          return of([]);
        })
      )
      .subscribe({
        next: (categories) => {
          this.categories = categories;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error in categories subscription:', error);
          this.errorService.handleHttpError(error);
          this.cdr.detectChanges();
        },
      });
  }

  getProductBadge(product: Product): string {
    if (product.rating.rate >= 4.5) return 'Top';
    if (product.price < 50) return 'Sale';
    return '';
  }

  retryLoad() {
    this.loading = true;
    this.error = false;
    this.loadFeaturedProducts();
  }
}
