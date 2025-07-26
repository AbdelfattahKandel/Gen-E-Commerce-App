import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem, Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  public cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage(): void {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartItemsSubject.next(JSON.parse(cart));
    }
  }

  private saveCartToStorage(cart: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  addToCart(product: Product, quantity: number = 1): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find(
      (item) => item.product.id === product.id
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      this.updateCart([...currentCart]);
    } else {
      const newItem: CartItem = { product, quantity };
      this.updateCart([...currentCart, newItem]);
    }
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter(
      (item) => item.product.id !== productId
    );
    this.updateCart(updatedCart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart
      .map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
      .filter((item) => item.quantity > 0);

    this.updateCart(updatedCart);
  }

  clearCart(): void {
    this.updateCart([]);
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  getCartTotal(): number {
    return this.cartItemsSubject.value.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  }

  getCartItemCount(): number {
    return this.cartItemsSubject.value.reduce(
      (count, item) => count + item.quantity,
      0
    );
  }

  private updateCart(cart: CartItem[]): void {
    this.cartItemsSubject.next(cart);
    this.saveCartToStorage(cart);
  }

  isProductInCart(productId: number): boolean {
    return this.cartItemsSubject.value.some(
      (item) => item.product.id === productId
    );
  }

  getProductQuantity(productId: number): number {
    const item = this.cartItemsSubject.value.find(
      (item) => item.product.id === productId
    );
    return item ? item.quantity : 0;
  }
}
