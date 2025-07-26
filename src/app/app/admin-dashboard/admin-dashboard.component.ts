import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  LoadingService,
  ErrorService,
  UserService,
  ProductService,
} from '../../core/services';
import { User, Order } from '../../core/models/user.interface';
import { Product } from '../../core/models/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

interface AdminStats {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
}

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit, OnDestroy {
  loading = true;
  tab: 'overview' | 'products' | 'orders' | 'users' = 'overview';
  currentUser: User | null = null;
  private destroy$ = new Subject<void>();


  stats: AdminStats = {
    totalUsers: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  };


  recentOrders: Order[] = [];


  recentUsers: User[] = [];


  allProducts: Product[] = [];
  allOrders: Order[] = [];
  allUsers: User[] = [];


  productFilter: string = 'all';
  orderFilter: string = 'all';
  userFilter: string = 'all';


  productSearch: string = '';
  orderSearch: string = '';
  userSearch: string = '';


  selectedProducts: Set<number> = new Set();
  selectedOrders: Set<number> = new Set();
  selectedUsers: Set<number> = new Set();


  currentPage = 1;
  itemsPerPage = 12;


  showAddProductModal = false;
  addProductForm!: FormGroup;
  newProduct = {
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
  };

  constructor(
    private loadingService: LoadingService,
    private errorService: ErrorService,
    private userService: UserService,
    private productService: ProductService,
    private fb: FormBuilder
  ) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.addProductForm = this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      price: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10000)],
      ],
      category: ['', Validators.required],
      description: ['', [Validators.maxLength(500)]],
      image: ['', [Validators.pattern('https?://.+')]],
    });
  }

  ngOnInit() {
    this.loadingService.setLoadingState('admin-dashboard', true);


    const currentUserStr = localStorage.getItem('currentUser');
    if (currentUserStr) {
      this.currentUser = JSON.parse(currentUserStr);
    }


    this.loadAllData();


    setTimeout(() => {
      this.loading = false;
      this.loadingService.setLoadingState('admin-dashboard', false);
    }, 1500);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAllData() {

    this.productService
      .getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (products) => {
          this.allProducts = products;
          this.stats.totalProducts = products.length;
          console.log('Products loaded:', products.length);
        },
        error: (error) => {
          this.errorService.addError(
            'Failed to load products from API',
            'error'
          );
          console.error('Error loading products:', error);
        },
      });


    this.userService
      .getAllOrders()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (orders) => {
          this.allOrders = orders;
          this.recentOrders = orders.slice(0, 4); // Get last 4 orders
          this.stats.totalOrders = orders.length;
          this.stats.totalRevenue = orders.reduce(
            (sum, order) => sum + order.total,
            0
          );
          console.log('Orders loaded:', orders.length);
          console.log('Recent orders:', this.recentOrders);
        },
        error: (error) => {
          this.errorService.addError('Failed to load orders', 'error');
          console.error('Error loading orders:', error);
        },
      });


    this.userService
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.allUsers = users;
          this.recentUsers = users.slice(0, 4); // Get last 4 users
          this.stats.totalUsers = users.length;
          console.log('Users loaded:', users.length);
          console.log('Recent users:', this.recentUsers);
          console.log(
            'Admin users:',
            users.filter((user) => user.role === 'admin').length
          );
        },
        error: (error) => {
          this.errorService.addError('Failed to load users from API', 'error');
          console.error('Error loading users:', error);
        },
      });
  }

  setTab(newTab: 'overview' | 'products' | 'orders' | 'users') {
    this.tab = newTab;
    this.currentPage = 1; // Reset pagination when changing tabs
    this.clearSelections(); // Clear selections when changing tabs
  }


  exportReport() {
    this.loadingService.setLoadingState('export', true);


    setTimeout(() => {
      this.loadingService.setLoadingState('export', false);
      this.errorService.addError(
        'Report exported successfully! Check your downloads folder.',
        'info'
      );
    }, 2000);
  }

  addProduct() {
    this.showAddProductModal = true;
  }


  editProduct(product: Product) {
    this.errorService.addError(`Editing product: ${product.title}`, 'info');
  }

  deleteProduct(productId: number) {
    if (this.confirmAction('Are you sure you want to delete this product?')) {
      this.loadingService.setLoadingState('delete-product', true);

      this.productService.deleteProduct(productId).subscribe({
        next: () => {
          this.allProducts = this.allProducts.filter(
            (product) => product.id !== productId
          );
          this.stats.totalProducts = this.allProducts.length;
          this.selectedProducts.delete(productId);
          this.loadingService.setLoadingState('delete-product', false);
          this.errorService.addError('Product deleted successfully', 'info');
        },
        error: (error) => {
          this.loadingService.setLoadingState('delete-product', false);
          this.errorService.addError('Failed to delete product', 'error');
        },
      });
    }
  }

  viewProduct(product: Product) {
    this.errorService.addError(`Viewing product: ${product.title}`, 'info');
  }


  selectProduct(productId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedProducts.add(productId);
    } else {
      this.selectedProducts.delete(productId);
    }
  }

  selectAllProducts(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.filteredProducts.forEach((product) =>
        this.selectedProducts.add(product.id)
      );
    } else {
      this.selectedProducts.clear();
    }
  }

  deleteSelectedProducts() {
    if (this.selectedProducts.size === 0) {
      this.errorService.addError('Please select products to delete', 'warning');
      return;
    }

    if (
      this.confirmAction(
        `Are you sure you want to delete ${this.selectedProducts.size} selected products?`
      )
    ) {
      this.loadingService.setLoadingState('bulk-delete', true);


      setTimeout(() => {
        this.allProducts = this.allProducts.filter(
          (product) => !this.selectedProducts.has(product.id)
        );
        this.stats.totalProducts = this.allProducts.length;
        this.selectedProducts.clear();
        this.loadingService.setLoadingState('bulk-delete', false);
        this.errorService.addError(
          `${this.selectedProducts.size} products deleted successfully`,
          'info'
        );
      }, 1500);
    }
  }


  onStatusChange(event: Event, orderId: number) {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value as Order['status'];
    this.updateOrderStatus(orderId, newStatus);
  }

  updateOrderStatus(orderId: number, newStatus: Order['status']) {
    this.loadingService.setLoadingState('update-status', true);

    this.userService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (updatedOrder) => {

        const orderIndex = this.allOrders.findIndex(
          (order) => order.id === orderId
        );
        if (orderIndex !== -1) {
          this.allOrders[orderIndex] = updatedOrder;
          this.recentOrders = this.allOrders.slice(0, 4);
        }
        this.loadingService.setLoadingState('update-status', false);
        this.errorService.addError(
          `Order status updated to ${newStatus}`,
          'info'
        );
      },
      error: (error) => {
        this.loadingService.setLoadingState('update-status', false);
        this.errorService.addError('Failed to update order status', 'error');
      },
    });
  }

  viewOrder(order: Order) {
    this.errorService.addError(`Viewing order #${order.id}`, 'info');
  }


  selectOrder(orderId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedOrders.add(orderId);
    } else {
      this.selectedOrders.delete(orderId);
    }
  }

  selectAllOrders(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.filteredOrders.forEach((order) => this.selectedOrders.add(order.id));
    } else {
      this.selectedOrders.clear();
    }
  }

  updateSelectedOrdersStatus(newStatus: Order['status']) {
    if (this.selectedOrders.size === 0) {
      this.errorService.addError('Please select orders to update', 'warning');
      return;
    }

    this.loadingService.setLoadingState('bulk-update', true);


    setTimeout(() => {
      this.allOrders.forEach((order) => {
        if (this.selectedOrders.has(order.id)) {
          order.status = newStatus;
        }
      });
      this.recentOrders = this.allOrders.slice(0, 4);
      this.selectedOrders.clear();
      this.loadingService.setLoadingState('bulk-update', false);
      this.errorService.addError(
        `${this.selectedOrders.size} orders updated successfully`,
        'info'
      );
    }, 1500);
  }

  onBulkStatusChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    const newStatus = target.value as Order['status'];
    if (newStatus) {
      this.updateSelectedOrdersStatus(newStatus);
    }
  }


  editUser(user: User) {
    this.errorService.addError(
      `Editing user: ${user.name.firstname} ${user.name.lastname}`,
      'info'
    );
  }

  deleteUser(userId: number) {
    if (this.confirmAction('Are you sure you want to delete this user?')) {
      this.loadingService.setLoadingState('delete-user', true);

      this.userService.deleteUser(userId).subscribe({
        next: () => {
          this.allUsers = this.allUsers.filter((user) => user.id !== userId);
          this.recentUsers = this.allUsers.slice(0, 4);
          this.stats.totalUsers = this.allUsers.length;
          this.selectedUsers.delete(userId);
          this.loadingService.setLoadingState('delete-user', false);
          this.errorService.addError('User deleted successfully', 'info');
        },
        error: (error) => {
          this.loadingService.setLoadingState('delete-user', false);
          this.errorService.addError('Failed to delete user', 'error');
        },
      });
    }
  }

  viewUser(user: User) {
    this.errorService.addError(
      `Viewing user: ${user.name.firstname} ${user.name.lastname}`,
      'info'
    );
  }


  selectUser(userId: number, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.selectedUsers.add(userId);
    } else {
      this.selectedUsers.delete(userId);
    }
  }

  selectAllUsers(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      this.filteredUsers.forEach((user) => this.selectedUsers.add(user.id));
    } else {
      this.selectedUsers.clear();
    }
  }

  deleteSelectedUsers() {
    if (this.selectedUsers.size === 0) {
      this.errorService.addError('Please select users to delete', 'warning');
      return;
    }

    if (
      this.confirmAction(
        `Are you sure you want to delete ${this.selectedUsers.size} selected users?`
      )
    ) {
      this.loadingService.setLoadingState('bulk-delete-users', true);


      setTimeout(() => {
        this.allUsers = this.allUsers.filter(
          (user) => !this.selectedUsers.has(user.id)
        );
        this.stats.totalUsers = this.allUsers.length;
        this.recentUsers = this.allUsers.slice(0, 4);
        this.selectedUsers.clear();
        this.loadingService.setLoadingState('bulk-delete-users', false);
        this.errorService.addError(
          `${this.selectedUsers.size} users deleted successfully`,
          'info'
        );
      }, 1500);
    }
  }


  onProductFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.productFilter = target.value;
    this.currentPage = 1;
  }

  onOrderFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.orderFilter = target.value;
    this.currentPage = 1;
  }

  onUserFilterChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.userFilter = target.value;
    this.currentPage = 1;
  }


  onProductSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.productSearch = target.value;
    this.currentPage = 1;
  }

  onOrderSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.orderSearch = target.value;
    this.currentPage = 1;
  }

  onUserSearch(event: Event) {
    const target = event.target as HTMLInputElement;
    this.userSearch = target.value;
    this.currentPage = 1;
  }


  nextPage() {
    const maxPages = Math.ceil(
      this.getCurrentFilteredData().length / this.itemsPerPage
    );
    if (this.currentPage < maxPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    const maxPages = Math.ceil(
      this.getCurrentFilteredData().length / this.itemsPerPage
    );
    if (page >= 1 && page <= maxPages) {
      this.currentPage = page;
    }
  }


  private confirmAction(message: string): boolean {
    return confirm(message);
  }

  private clearSelections() {
    this.selectedProducts.clear();
    this.selectedOrders.clear();
    this.selectedUsers.clear();
  }

  private getCurrentFilteredData(): any[] {
    switch (this.tab) {
      case 'products':
        return this.filteredProducts;
      case 'orders':
        return this.filteredOrders;
      case 'users':
        return this.filteredUsers;
      default:
        return [];
    }
  }


  get filteredProducts(): Product[] {
    let products = this.allProducts;

    if (this.productFilter !== 'all') {
      products = products.filter(
        (product) => product.category === this.productFilter
      );
    }

    if (this.productSearch) {
      products = products.filter(
        (product) =>
          product.title
            .toLowerCase()
            .includes(this.productSearch.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(this.productSearch.toLowerCase())
      );
    }

    return products;
  }

  get filteredOrders(): Order[] {
    let orders = this.allOrders;

    if (this.orderFilter !== 'all') {
      orders = orders.filter((order) => order.status === this.orderFilter);
    }

    if (this.orderSearch) {
      orders = orders.filter(
        (order) =>
          order.id.toString().includes(this.orderSearch) ||
          order.userId.toString().includes(this.orderSearch)
      );
    }

    return orders;
  }

  get filteredUsers(): User[] {
    let users = this.allUsers;

    if (this.userFilter !== 'all') {
      if (this.userFilter === 'admins') {
        users = users.filter((user) => user.role === 'admin');
      } else if (this.userFilter === 'active') {
        users = users.filter((user) => user.id > 0); // Simulate active users
      } else if (this.userFilter === 'inactive') {
        users = users.filter((user) => user.id <= 0); // Simulate inactive users
      }
    }

    if (this.userSearch) {
      users = users.filter(
        (user) =>
          user.name.firstname
            .toLowerCase()
            .includes(this.userSearch.toLowerCase()) ||
          user.name.lastname
            .toLowerCase()
            .includes(this.userSearch.toLowerCase()) ||
          user.email.toLowerCase().includes(this.userSearch.toLowerCase())
      );
    }

    return users;
  }


  get paginatedProducts(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredProducts.slice(startIndex, endIndex);
  }

  get paginatedOrders(): Order[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredOrders.slice(startIndex, endIndex);
  }

  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredUsers.slice(startIndex, endIndex);
  }


  get totalPages(): number {
    return Math.ceil(this.getCurrentFilteredData().length / this.itemsPerPage);
  }

  get pageNumbers(): number[] {
    const total = this.totalPages;
    const current = this.currentPage;
    const pages: number[] = [];

    for (
      let i = Math.max(1, current - 2);
      i <= Math.min(total, current + 2);
      i++
    ) {
      pages.push(i);
    }

    return pages;
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
      case 'active':
        return '#10b981';
      case 'inactive':
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
      case 'active':
        return 'fa-solid fa-user-check';
      case 'inactive':
        return 'fa-solid fa-user-times';
      default:
        return 'fa-solid fa-circle';
    }
  }


  getUserName(userId: number): string {
    const user = this.allUsers.find((u) => u.id === userId);
    if (user) {
      return `${user.name.firstname} ${user.name.lastname}`;
    }
    return `User ID: ${userId}`;
  }


  saveProduct() {
    if (this.addProductForm.invalid) {
      this.markFormGroupTouched();
      this.errorService.addError(
        'Please fill all required fields correctly',
        'warning'
      );
      return;
    }

    const formValue = this.addProductForm.value;

    const product: Product = {
      id: Math.max(...this.allProducts.map((p) => p.id)) + 1,
      title: formValue.title.trim(),
      price: parseFloat(formValue.price),
      description: formValue.description?.trim() || '',
      category: formValue.category,
      image:
        formValue.image || 'https://via.placeholder.com/300x300?text=Product',
      rating: {
        rate: 0,
        count: 0,
      },
    };

    this.loadingService.setLoadingState('add-product', true);

    this.productService
      .createProduct(product)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (createdProduct) => {
          this.allProducts.unshift(createdProduct);
          this.stats.totalProducts = this.allProducts.length;
          this.loadingService.setLoadingState('add-product', false);
          this.errorService.addError('Product added successfully!', 'info');
          this.closeAddProductModal();
        },
        error: (error) => {
          this.loadingService.setLoadingState('add-product', false);
          this.errorService.addError('Failed to add product', 'error');
        },
      });
  }

  closeAddProductModal() {
    this.showAddProductModal = false;
    this.addProductForm.reset();
  }

  private markFormGroupTouched() {
    Object.keys(this.addProductForm.controls).forEach((key) => {
      const control = this.addProductForm.get(key);
      control?.markAsTouched();
    });
  }
}
