import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService, CartService, ProductService } from '../../core/services';
import { User } from '../../core/models/user.interface';
import { Product } from '../../core/models/product.interface';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  showMobileNav = false;
  currentUser: User | null = null;
  cartItemCount = 0;

  // Search properties
  searchQuery = '';
  searchResults: Product[] = [];
  showSearchResults = false;
  allProducts: Product[] = [];

  private userSubscription: Subscription | undefined;
  private cartSubscription: Subscription | undefined;

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userSubscription = this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
    });

    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });

    // Load all products for search
    this.loadProducts();
  }

  private loadProducts() {
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts = products;
    });
  }

  onSearchInput() {
    if (this.searchQuery.trim().length > 0) {
      this.searchResults = this.allProducts.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase())
      );
      this.showSearchResults = true;
    } else {
      this.searchResults = [];
      this.showSearchResults = false;
    }
  }

  onSearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/products'], {
        queryParams: { search: this.searchQuery },
      });
      this.clearSearch();
    }
  }

  clearSearch() {
    this.searchQuery = '';
    this.searchResults = [];
    this.showSearchResults = false;
  }

  selectProduct(product: Product) {
    this.router.navigate(['/product', product.id]);
    this.clearSearch();
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  toggleMobileNav() {
    this.showMobileNav = !this.showMobileNav;
  }

  closeMobileNav() {
    this.showMobileNav = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
}
