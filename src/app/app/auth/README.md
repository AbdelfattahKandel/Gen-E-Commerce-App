# Auth Component - Combined Login/Register

## Overview

The Auth component is a unified authentication page that combines both login and registration functionality in a single, elegant interface. Users can seamlessly switch between login and register modes without page navigation.

## Features

### 🔄 **Mode Toggle**

- **Toggle Buttons**: Two buttons at the top allow switching between "Sign In" and "Sign Up" modes
- **Dynamic Content**: Form fields, validation, and messaging change based on the selected mode
- **Smooth Transitions**: Animated transitions when switching between modes

### 📝 **Form Fields**

#### Login Mode:

- Email Address
- Password (with show/hide toggle)
- Remember me checkbox
- Forgot password link

#### Register Mode:

- First Name & Last Name (side by side)
- Email Address
- Phone Number
- Password (with show/hide toggle)
- Confirm Password (with show/hide toggle)
- Terms & Conditions checkbox
- Newsletter subscription checkbox

### ✅ **Validation**

- **Real-time validation** with error messages
- **Email format validation**
- **Password strength requirements** (minimum 6 characters)
- **Password confirmation matching** (register mode)
- **Required field validation**

### 🔐 **Security Features**

- **Password visibility toggle** for both password fields
- **Form data reset** when switching modes
- **Loading states** during form submission

### 🌐 **Social Login**

- **Google Sign-in** button
- **Facebook Sign-in** button
- **Dynamic button text** based on current mode

### 🎨 **Design Features**

- **Responsive design** for all screen sizes
- **Dark mode support** with automatic detection
- **Consistent styling** with the rest of the application
- **Smooth animations** and hover effects
- **Accessibility features** (ARIA labels, keyboard navigation)

## Usage

### Navigation

- **Direct access**: `/auth`
- **Login redirect**: `/login` → `/auth`
- **Register redirect**: `/register` → `/auth`

### Component Methods

```typescript
// Toggle between login and register modes
toggleMode(): void

// Toggle password visibility
togglePasswordVisibility(): void
toggleConfirmPasswordVisibility(): void

// Form submission
onSubmit(): void

// Social login
onSocialLogin(provider: string): void
```

### Form Data Structure

```typescript
formData = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
};
```

### Error Handling

```typescript
errors = {
  firstName: string,
  lastName: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string,
};
```

## Styling

The component uses the same design system as the rest of the application:

- **Primary Colors**: `#2563eb` (blue), `#90b4fa` (light blue)
- **Background**: Radial gradient with light blue tones
- **Dark Mode**: Automatic detection with dark theme support
- **Typography**: Consistent font weights and spacing
- **Animations**: Smooth transitions using `cubic-bezier(0.4, 0, 0.2, 1)`

## Integration

### Routes

The component is integrated into the routing system:

- `/auth` - Main auth page
- `/login` - Redirects to `/auth`
- `/register` - Redirects to `/auth`

### Header Navigation

Updated header links point to `/auth` for both login and register actions.

## Future Enhancements

- [ ] Add password strength indicator
- [ ] Implement actual API integration
- [ ] Add email verification flow
- [ ] Add two-factor authentication
- [ ] Add biometric authentication support
- [ ] Add "Remember me" functionality
- [ ] Add password reset flow
