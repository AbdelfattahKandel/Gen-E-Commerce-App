import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  ProductService,
  CartService,
  LoadingService,
  ErrorService,
} from '../../core/services';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  quantity = 1;
  relatedProducts: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const productId = +params['id'];
      if (productId) {
        this.loadProduct(productId);
      }
    });
  }

  private loadProduct(productId: number) {
    this.loadingService.setLoadingState('product-details', true);

    this.productService.getProductById(productId).subscribe({
      next: (product) => {
        this.product = product;
        this.loading = false;
        this.loadingService.setLoadingState('product-details', false);
        this.loadRelatedProducts(product.category);
      },
      error: (error) => {
        this.errorService.handleHttpError(error);
        this.loading = false;
        this.loadingService.setLoadingState('product-details', false);
        this.router.navigate(['/products']);
      },
    });
  }

  private loadRelatedProducts(category: string) {
    this.productService.getProductsByCategory(category).subscribe({
      next: (products) => {
        // Get 4 related products, excluding current product
        this.relatedProducts = products
          .filter((p) => p.id !== this.product?.id)
          .slice(0, 4);
      },
      error: (error) => {
        this.errorService.handleHttpError(error);
      },
    });
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
      this.errorService.addError(
        `${this.product.title} added to cart!`,
        'info'
      );
    }
  }

  updateQuantity(change: number) {
    const newQuantity = this.quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      this.quantity = newQuantity;
    }
  }

  isProductInCart(): boolean {
    return this.product
      ? this.cartService.isProductInCart(this.product.id)
      : false;
  }

  getProductQuantity(): number {
    return this.product
      ? this.cartService.getProductQuantity(this.product.id)
      : 0;
  }

  getStarRating(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return Array(5)
      .fill(0)
      .map((_, i) => {
        if (i < fullStars) return 1; // Full star
        if (i === fullStars && hasHalfStar) return 0.5; // Half star
        return 0; // Empty star
      });
  }
}
