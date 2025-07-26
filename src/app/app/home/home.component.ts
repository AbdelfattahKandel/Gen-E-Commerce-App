import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  loading = true;
  featuredProducts: Product[] = [];
  categories: string[] = [];

  constructor(
    private productService: ProductService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.loadFeaturedProducts();
    this.loadCategories();
  }

  private loadFeaturedProducts() {
    this.loadingService.setLoadingState('home-products', true);

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        // Get first 4 products as featured
        this.featuredProducts = products.slice(0, 4);
        this.loading = false;
        this.loadingService.setLoadingState('home-products', false);
      },
      error: (error) => {
        this.errorService.handleHttpError(error);
        this.loading = false;
        this.loadingService.setLoadingState('home-products', false);
      },
    });
  }

  private loadCategories() {
    this.productService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.errorService.handleHttpError(error);
      },
    });
  }

  getProductBadge(product: Product): string {
    if (product.rating.rate >= 4.5) return 'Top';
    if (product.price < 50) return 'Sale';
    return '';
  }
}
