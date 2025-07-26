import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LoadingService,
  ErrorService,
  UserService,
  ProductService,
  CartService,
} from '../../core/services';
import { User, Order } from '../../core/models/user.interface';
import { Product } from '../../core/models/product.interface';

interface UserStats {
  totalOrders: number;
  totalSpent: number;
  wishlistItems: number;
  reviews: number;
}

interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
  userId: number;
}

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  loading = true;
  tab: 'overview' | 'orders' | 'wishlist' | 'profile' = 'overview';
  currentUser: User | null = null;


  userStats: UserStats = {
    totalOrders: 0,
    totalSpent: 0,
    wishlistItems: 0,
    reviews: 0,
  };


  recentOrders: Order[] = [];


  wishlistItems: WishlistItem[] = [];


  allOrders: Order[] = [];

  constructor(
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private userService: UserService,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.loadingService.setLoadingState('user-dashboard', true);


    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      this.currentUser = JSON.parse(currentUserStr);
      if (this.currentUser?.id) {
        this.loadUserData(this.currentUser.id);
      }
    }


    setTimeout(() => {
      this.loading = false;
      this.loadingService.setLoadingState('user-dashboard', false);
    }, 1500);
  }

  private loadUserData(userId: number) {

    this.userService.getUserOrders(userId).subscribe({
      next: (orders) => {
        this.allOrders = orders;
        this.recentOrders = orders.slice(0, 5); // Get last 5 orders
        this.userStats.totalOrders = orders.length;
        this.userStats.totalSpent = orders.reduce(
          (sum, order) => sum + order.total,
          0
        );
      },
      error: (error) => {
        this.errorService.addError('Failed to load orders', 'error');
      },
    });


    this.productService.getAllProducts().subscribe({
      next: (products) => {

        this.wishlistItems = products.slice(0, 5).map((product, index) => ({
          id: index + 1,
          name: product.title,
          price: product.price,
          image: product.image,
          userId: userId,
        }));
        this.userStats.wishlistItems = this.wishlistItems.length;
      },
      error: (error) => {
        this.errorService.addError('Failed to load products', 'error');
      },
    });
  }

  setTab(newTab: 'overview' | 'orders' | 'wishlist' | 'profile') {
    this.tab = newTab;
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'delivered':
        return '#10b981';
      case 'processing':
        return '#f59e0b';
      case 'pending':
        return '#6b7280';
      case 'shipped':
        return '#3b82f6';
      case 'cancelled':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'delivered':
        return 'fa-solid fa-check-circle';
      case 'processing':
        return 'fa-solid fa-cog';
      case 'pending':
        return 'fa-solid fa-clock';
      case 'shipped':
        return 'fa-solid fa-shipping-fast';
      case 'cancelled':
        return 'fa-solid fa-times-circle';
      default:
        return 'fa-solid fa-circle';
    }
  }

  removeFromWishlist(itemId: number) {
    this.wishlistItems = this.wishlistItems.filter(
      (item) => item.id !== itemId
    );
    this.userStats.wishlistItems = this.wishlistItems.length;
    this.errorService.addError('Item removed from wishlist', 'info');
  }

  addToCart(item: WishlistItem) {

    this.productService.getAllProducts().subscribe({
      next: (products) => {
        const product = products.find((p) => p.title === item.name);
        if (product) {
          this.cartService.addToCart(product, 1);
          this.errorService.addError('Item added to cart', 'info');
        }
      },
      error: (error) => {
        this.errorService.addError('Failed to add item to cart', 'error');
      },
    });
  }
}
