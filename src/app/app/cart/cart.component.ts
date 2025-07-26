import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService, ErrorService } from '../../core/services';
import { CartItem } from '../../core/models/product.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnDestroy {
  cartItems: CartItem[] = [];
  loading = true;
  private cartSubscription: Subscription | undefined;

  constructor(
    private cartService: CartService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.cartSubscription = this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.cartService.updateQuantity(productId, quantity);
    }
  }

  removeFromCart(productId: number) {
    const item = this.cartItems.find((item) => item.product.id === productId);
    if (item) {
      this.cartService.removeFromCart(productId);
      this.errorService.addError(
        `${item.product.title} removed from cart`,
        'info'
      );
    }
  }

  clearCart() {
    this.cartService.clearCart();
    this.errorService.addError('Cart cleared', 'info');
  }

  getCartTotal(): number {
    return this.cartService.getCartTotal();
  }

  getCartItemCount(): number {
    return this.cartService.getCartItemCount();
  }

  getItemTotal(item: CartItem): number {
    return item.product.price * item.quantity;
  }

  isCartEmpty(): boolean {
    return this.cartItems.length === 0;
  }
}
