import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private defaultSEO: SEOData = {
    title: 'Gen Commerce - Modern E-commerce Platform',
    description:
      'Discover amazing products at great prices. Shop the latest trends in fashion, electronics, home & garden, and more.',
    keywords:
      'e-commerce, online shopping, products, fashion, electronics, home, garden',
    image: '/assets/images/og-image.jpg',
    url: 'https://gen-commerce.com',
    type: 'website',
  };

  constructor(private title: Title, private meta: Meta) {}

  updateSEO(data: Partial<SEOData>): void {
    const seoData = { ...this.defaultSEO, ...data };

    // Update title
    this.title.setTitle(seoData.title);

    // Update meta tags
    this.meta.updateTag({ name: 'description', content: seoData.description });
    this.meta.updateTag({ name: 'keywords', content: seoData.keywords || '' });

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: seoData.title });
    this.meta.updateTag({
      property: 'og:description',
      content: seoData.description,
    });
    this.meta.updateTag({ property: 'og:image', content: seoData.image || '' });
    this.meta.updateTag({ property: 'og:url', content: seoData.url || '' });
    this.meta.updateTag({
      property: 'og:type',
      content: seoData.type || 'website',
    });

    // Twitter Card tags
    this.meta.updateTag({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
    this.meta.updateTag({ name: 'twitter:title', content: seoData.title });
    this.meta.updateTag({
      name: 'twitter:description',
      content: seoData.description,
    });
    this.meta.updateTag({
      name: 'twitter:image',
      content: seoData.image || '',
    });
  }

  updateProductSEO(product: any): void {
    this.updateSEO({
      title: `${product.title} - Gen Commerce`,
      description:
        product.description ||
        `Buy ${product.title} at the best price. Free shipping available.`,
      keywords: `${product.title}, ${product.category}, online shopping, e-commerce`,
      image: product.image,
      type: 'product',
    });
  }

  updateCategorySEO(category: string): void {
    this.updateSEO({
      title: `${category} Products - Gen Commerce`,
      description: `Shop the best ${category} products at Gen Commerce. Find great deals and free shipping.`,
      keywords: `${category}, products, online shopping, e-commerce`,
      type: 'website',
    });
  }

  updateHomeSEO(): void {
    this.updateSEO(this.defaultSEO);
  }

  updateLoginSEO(): void {
    this.updateSEO({
      title: 'Sign In - Gen Commerce',
      description:
        'Sign in to your Gen Commerce account to access your orders, wishlist, and personalized recommendations.',
      keywords: 'login, sign in, account, e-commerce',
      type: 'website',
    });
  }

  updateRegisterSEO(): void {
    this.updateSEO({
      title: 'Create Account - Gen Commerce',
      description:
        'Join Gen Commerce today! Create your account to start shopping and enjoy exclusive benefits.',
      keywords: 'register, sign up, create account, e-commerce',
      type: 'website',
    });
  }

  updateCartSEO(): void {
    this.updateSEO({
      title: 'Shopping Cart - Gen Commerce',
      description:
        'Review your shopping cart items and proceed to checkout. Secure payment and fast delivery.',
      keywords: 'shopping cart, checkout, e-commerce',
      type: 'website',
    });
  }

  updateCheckoutSEO(): void {
    this.updateSEO({
      title: 'Checkout - Gen Commerce',
      description:
        'Complete your purchase securely. Multiple payment options and fast delivery available.',
      keywords: 'checkout, payment, purchase, e-commerce',
      type: 'website',
    });
  }

  addStructuredData(data: any): void {
    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  addProductStructuredData(product: any): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.title,
      description: product.description,
      image: product.image,
      offers: {
        '@type': 'Offer',
        price: product.price,
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating?.rate || 0,
        reviewCount: product.rating?.count || 0,
      },
    };

    this.addStructuredData(structuredData);
  }

  addBreadcrumbStructuredData(
    breadcrumbs: Array<{ name: string; url: string }>
  ): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: crumb.url,
      })),
    };

    this.addStructuredData(structuredData);
  }

  addOrganizationStructuredData(): void {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Gen Commerce',
      url: 'https://gen-commerce.com',
      logo: 'https://gen-commerce.com/assets/images/logo.png',
      sameAs: [
        'https://facebook.com/gencommerce',
        'https://twitter.com/gencommerce',
        'https://instagram.com/gencommerce',
      ],
    };

    this.addStructuredData(structuredData);
  }
}
