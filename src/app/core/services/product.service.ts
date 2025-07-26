import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';
import { Product } from '../models/product.interface';

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProductFilters {
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'title' | 'id';
  sortOrder?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com';
  private productsCache$: Observable<Product[]> | null = null;
  private categoriesCache$: Observable<string[]> | null = null;

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


  private transformProductData(product: any): Product {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: {
        rate: product.rating?.rate || 0,
        count: product.rating?.count || 0,
      },
    };
  }


  getProducts(
    page: number = 1,
    limit: number = 10,
    filters?: ProductFilters
  ): Observable<PaginatedResponse<Product>> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`).pipe(
      map((products) =>
        products.map((product) => this.transformProductData(product))
      ),
      map((products) => this.applyFilters(products, filters)),
      map((products) => this.paginateProducts(products, page, limit)),
      catchError(this.handleError),
      shareReplay(1)
    );
  }


  getAllProducts(): Observable<Product[]> {
    if (!this.productsCache$) {
      this.productsCache$ = this.http
        .get<Product[]>(`${this.apiUrl}/products`)
        .pipe(
          map((products) =>
            products.map((product) => this.transformProductData(product))
          ),
          catchError(this.handleError),
          shareReplay(1)
        );
    }
    return this.productsCache$;
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<any>(`${this.apiUrl}/products/${id}`).pipe(
      map((product) => this.transformProductData(product)),
      catchError(this.handleError)
    );
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http
      .get<any[]>(`${this.apiUrl}/products/category/${category}`)
      .pipe(
        map((products) =>
          products.map((product) => this.transformProductData(product))
        ),
        catchError(this.handleError)
      );
  }


  getAllCategories(): Observable<string[]> {
    if (!this.categoriesCache$) {
      this.categoriesCache$ = this.http
        .get<string[]>(`${this.apiUrl}/products/categories`)
        .pipe(catchError(this.handleError), shareReplay(1));
    }
    return this.categoriesCache$;
  }

  createProduct(product: Omit<Product, 'id'>): Observable<Product> {
    const productData = {
      ...product,
      rating: {
        rate: 0,
        count: 0,
      },
    };
    return this.http.post<any>(`${this.apiUrl}/products`, productData).pipe(
      map((product) => this.transformProductData(product)),
      catchError(this.handleError)
    );
  }

  updateProduct(id: number, product: Partial<Product>): Observable<Product> {
    return this.http.put<any>(`${this.apiUrl}/products/${id}`, product).pipe(
      map((product) => this.transformProductData(product)),
      catchError(this.handleError)
    );
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<any>(`${this.apiUrl}/products/${id}`).pipe(
      map((product) => this.transformProductData(product)),
      catchError(this.handleError)
    );
  }


  searchProducts(query: string): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) =>
        products.filter(
          (product) =>
            product.title.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase())
        )
      )
    );
  }

  getProductsByPriceRange(
    minPrice: number,
    maxPrice: number
  ): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) =>
        products.filter(
          (product) => product.price >= minPrice && product.price <= maxPrice
        )
      )
    );
  }

  getTopRatedProducts(limit: number = 10): Observable<Product[]> {
    return this.getAllProducts().pipe(
      map((products) =>
        products.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, limit)
      )
    );
  }

  private applyFilters(
    products: Product[],
    filters?: ProductFilters
  ): Product[] {
    if (!filters) return products;

    let filteredProducts = products;


    if (filters.category) {
      filteredProducts = filteredProducts.filter(
        (p) => p.category === filters.category
      );
    }


    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm)
      );
    }


    if (filters.minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price >= filters.minPrice!
      );
    }
    if (filters.maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(
        (p) => p.price <= filters.maxPrice!
      );
    }


    if (filters.sortBy) {
      filteredProducts.sort((a, b) => {
        let aValue: any, bValue: any;

        switch (filters.sortBy) {
          case 'price':
            aValue = a.price;
            bValue = b.price;
            break;
          case 'rating':
            aValue = a.rating.rate;
            bValue = b.rating.rate;
            break;
          case 'title':
            aValue = a.title.toLowerCase();
            bValue = b.title.toLowerCase();
            break;
          case 'id':
          default:
            aValue = a.id;
            bValue = b.id;
            break;
        }

        if (filters.sortOrder === 'desc') {
          return bValue > aValue ? 1 : -1;
        }
        return aValue > bValue ? 1 : -1;
      });
    }

    return filteredProducts;
  }

  private paginateProducts(
    products: Product[],
    page: number,
    limit: number
  ): PaginatedResponse<Product> {
    const total = products.length;
    const totalPages = Math.ceil(total / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = products.slice(startIndex, endIndex);

    return {
      data,
      total,
      page,
      limit,
      totalPages,
    };
  }


  clearCache(): void {
    this.productsCache$ = null;
    this.categoriesCache$ = null;
  }
}
