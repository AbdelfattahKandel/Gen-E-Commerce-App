# Gen Commerce - Angular E-commerce Application

[![Angular](https://img.shields.io/badge/Angular-17.3.0-red.svg)](https://angular.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4.2-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![CI/CD](https://img.shields.io/badge/CI/CD-GitHub%20Actions-blue.svg)](.github/workflows/ci.yml)

A modern, responsive e-commerce platform built with Angular 17, featuring a beautiful UI, comprehensive functionality, and excellent user experience.

## 🚀 Features

### Core Features

- **🛍️ Product Catalog** - Browse and search products with advanced filtering
- **🛒 Shopping Cart** - Add, remove, and manage cart items
- **💳 Checkout Process** - Complete purchase flow with order management
- **👤 User Authentication** - Secure login/registration with role-based access
- **👨‍💼 Admin Dashboard** - Product and order management for administrators
- **📱 Responsive Design** - Mobile-first approach with excellent UX

### Advanced Features

- **🔍 Advanced Search & Filtering** - Category, price, rating, and custom filters
- **📊 Real-time Analytics** - Track user behavior and performance metrics
- **🔒 Security Features** - Route guards, HTTP interceptors, and input validation
- **⚡ Performance Optimized** - Lazy loading, caching, and Core Web Vitals monitoring
- **♿ Accessibility** - WCAG 2.1 compliant with screen reader support
- **🌐 PWA Support** - Progressive Web App with offline capabilities
- **🔍 SEO Optimized** - Meta tags, structured data, and search engine optimization
- **📈 Performance Monitoring** - Real-time performance tracking and reporting

## 🛠️ Tech Stack

### Frontend

- **Angular 17** - Latest version with standalone components
- **TypeScript** - Type-safe development
- **RxJS** - Reactive programming and state management
- **CSS3** - Custom styling with utility classes
- **HTML5** - Semantic markup

### Development Tools

- **Angular CLI** - Development and build tools
- **ESLint** - Code quality and linting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality
- **Karma & Jasmine** - Unit testing framework
- **Angular PWA** - Progressive Web App support
- **Angular Localize** - Internationalization support

### Architecture

- **Standalone Components** - No NgModules required
- **Lazy Loading** - Route-based code splitting
- **Service Layer** - Centralized business logic
- **Interceptor Pattern** - HTTP request/response handling
- **Guard Pattern** - Route protection and access control

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- Angular CLI (v17 or higher)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/gen-commerce.git
   cd gen-commerce
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🔐 Authentication

### Predefined Accounts

#### Admin Accounts

- **Email**: abdelfattah@gen.eg | **Password**: admin123
- **Email**: tarek@gen.eg | **Password**: admin123
- **Email**: ali@gen.eg | **Password**: admin123

#### User Accounts

- **Email**: abdelfattahuser@gen.eg | **Password**: user123
- **Email**: tarekuser@gen.eg | **Password**: user123
- **Email**: aliuser@gen.eg | **Password**: user123

### Registration

You can also create new accounts using the registration form:

1. Navigate to `/register`
2. Fill in the required fields
3. Create a strong password
4. Accept terms and conditions
5. Click "Create Account"

## 📁 Project Structure

```
src/
├── app/
│   ├── app/                    # Main application components
│   │   ├── admin-dashboard/    # Admin panel
│   │   ├── auth/              # Authentication components
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout process
│   │   ├── home/              # Home page
│   │   ├── login/             # Login page
│   │   ├── products/          # Product catalog
│   │   ├── register/          # Registration page
│   │   ├── user-dashboard/    # User dashboard
│   │   └── shared/            # Shared components
│   ├── core/                  # Core functionality
│   │   ├── constants/         # Application constants
│   │   ├── guards/            # Route guards
│   │   ├── interceptors/      # HTTP interceptors
│   │   ├── models/            # TypeScript interfaces
│   │   └── services/          # Business logic services
│   ├── app.component.*        # Root component
│   ├── app.config.ts          # Application configuration
│   └── app.routes.ts          # Route definitions
├── assets/                    # Static assets
├── environments/              # Environment configurations
└── styles.css                 # Global styles
```

## 🚀 Available Scripts

- **`npm start`** - Start development server
- **`npm run build`** - Build for production
- **`npm run build:dev`** - Build for development
- **`npm test`** - Run unit tests
- **`npm run test:coverage`** - Run tests with coverage
- **`npm run test:watch`** - Run tests in watch mode
- **`npm run lint`** - Run ESLint
- **`npm run lint:fix`** - Fix ESLint issues
- **`npm run format`** - Format code with Prettier
- **`npm run format:check`** - Check code formatting
- **`npm run e2e`** - Run end-to-end tests
- **`npm run analyze`** - Analyze bundle size

## 🎨 Styling

The application uses a custom CSS approach with:

- **Utility Classes** - Similar to Tailwind CSS
- **CSS Custom Properties** - For theming and consistency
- **Responsive Design** - Mobile-first approach
- **Dark Mode Support** - Automatic theme switching
- **Accessibility Features** - High contrast, large text, reduced motion

## 🔒 Security

- **Route Guards** - Protect routes based on authentication and roles
- **HTTP Interceptors** - Add authentication tokens to requests
- **Input Validation** - Comprehensive form validation
- **XSS Protection** - Sanitized user inputs
- **CSRF Protection** - Token-based protection

## 📱 Responsive Design

The application is fully responsive with:

- **Mobile-First** - Designed for mobile devices first
- **Breakpoints** - 480px, 768px, 1024px, 1400px
- **Flexible Grid** - Adaptive layouts
- **Touch-Friendly** - Optimized for touch interactions
- **Performance** - Optimized for mobile networks

## ⚡ Performance

- **Lazy Loading** - Route-based code splitting
- **Caching** - Intelligent data caching
- **Optimized Images** - WebP format with fallbacks
- **Minified Assets** - Compressed CSS and JavaScript
- **Core Web Vitals** - LCP, FID, CLS monitoring

## ♿ Accessibility

- **WCAG 2.1 AA** - Compliance with accessibility standards
- **Screen Reader Support** - ARIA labels and live regions
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast Mode** - Enhanced visibility
- **Large Text Mode** - Improved readability
- **Reduced Motion** - Respects user preferences

## 🔍 SEO

- **Meta Tags** - Dynamic meta tag management
- **Structured Data** - JSON-LD schema markup
- **Open Graph** - Social media optimization
- **Twitter Cards** - Twitter sharing optimization
- **Sitemap** - Search engine indexing

## 📊 Analytics

- **User Behavior Tracking** - Page views, interactions, conversions
- **Performance Monitoring** - Core Web Vitals and custom metrics
- **E-commerce Tracking** - Product views, cart additions, purchases
- **Error Tracking** - Application error monitoring
- **Custom Events** - Business-specific analytics

## 🧪 Testing

- **Unit Tests** - Component and service testing
- **Integration Tests** - Feature testing
- **E2E Tests** - End-to-end testing (planned)
- **Performance Tests** - Load and stress testing
- **Accessibility Tests** - Automated accessibility checking

## 🌐 PWA Features

- **Service Worker** - Offline functionality
- **App Manifest** - Installable web app
- **Push Notifications** - Real-time updates
- **Background Sync** - Offline data synchronization
- **App Shell** - Fast loading experience

## 🔧 Configuration

### Environment Variables

- **API URL** - Backend service endpoint
- **App Name** - Application display name
- **Version** - Application version
- **Debug Mode** - Development debugging
- **Cache Timeout** - Data caching duration

### Build Configuration

- **Production Build** - Optimized for deployment
- **Development Build** - Source maps and debugging
- **Bundle Analysis** - Performance optimization
- **Tree Shaking** - Unused code elimination

## 📈 Monitoring & Analytics

### Performance Monitoring

- **Core Web Vitals** - LCP, FID, CLS tracking
- **Page Load Times** - Navigation timing
- **API Response Times** - Backend performance
- **Memory Usage** - Browser memory monitoring
- **Error Tracking** - Application error logging

### User Analytics

- **Page Views** - Navigation tracking
- **User Interactions** - Click and scroll tracking
- **Conversion Funnels** - Purchase flow analysis
- **User Segmentation** - Behavior-based grouping
- **A/B Testing** - Feature experimentation

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow Angular style guide
- Write unit tests for new features
- Ensure accessibility compliance
- Optimize for performance
- Document code changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- 📧 Email: support@gen-commerce.com
- 💬 Discord: [Gen Commerce Community](https://discord.gg/gen-commerce)
- 📖 Documentation: [docs.gen-commerce.com](https://docs.gen-commerce.com)
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/gen-commerce/issues)

## 🙏 Acknowledgments

- **Angular Team** - For the amazing framework
- **FakeStore API** - For providing test data
- **Community Contributors** - For feedback and improvements
- **Design Inspiration** - Modern e-commerce trends

---

**Made with ❤️ by the Gen Commerce Team**
