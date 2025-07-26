# Core Services Documentation

## Overview

This directory contains all core services, guards, interceptors, and models for the GenCommerce application.

## Services

### AuthService

- **Purpose**: Handles user authentication and authorization
- **Key Methods**:
  - `login(credentials)`: Authenticate user
  - `register(userData)`: Register new user
  - `logout()`: Clear user session
  - `isAuthenticated()`: Check if user is logged in
  - `isAdmin()`: Check if user has admin role

### CartService

- **Purpose**: Manages shopping cart functionality
- **Key Methods**:
  - `addToCart(product, quantity)`: Add product to cart
  - `removeFromCart(productId)`: Remove product from cart
  - `updateQuantity(productId, quantity)`: Update product quantity
  - `getCartTotal()`: Calculate cart total
  - `getCartItemCount()`: Get total items in cart

### ProductService

- **Purpose**: Handles product-related API calls
- **Key Methods**:
  - `getAllProducts()`: Fetch all products
  - `getProductById(id)`: Get specific product
  - `getProductsByCategory(category)`: Filter by category
  - `getAllCategories()`: Get all product categories

### UserService

- **Purpose**: Manages user profiles and orders
- **Key Methods**:
  - `getUserProfile(userId)`: Get user profile
  - `updateUserProfile(userId, userData)`: Update user profile
  - `getUserOrders(userId)`: Get user orders
  - `createOrder(userId, cartItems)`: Create new order

### ErrorService

- **Purpose**: Centralized error handling
- **Key Methods**:
  - `addError(message, type, code)`: Add error to queue
  - `handleHttpError(error)`: Handle HTTP errors
  - `clearErrors()`: Clear all errors

### LoadingService

- **Purpose**: Manages loading states
- **Key Methods**:
  - `show()/hide()`: Global loading
  - `setLoadingState(key, isLoading)`: Component-specific loading
  - `isAnyLoading()`: Check if any loading is active

## Guards

### AuthGuard

- **Purpose**: Protects routes requiring authentication
- **Usage**: `canActivate: [authGuard]`

### AdminGuard

- **Purpose**: Protects admin-only routes
- **Usage**: `canActivate: [adminGuard]`

## Interceptors

### AuthInterceptor

- **Purpose**: Automatically adds JWT token to HTTP requests
- **Configuration**: Registered in `app.config.ts`

## Models

### User Interface

```typescript
interface User {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  address: Address;
  phone: string;
  role: "user" | "admin";
}
```

### Product Interface

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}
```

## Usage Examples

### Injecting Services

```typescript
import { AuthService, ProductService, CartService } from '@core/services';

constructor(
  private authService: AuthService,
  private productService: ProductService,
  private cartService: CartService
) {}
```

### Using Guards in Routes

```typescript
{
  path: 'profile',
  component: UserProfileComponent,
  canActivate: [authGuard]
},
{
  path: 'admin',
  component: AdminComponent,
  canActivate: [adminGuard]
}
```

## API Integration

All services are configured to work with FakeStoreAPI (https://fakestoreapi.com) as the backend data source.
