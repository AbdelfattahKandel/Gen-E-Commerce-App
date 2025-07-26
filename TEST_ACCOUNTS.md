# Test Accounts for Gen Commerce

## 🔐 Authentication Test Accounts

### Admin Accounts

Use these accounts to access admin features:

| Email              | Password          | Role  | Name              |
| ------------------ | ----------------- | ----- | ----------------- |
| abdelfattah@gen.eg | Admin@2024#Secure | Admin | Abdelfattah Admin |
| tarek@gen.eg       | Admin@2024#Secure | Admin | Tarek Admin       |
| ali@gen.eg         | Admin@2024#Secure | Admin | Ali Admin         |

### User Accounts

Use these accounts to test user features:

| Email                  | Password         | Role | Name             |
| ---------------------- | ---------------- | ---- | ---------------- |
| abdelfattahuser@gen.eg | User@2024#Secure | User | Abdelfattah User |
| tarekuser@gen.eg       | User@2024#Secure | User | Tarek User       |
| aliuser@gen.eg         | User@2024#Secure | User | Ali User         |
| testuser@gen.eg        | Test@2024#Secure | User | Test User        |

## 🚀 How to Test

### 1. Login Testing

1. Navigate to `/login`
2. Use any of the above accounts
3. Verify successful login
4. Check role-based navigation

### 2. Registration Testing

1. Navigate to `/register`
2. Fill in all required fields:
   - First Name
   - Last Name
   - Username
   - Email
   - Password (minimum 6 characters)
   - Confirm Password
   - Accept Terms & Conditions
3. Click "Create Account"
4. Verify successful registration

### 3. Admin Features Testing

1. Login with an admin account
2. Navigate to `/admin`
3. Test admin dashboard features

### 4. User Features Testing

1. Login with a user account
2. Navigate to `/dashboard`
3. Test user dashboard features
4. Test shopping cart functionality

## 🔧 Development Notes

- All passwords are strong and secure
- Accounts are predefined for testing purposes
- Registration creates new user accounts
- Admin accounts have full access to all features
- User accounts have limited access based on role

## 🛡️ Security Features

- Password validation (minimum 6 characters)
- Email format validation
- Required field validation
- Terms & conditions acceptance
- Role-based access control
- Secure token management
