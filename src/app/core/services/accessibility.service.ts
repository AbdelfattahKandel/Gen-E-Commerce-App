import { Injectable } from '@angular/core';

export interface AccessibilitySettings {
  highContrast: boolean;
  largeText: boolean;
  reducedMotion: boolean;
  screenReader: boolean;
  focusIndicator: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AccessibilityService {
  private settings: AccessibilitySettings = {
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    focusIndicator: true,
  };

  constructor() {
    this.loadSettings();
    this.applySettings();
  }

  private loadSettings(): void {
    const savedSettings = localStorage.getItem('accessibility_settings');
    if (savedSettings) {
      this.settings = { ...this.settings, ...JSON.parse(savedSettings) };
    }
  }

  private saveSettings(): void {
    localStorage.setItem(
      'accessibility_settings',
      JSON.stringify(this.settings)
    );
  }

  private applySettings(): void {
    const root = document.documentElement;

    // Apply high contrast
    if (this.settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Apply large text
    if (this.settings.largeText) {
      root.classList.add('large-text');
    } else {
      root.classList.remove('large-text');
    }

    // Apply reduced motion
    if (this.settings.reducedMotion) {
      root.classList.add('reduced-motion');
    } else {
      root.classList.remove('reduced-motion');
    }

    // Apply focus indicator
    if (this.settings.focusIndicator) {
      root.classList.add('focus-visible');
    } else {
      root.classList.remove('focus-visible');
    }
  }

  getSettings(): AccessibilitySettings {
    return { ...this.settings };
  }

  updateSettings(newSettings: Partial<AccessibilitySettings>): void {
    this.settings = { ...this.settings, ...newSettings };
    this.saveSettings();
    this.applySettings();
  }

  toggleHighContrast(): void {
    this.settings.highContrast = !this.settings.highContrast;
    this.saveSettings();
    this.applySettings();
  }

  toggleLargeText(): void {
    this.settings.largeText = !this.settings.largeText;
    this.saveSettings();
    this.applySettings();
  }

  toggleReducedMotion(): void {
    this.settings.reducedMotion = !this.settings.reducedMotion;
    this.saveSettings();
    this.applySettings();
  }

  toggleFocusIndicator(): void {
    this.settings.focusIndicator = !this.settings.focusIndicator;
    this.saveSettings();
    this.applySettings();
  }

  announceToScreenReader(message: string): void {
    if (this.settings.screenReader) {
      const announcement = document.createElement('div');
      announcement.setAttribute('aria-live', 'polite');
      announcement.setAttribute('aria-atomic', 'true');
      announcement.className = 'sr-only';
      announcement.textContent = message;

      document.body.appendChild(announcement);

      setTimeout(() => {
        document.body.removeChild(announcement);
      }, 1000);
    }
  }

  setFocus(element: HTMLElement): void {
    if (element) {
      element.focus();
      this.announceToScreenReader('Element focused');
    }
  }

  skipToMainContent(): void {
    const mainContent =
      document.querySelector('main') || document.querySelector('[role="main"]');
    if (mainContent) {
      this.setFocus(mainContent as HTMLElement);
      this.announceToScreenReader('Skipped to main content');
    }
  }

  skipToNavigation(): void {
    const navigation =
      document.querySelector('nav') ||
      document.querySelector('[role="navigation"]');
    if (navigation) {
      this.setFocus(navigation as HTMLElement);
      this.announceToScreenReader('Skipped to navigation');
    }
  }

  validateFormAccessibility(form: HTMLFormElement): string[] {
    const issues: string[] = [];

    // Check for labels
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach((input: Element) => {
      const inputElement = input as HTMLInputElement;
      const label = form.querySelector(`label[for="${inputElement.id}"]`);

      if (
        !label &&
        !inputElement.getAttribute('aria-label') &&
        !inputElement.getAttribute('aria-labelledby')
      ) {
        issues.push(
          `Input ${inputElement.name || inputElement.type} is missing a label`
        );
      }
    });

    // Check for error messages
    const errorMessages = form.querySelectorAll('[role="alert"]');
    if (errorMessages.length === 0) {
      issues.push('Form is missing error message announcements');
    }

    return issues;
  }

  addKeyboardNavigation(): void {
    document.addEventListener('keydown', (event) => {
      // Escape key to close modals
      if (event.key === 'Escape') {
        const modal = document.querySelector('.modal.active, .dropdown.active');
        if (modal) {
          (modal as HTMLElement).click();
        }
      }

      // Tab key navigation
      if (event.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
  }

  enhanceImages(): void {
    const images = document.querySelectorAll('img');
    images.forEach((img: Element) => {
      const imageElement = img as HTMLImageElement;

      if (!imageElement.alt && !imageElement.getAttribute('aria-label')) {
        imageElement.setAttribute('alt', 'Image');
      }
    });
  }

  enhanceButtons(): void {
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button: Element) => {
      const buttonElement = button as HTMLButtonElement;

      if (
        !buttonElement.getAttribute('aria-label') &&
        !buttonElement.textContent?.trim()
      ) {
        buttonElement.setAttribute('aria-label', 'Button');
      }
    });
  }

  getAccessibilityReport(): any {
    const images = document.querySelectorAll('img');
    const buttons = document.querySelectorAll('button');
    const links = document.querySelectorAll('a');
    const forms = document.querySelectorAll('form');

    let imagesWithoutAlt = 0;
    let buttonsWithoutLabel = 0;
    let linksWithoutText = 0;

    images.forEach((img: Element) => {
      const imageElement = img as HTMLImageElement;
      if (!imageElement.alt && !imageElement.getAttribute('aria-label')) {
        imagesWithoutAlt++;
      }
    });

    buttons.forEach((button: Element) => {
      const buttonElement = button as HTMLButtonElement;
      if (
        !buttonElement.getAttribute('aria-label') &&
        !buttonElement.textContent?.trim()
      ) {
        buttonsWithoutLabel++;
      }
    });

    links.forEach((link: Element) => {
      const linkElement = link as HTMLAnchorElement;
      if (
        !linkElement.textContent?.trim() &&
        !linkElement.getAttribute('aria-label')
      ) {
        linksWithoutText++;
      }
    });

    return {
      totalImages: images.length,
      imagesWithoutAlt,
      totalButtons: buttons.length,
      buttonsWithoutLabel,
      totalLinks: links.length,
      linksWithoutText,
      totalForms: forms.length,
      accessibilityScore: this.calculateAccessibilityScore({
        imagesWithoutAlt,
        buttonsWithoutLabel,
        linksWithoutText,
        totalImages: images.length,
        totalButtons: buttons.length,
        totalLinks: links.length,
      }),
    };
  }

  private calculateAccessibilityScore(data: any): number {
    const totalElements =
      data.totalImages + data.totalButtons + data.totalLinks;
    const issues =
      data.imagesWithoutAlt + data.buttonsWithoutLabel + data.linksWithoutText;

    if (totalElements === 0) return 100;

    return Math.max(
      0,
      Math.round(((totalElements - issues) / totalElements) * 100)
    );
  }
}
