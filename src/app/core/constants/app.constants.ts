export const APP_CONSTANTS = {
  // API Configuration
  API_URL: 'https://fakestoreapi.com',

  // Pagination
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50,

  // Cache Configuration
  CACHE_TTL: 300000, // 5 minutes
  PRODUCTS_CACHE_KEY: 'products_cache',
  CATEGORIES_CACHE_KEY: 'categories_cache',

  // Form Validation
  MIN_PRODUCT_TITLE_LENGTH: 3,
  MAX_PRODUCT_TITLE_LENGTH: 100,
  MAX_PRODUCT_DESCRIPTION_LENGTH: 500,
  MAX_PRODUCT_PRICE: 10000,

  // Order Status
  ORDER_STATUSES: {
    PENDING: 'pending',
    PROCESSING: 'processing',
    SHIPPED: 'shipped',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  } as const,

  // User Roles
  USER_ROLES: {
    ADMIN: 'admin',
    USER: 'user',
  } as const,

  // Error Messages
  ERROR_MESSAGES: {
    REQUIRED_FIELD: 'This field is required',
    INVALID_EMAIL: 'Please enter a valid email address',
    INVALID_URL: 'Please enter a valid URL',
    MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
    MAX_LENGTH: (max: number) => `Cannot exceed ${max} characters`,
    MIN_VALUE: (min: number) => `Must be at least ${min}`,
    MAX_VALUE: (max: number) => `Cannot exceed ${max}`,
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'Unauthorized access. Please login again.',
    FORBIDDEN: "Access denied. You don't have permission for this action.",
    NOT_FOUND: 'Resource not found.',
    VALIDATION_ERROR: 'Please check your input and try again.',
  },

  // Success Messages
  SUCCESS_MESSAGES: {
    PRODUCT_ADDED: 'Product added successfully!',
    PRODUCT_UPDATED: 'Product updated successfully!',
    PRODUCT_DELETED: 'Product deleted successfully!',
    ORDER_UPDATED: 'Order status updated successfully!',
    USER_DELETED: 'User deleted successfully!',
    CART_ITEM_ADDED: 'Item added to cart!',
    CART_ITEM_REMOVED: 'Item removed from cart!',
    LOGIN_SUCCESS: 'Login successful!',
    LOGOUT_SUCCESS: 'Logout successful!',
  },

  // Local Storage Keys
  STORAGE_KEYS: {
    CURRENT_USER: 'currentUser',
    TOKEN: 'token',
    CART: 'cart',
    THEME: 'theme',
  },

  // Theme Configuration
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
  } as const,

  // Animation Durations
  ANIMATION_DURATIONS: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },

  // Loading States
  LOADING_STATES: {
    PRODUCTS: 'products',
    CATEGORIES: 'categories',
    USERS: 'users',
    ORDERS: 'orders',
    LOGIN: 'login',
    REGISTER: 'register',
    ADD_PRODUCT: 'add-product',
    UPDATE_PRODUCT: 'update-product',
    DELETE_PRODUCT: 'delete-product',
    UPDATE_ORDER: 'update-order',
    DELETE_USER: 'delete-user',
    EXPORT: 'export',
    BULK_DELETE: 'bulk-delete',
    BULK_UPDATE: 'bulk-update',
  },
} as const;

export type OrderStatus =
  (typeof APP_CONSTANTS.ORDER_STATUSES)[keyof typeof APP_CONSTANTS.ORDER_STATUSES];
export type UserRole =
  (typeof APP_CONSTANTS.USER_ROLES)[keyof typeof APP_CONSTANTS.USER_ROLES];
export type Theme =
  (typeof APP_CONSTANTS.THEMES)[keyof typeof APP_CONSTANTS.THEMES];
