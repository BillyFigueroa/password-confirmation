# Password Confirmation Component

A modern, secure password creation and confirmation component built with React, TypeScript, and Zod validation.

## Overview

This project provides a reusable password entry component with real-time validation and confirmation. It ensures passwords meet security requirements and match between the initial entry and confirmation fields. The component includes a toggle for password visibility and provides immediate feedback on validation errors.

## Features

- **Password Validation**: Enforces strong password requirements:
  - Minimum 6 characters length
  - At least one lowercase character
  - At least one uppercase character
  - At least one number
  - At least one special character
  - Password confirmation matching

- **Real-time Feedback**: Displays validation errors as users type
  
- **Password Visibility Toggle**: Allows users to show/hide password text
  
- **Form Submission Handling**: Includes loading state during submission

## Technologies Used

- **React 19**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Vite**: For fast development and optimized builds
- **React Hook Form**: For form state management and validation
- **Zod**: For schema-based form validation
- **Tailwind CSS**: For styling components

## Installation

```bash
# Clone the repository
git clone https://github.com/BillyFigueroa/password-confirmation.git

# Navigate to the project directory
cd password-confirmation

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

The main component can be imported and used in your React application:

```tsx
import { PasswordEntry } from './components/password-entry';

function App() {
  return (
    <div className="container">
      <PasswordEntry />
    </div>
  );
}
```

## Component Structure

- **PasswordEntry**: Main container component that handles form state and submission
- **PasswordInput**: Reusable input component with visibility toggle
- **BrandLogo**: SVG logo component

## Validation Schema

The password validation is handled by Zod with the following rules:

```typescript
export const passwordSchema = z.object({
  password: z.string()
    .nonempty('Password is required')
    .min(6, 'Password should be at least 6 characters long')
    .regex(/[a-z]{1,}/, 'Password must contain a lowercase character')
    .regex(/[A-Z]{1,}/, 'Password must contain an uppercase character')
    .regex(/\d{1,}/, 'Password must contain a number')
    .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/, 'Password must contain a special character'),
  passwordConfirmation: z.string()
    .nonempty('Password is required')
    .min(6, 'Password should be at least 6 characters long')
    .regex(/[a-z]{1,}/, 'Password must contain a lowercase character')
    .regex(/[A-Z]{1,}/, 'Password must contain an uppercase character')
    .regex(/\d{1,}/, 'Password must contain a number')
    .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/, 'Password must contain a special character')
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'Passwords don\'t match',
  path: ['passwordConfirmation']
})
```

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```
