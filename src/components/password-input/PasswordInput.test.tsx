import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import '@testing-library/jest-dom';

import PasswordInput from './PasswordInput';
import { PasswordEntryType } from '../../lib/utilities/schema';

// Mock the schema since we don't have access to the actual implementation
vi.mock('../../lib/utilities/schema', () => ({
  PasswordEntryType: {
    password: '',
    passwordConfirmation: ''
  }
}));

describe('PasswordInput', () => {
  // Mock props
  const mockRegister = vi.fn().mockReturnValue({
    name: 'password',
    onChange: vi.fn(),
    onBlur: vi.fn(),
    ref: vi.fn(),
  }) as unknown as UseFormRegister<PasswordEntryType>;

  const mockErrors: FieldErrors<PasswordEntryType> = {};

  const defaultProps = {
    label: 'Password',
    name: 'password' as keyof PasswordEntryType,
    register: mockRegister,
    errors: mockErrors
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly with label', () => {
    render(<PasswordInput {...defaultProps} />);

    // Check if label is rendered correctly
    expect(screen.getByText('Password')).toBeInTheDocument();

    // Check if input exists and is password type by default
    const input = screen.getByPlaceholderText('i.e. F$Lp.*iCpbA2wqN');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('type', 'password');

    // Check if toggle button exists with correct aria-label
    const toggleButton = screen.getByRole('button', { name: /show password/i });
    expect(toggleButton).toBeInTheDocument();

    // Verify register was called with the correct name
    expect(mockRegister).toHaveBeenCalledWith('password');
  });

  it('toggles password visibility when button is clicked', () => {
    render(<PasswordInput {...defaultProps} />);

    const input = screen.getByPlaceholderText('i.e. F$Lp.*iCpbA2wqN');
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    // Initially password should be hidden
    expect(input).toHaveAttribute('type', 'password');

    // Click the toggle button
    fireEvent.click(toggleButton);

    // Password should now be visible
    expect(input).toHaveAttribute('type', 'text');
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();

    // Click the toggle button again
    fireEvent.click(toggleButton);

    // Password should be hidden again
    expect(input).toHaveAttribute('type', 'password');
    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const errorMessage = 'Password is required';
    const propsWithError = {
      ...defaultProps,
      errors: {
        password: {
          type: 'required',
          message: errorMessage
        }
      } as unknown as FieldErrors<PasswordEntryType>
    };

    render(<PasswordInput {...propsWithError} />);

    // Check if error message is displayed
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('uses the provided name for input id and label htmlFor', () => {
    const customProps = {
      ...defaultProps,
      name: 'passwordConfirmation' as keyof PasswordEntryType,
      label: 'Confirm Password'
    };

    render(<PasswordInput {...customProps} />);

    // Check if label has correct htmlFor attribute
    const label = screen.getByText('Confirm Password');
    expect(label).toHaveAttribute('for', 'passwordConfirmation');

    // Check if input has correct id attribute
    const input = screen.getByPlaceholderText('i.e. F$Lp.*iCpbA2wqN');
    expect(input).toHaveAttribute('id', 'passwordConfirmation');

    // Verify register was called with the correct name
    expect(mockRegister).toHaveBeenCalledWith('passwordConfirmation');
  });

  it('applies correct CSS classes', () => {
    render(<PasswordInput {...defaultProps} />);

    // Check component root class
    const component = screen.getByText('Password').closest('.PasswordInput');
    expect(component).toHaveClass('PasswordInput');

    // Check label class
    const label = screen.getByText('Password');
    expect(label).toHaveClass('PasswordInput__label');

    // Check input container class
    const inputContainer = screen.getByPlaceholderText('i.e. F$Lp.*iCpbA2wqN').closest('.PasswordInput__element-container');
    expect(inputContainer).toHaveClass('PasswordInput__element-container');

    // Check input class
    const input = screen.getByPlaceholderText('i.e. F$Lp.*iCpbA2wqN');
    expect(input).toHaveClass('PasswordInput__element');

    // Check button class
    const button = screen.getByRole('button', { name: /show password/i });
    expect(button).toHaveClass('PasswordInput__visibility-button');
  });
});
