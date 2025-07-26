import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { User, LoginRequest, RegisterRequest } from '../models/user.interface';
import { APP_CONSTANTS } from '../constants/app.constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = APP_CONSTANTS.API_URL;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  // Predefined accounts with better security
  private predefinedAccounts = [
    // Admin accounts
    {
      email: 'abdelfattah@gen.eg',
      password: 'admin123',
      role: 'admin',
      name: { firstname: 'Abdelfattah', lastname: 'Admin' },
      username: 'abdelfattah_admin',
    },
    {
      email: 'tarek@gen.eg',
      password: 'admin123',
      role: 'admin',
      name: { firstname: 'Tarek', lastname: 'Admin' },
      username: 'tarek_admin',
    },
    {
      email: 'ali@gen.eg',
      password: 'admin123',
      role: 'admin',
      name: { firstname: 'Ali', lastname: 'Admin' },
      username: 'ali_admin',
    },
    // User accounts
    {
      email: 'abdelfattahuser@gen.eg',
      password: 'user123',
      role: 'user',
      name: { firstname: 'Abdelfattah', lastname: 'User' },
      username: 'abdelfattah_user',
    },
    {
      email: 'tarekuser@gen.eg',
      password: 'user123',
      role: 'user',
      name: { firstname: 'Tarek', lastname: 'User' },
      username: 'tarek_user',
    },
    {
      email: 'aliuser@gen.eg',
      password: 'user123',
      role: 'user',
      name: { firstname: 'Ali', lastname: 'User' },
      username: 'ali_user',
    },
  ];

  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    try {
      const user = localStorage.getItem(
        APP_CONSTANTS.STORAGE_KEYS.CURRENT_USER
      );
      const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);

      if (user && token && this.isValidToken(token)) {
        this.currentUserSubject.next(JSON.parse(user));
      } else {
        this.clearStoredData();
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
      this.clearStoredData();
    }
  }

  private isValidToken(token: string): boolean {
    try {
      // Basic token validation - in production, you'd validate JWT properly
      if (!token || token.length < 10) {
        return false;
      }

      // Check if token is expired (if it's a JWT)
      if (token.includes('.')) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          return false;
        }
      }

      return true;
    } catch (error) {
      return false;
    }
  }

  private clearStoredData(): void {
    localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
    this.currentUserSubject.next(null);
  }

  login(credentials: LoginRequest): Observable<User> {
    // Validate input
    if (!this.validateCredentials(credentials)) {
      return throwError(() => new Error('Invalid credentials format'));
    }

    // Check if it's a predefined account
    const predefinedAccount = this.predefinedAccounts.find(
      (account) =>
        account.email === credentials.email &&
        account.password === credentials.password
    );

    if (predefinedAccount) {
      // Create user object for predefined account
      const user: User = {
        id: this.predefinedAccounts.indexOf(predefinedAccount) + 1,
        email: predefinedAccount.email,
        username: predefinedAccount.username,
        name: predefinedAccount.name,
        address: {
          city: 'Cairo',
          street: '123 Main St',
          number: 123,
          zipcode: '12345',
          geolocation: { lat: '30.0444', long: '31.2357' },
        },
        phone: '+201234567890',
        role: predefinedAccount.role as 'admin' | 'user',
      };

      const token = this.generateSecureToken();
      this.storeUserData(user, token);
      return of(user);
    }

    // Fallback to API for other accounts
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, credentials)
      .pipe(
        map((response) => {
          const user: User = {
            id: 999,
            email: credentials.email,
            username: credentials.email.split('@')[0],
            name: { firstname: 'Guest', lastname: 'User' },
            address: {
              city: 'Cairo',
              street: '123 Main St',
              number: 123,
              zipcode: '12345',
              geolocation: { lat: '30.0444', long: '31.2357' },
            },
            phone: '+201234567890',
            role: 'user',
          };

          this.storeUserData(user, response.token);
          return user;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => new Error('Invalid credentials'));
        })
      );
  }

  private validateCredentials(credentials: LoginRequest): boolean {
    return !!(
      credentials.email &&
      credentials.password &&
      credentials.email.includes('@') &&
      credentials.password.length >= 3
    );
  }

  private storeUserData(user: User, token: string): void {
    localStorage.setItem(
      APP_CONSTANTS.STORAGE_KEYS.CURRENT_USER,
      JSON.stringify(user)
    );
    localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN, token);
    this.currentUserSubject.next(user);
  }

  private generateSecureToken(): string {
    // Generate a more secure token
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2);
    const userAgent = navigator.userAgent.substring(0, 10);

    return btoa(`${timestamp}.${random}.${userAgent}`).replace(
      /[^a-zA-Z0-9]/g,
      ''
    );
  }

  register(userData: RegisterRequest): Observable<User> {
    // Validate registration data
    if (!this.validateRegistrationData(userData)) {
      return throwError(() => new Error('Invalid registration data'));
    }

    return this.http.post<User>(`${this.apiUrl}/users`, userData).pipe(
      tap((user) => {
        const token = this.generateSecureToken();
        this.storeUserData(user, token);
      }),
      catchError((error) => {
        console.error('Registration error:', error);
        return throwError(() => new Error('Registration failed'));
      })
    );
  }

  private validateRegistrationData(userData: RegisterRequest): boolean {
    return !!(
      userData.email &&
      userData.password &&
      userData.username &&
      userData.name?.firstname &&
      userData.name?.lastname &&
      userData.email.includes('@') &&
      userData.password.length >= 6
    );
  }

  logout(): void {
    this.clearStoredData();
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    const user = this.getCurrentUser();
    const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
    return !!(user && token && this.isValidToken(token));
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === APP_CONSTANTS.USER_ROLES.ADMIN;
  }

  getToken(): string | null {
    const token = localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.TOKEN);
    return token && this.isValidToken(token) ? token : null;
  }

  // Get predefined accounts for display
  getPredefinedAccounts() {
    return this.predefinedAccounts.map((account) => ({
      email: account.email,
      password: account.password,
      role: account.role,
      name: account.name,
    }));
  }
}
