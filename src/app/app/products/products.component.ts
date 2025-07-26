import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  ProductService,
  CartService,
  LoadingService,
  ErrorService,
} from '../../core/services';
import { Product } from '../../core/models/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit, OnDestroy {
  loading = true;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];

  // Filtering
  selectedCategory = '';
  searchTerm = '';
  maxPrice = 1000;
  currentMaxPrice = 1000;

  // Pagination
  page = 1;
  pageSize = 6;
  total = 0;

  // Sorting
  selectedSort = 'newest';

  // Responsive sidebar
  isSidebarOpen = false;
  isMobile = false;

  private destroy$ = new Subject<void>();

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private loadingService: LoadingService,
    private errorService: ErrorService
  ) {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkScreenSize();
  }

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
    if (!this.isMobile) {
      this.isSidebarOpen = false;
    }
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  get activeFiltersCount(): number {
    let count = 0;
    if (this.searchTerm) count++;
    if (this.selectedCategory) count++;
    if (this.currentMaxPrice < this.maxPrice) count++;
    return count;
  }

  private loadProducts() {
    this.loadingService.setLoadingState('products', true);

    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.products = products;
          this.filteredProducts = products;
          this.total = products.length;
          this.loading = false;
          this.loadingService.setLoadingState('products', false);
          this.initializeSlider();
        },
        error: (error) => {
          this.errorService.handleHttpError(error);
          this.loading = false;
          this.loadingService.setLoadingState('products', false);
        },
      });
  }

  private loadCategories() {
    this.productService
      .getAllCategories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error: (error) => {
          this.errorService.handleHttpError(error);
        },
      });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product, 1);
    this.errorService.addError(`${product.title} added to cart!`, 'info');
  }

  filterProducts() {
    this.filteredProducts = this.products.filter((product) => {
      const matchesCategory =
        !this.selectedCategory || product.category === this.selectedCategory;
      const matchesSearch =
        !this.searchTerm ||
        product.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());
      const matchesPrice = product.price <= this.currentMaxPrice;

      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Apply sorting
    this.sortProducts();

    this.total = this.filteredProducts.length;
    this.page = 1; // Reset to first page when filtering
  }

  private sortProducts() {
    switch (this.selectedSort) {
      case 'price-low':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        this.filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        this.filteredProducts.sort((a, b) => b.rating.count - a.rating.count);
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'newest':
      default:
        // Keep original order (newest first based on ID)
        this.filteredProducts.sort((a, b) => b.id - a.id);
        break;
    }
  }

  onCategoryChange() {
    this.filterProducts();
  }

  onSearchChange() {
    this.filterProducts();
  }

  onPriceChange(event: any) {
    this.currentMaxPrice = parseInt(event.target.value);
    this.filterProducts();
  }

  clearFilters() {
    this.selectedCategory = '';
    this.searchTerm = '';
    this.currentMaxPrice = this.maxPrice;
    this.selectedSort = 'newest';
    this.filterProducts();
  }

  onSortChange() {
    this.filterProducts();
  }

  get pagedProducts() {
    const start = (this.page - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredProducts.slice(start, end);
  }

  setPage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.page = newPage;
    }
  }

  get totalPages() {
    return Math.ceil(this.total / this.pageSize);
  }

  get pageStart() {
    return (this.page - 1) * this.pageSize + 1;
  }

  get pageEnd() {
    return Math.min(this.page * this.pageSize, this.total);
  }

  initializeSlider() {
    setTimeout(() => {
      const slider = document.querySelector(
        '.price-slider'
      ) as HTMLInputElement;
      if (slider) {
        slider.value = this.maxPrice.toString();
        this.updateSliderBackground(slider);
        slider.addEventListener('input', (e) => {
          this.updateSliderBackground(e.target as HTMLInputElement);
        });
      }
    }, 100);
  }

  updateSliderBackground(slider: HTMLInputElement) {
    const value = parseInt(slider.value);
    const max = parseInt(slider.max);
    const percentage = (value / max) * 100;

    slider.style.background = `linear-gradient(to right, #2563eb 0%, #2563eb ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`;
  }

  isProductInCart(productId: number): boolean {
    return this.cartService.isProductInCart(productId);
  }
}
