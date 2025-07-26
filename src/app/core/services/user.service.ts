import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User, Order } from '../models/user.interface';
import { CartItem } from '../models/product.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'https://fakestoreapi.com';

  private mockOrders: Order[] = [
    {
      id: 1,
      userId: 1,
      date: new Date('2024-01-15').toISOString(),
      products: [
        { productId: 1, quantity: 2 },
        { productId: 3, quantity: 1 },
      ],
      total: 299.98,
      status: 'delivered',
    },
    {
      id: 2,
      userId: 2,
      date: new Date('2024-01-20').toISOString(),
      products: [
        { productId: 5, quantity: 1 },
        { productId: 7, quantity: 3 },
      ],
      total: 189.97,
      status: 'processing',
    },
    {
      id: 3,
      userId: 3,
      date: new Date('2024-01-25').toISOString(),
      products: [
        { productId: 2, quantity: 1 },
        { productId: 4, quantity: 2 },
        { productId: 6, quantity: 1 },
      ],
      total: 459.95,
      status: 'shipped',
    },
    {
      id: 4,
      userId: 1,
      date: new Date('2024-02-01').toISOString(),
      products: [{ productId: 8, quantity: 1 }],
      total: 89.99,
      status: 'pending',
    },
    {
      id: 5,
      userId: 2,
      date: new Date('2024-02-05').toISOString(),
      products: [
        { productId: 9, quantity: 2 },
        { productId: 10, quantity: 1 },
      ],
      total: 179.98,
      status: 'delivered',
    },
    {
      id: 6,
      userId: 3,
      date: new Date('2024-02-10').toISOString(),
      products: [
        { productId: 11, quantity: 1 },
        { productId: 12, quantity: 1 },
      ],
      total: 159.98,
      status: 'cancelled',
    },
    {
      id: 7,
      userId: 1,
      date: new Date('2024-02-15').toISOString(),
      products: [{ productId: 13, quantity: 3 }],
      total: 269.97,
      status: 'processing',
    },
    {
      id: 8,
      userId: 2,
      date: new Date('2024-02-20').toISOString(),
      products: [
        { productId: 14, quantity: 1 },
        { productId: 15, quantity: 2 },
      ],
      total: 199.98,
      status: 'shipped',
    },
  ];

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  private transformUserData(user: any): User {
    return {
      ...user,
      role: user.id <= 3 ? 'admin' : 'user',
    };
  }

  private getRealUsers(): User[] {
    return [
      {
        id: 1,
        email: 'abdelfattah@example.com',
        username: 'abdelfattah',
        password: 'password123',
        name: {
          firstname: 'عبدالفتاح',
          lastname: 'عاطف',
        },
        address: {
          city: 'المنوفية',
          street: 'شارع النيل',
          number: 123,
          zipcode: '11511',
          geolocation: {
            lat: '30.0444',
            long: '31.2357',
          },
        },
        phone: '+201234567890',
        role: 'admin',
      },
      {
        id: 2,
        email: 'tarek@example.com',
        username: 'tarek',
        password: 'password123',
        name: {
          firstname: 'طارق',
          lastname: 'رمضان',
        },
        address: {
          city: 'مدينة نصر',
          street: 'شارع المحرق',
          number: 456,
          zipcode: '21500',
          geolocation: {
            lat: '31.2001',
            long: '29.9187',
          },
        },
        phone: '+201234567891',
        role: 'admin',
      },
      {
        id: 3,
        email: 'ali@example.com',
        username: 'ali',
        password: 'password123',
        name: {
          firstname: 'علي',
          lastname: 'عبدالفتاح',
        },
        address: {
          city: 'الجيزة',
          street: 'شارع الهرم',
          number: 789,
          zipcode: '12511',
          geolocation: {
            lat: '29.9792',
            long: '31.1342',
          },
        },
        phone: '+201234567892',
        role: 'admin',
      },
    ];
  }

  getUserProfile(userId: number): Observable<User> {
    const realUsers = this.getRealUsers();
    const user = realUsers.find((u) => u.id === userId);
    if (user) {
      return of(user);
    }
    return throwError(() => new Error('User not found'));
  }

  updateUserProfile(userId: number, userData: Partial<User>): Observable<User> {
    const realUsers = this.getRealUsers();
    const userIndex = realUsers.findIndex((u) => u.id === userId);
    if (userIndex !== -1) {
      const updatedUser = { ...realUsers[userIndex], ...userData };
      return of(updatedUser);
    }
    return throwError(() => new Error('User not found'));
  }

  getUserOrders(userId: number): Observable<Order[]> {
    const userOrders = this.mockOrders.filter(
      (order) => order.userId === userId
    );
    return of(userOrders);
  }

  createOrder(userId: number, cartItems: CartItem[]): Observable<Order> {
    const newOrder: Order = {
      id: this.mockOrders.length + 1,
      userId,
      date: new Date().toISOString(),
      products: cartItems.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      })),
      total: cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
      status: 'pending',
    };

    this.mockOrders.push(newOrder);
    return of(newOrder);
  }

  getAllUsers(): Observable<User[]> {
    return of(this.getRealUsers());
  }

  deleteUser(userId: number): Observable<void> {
    this.mockOrders = this.mockOrders.filter(
      (order) => order.userId !== userId
    );
    return of(void 0);
  }

  getAllOrders(): Observable<Order[]> {
    return of([...this.mockOrders]);
  }

  updateOrderStatus(
    orderId: number,
    status: Order['status']
  ): Observable<Order> {
    const orderIndex = this.mockOrders.findIndex(
      (order) => order.id === orderId
    );
    if (orderIndex !== -1) {
      this.mockOrders[orderIndex] = {
        ...this.mockOrders[orderIndex],
        status,
      };
      return of(this.mockOrders[orderIndex]);
    }
    return throwError(() => new Error('Order not found'));
  }
}
