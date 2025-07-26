import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { User, LoginRequest, RegisterRequest } from '../models/user.interface';
import { APP_CONSTANTS } from '../constants/app.constants';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    it('should authenticate predefined admin account', (done) => {
      const credentials: LoginRequest = {
        email: 'abdelfattah@gen.eg',
        password: 'admin123',
      };

      service.login(credentials).subscribe({
        next: (user) => {
          expect(user).toBeTruthy();
          expect(user.role).toBe('admin');
          expect(user.email).toBe(credentials.email);
          expect(service.isAuthenticated()).toBe(true);
          expect(service.isAdmin()).toBe(true);
          done();
        },
        error: done.fail,
      });
    });

    it('should authenticate predefined user account', (done) => {
      const credentials: LoginRequest = {
        email: 'abdelfattahuser@gen.eg',
        password: 'user123',
      };

      service.login(credentials).subscribe({
        next: (user) => {
          expect(user).toBeTruthy();
          expect(user.role).toBe('user');
          expect(user.email).toBe(credentials.email);
          expect(service.isAuthenticated()).toBe(true);
          expect(service.isAdmin()).toBe(false);
          done();
        },
        error: done.fail,
      });
    });

    it('should reject invalid credentials', (done) => {
      const credentials: LoginRequest = {
        email: 'invalid@email.com',
        password: 'wrongpassword',
      };

      service.login(credentials).subscribe({
        next: () => done.fail('Should have failed'),
        error: (error) => {
          expect(error.message).toBe('Invalid credentials');
          expect(service.isAuthenticated()).toBe(false);
          done();
        },
      });

      const req = httpMock.expectOne(`${APP_CONSTANTS.API_URL}/auth/login`);
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('logout', () => {
    it('should clear user data and token', (done) => {
      const credentials: LoginRequest = {
        email: 'abdelfattah@gen.eg',
        password: 'admin123',
      };

      service.login(credentials).subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);

        service.logout();
        expect(service.isAuthenticated()).toBe(false);
        expect(service.getCurrentUser()).toBeNull();
        expect(service.getToken()).toBeNull();
        done();
      });
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when user is logged in', (done) => {
      const credentials: LoginRequest = {
        email: 'abdelfattah@gen.eg',
        password: 'admin123',
      };

      service.login(credentials).subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);
        done();
      });
    });

    it('should return false when user is not logged in', () => {
      expect(service.isAuthenticated()).toBe(false);
    });
  });

  describe('isAdmin', () => {
    it('should return true for admin user', (done) => {
      const credentials: LoginRequest = {
        email: 'abdelfattah@gen.eg',
        password: 'admin123',
      };

      service.login(credentials).subscribe(() => {
        expect(service.isAdmin()).toBe(true);
        done();
      });
    });

    it('should return false for regular user', (done) => {
      const credentials: LoginRequest = {
        email: 'abdelfattahuser@gen.eg',
        password: 'user123',
      };

      service.login(credentials).subscribe(() => {
        expect(service.isAdmin()).toBe(false);
        done();
      });
    });
  });
});
