import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FieldValues, ResolverResult, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import '@testing-library/jest-dom';

import PasswordEntry from './PasswordEntry';
import { PasswordInputProps } from '../password-input';
import { PasswordEntryType } from '../../lib/utilities/schema';

// Mock the dependencies using vi.mock with ES module syntax
vi.mock('react-hook-form', async () => {
  const actual = await vi.importActual('react-hook-form');
  return {
    ...actual,
    useForm: vi.fn()
  };
});

vi.mock('@hookform/resolvers/zod', async () => {
  return {
    zodResolver: vi.fn()
  };
});

vi.mock('../../lib/utilities/schema', () => {
  return {
    passwordSchema: {},
    PasswordEntryType: {
      password: '',
      passwordConfirmation: ''
    }
  };
});

vi.mock('../password-input', () => {
  return {
    PasswordInput: ({ label, name, register, errors }: PasswordInputProps) => (
      <div data-testid={`password-input-${name}`}>
        <label>{label}</label>
        <input type="password" {...register(name)} />
        {errors[name] && <span>{errors[name].message}</span>}
      </div>
    )
  };
});

describe('PasswordEntry', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // Setup default mock implementation for useForm
    vi.mocked(useForm).mockReturnValue({
      register: vi.fn().mockImplementation((name) => ({ name })),
      handleSubmit: vi.fn().mockImplementation(cb => (data: PasswordEntryType) => cb(data)),
      formState: {
        errors: {},
        isSubmitting: false,
      },
      reset: vi.fn()
    });

    // Setup default mock implementation for zodResolver
    vi.mocked(zodResolver).mockReturnValue(() => ({ values: {} } as ResolverResult<FieldValues>));
  });

  it('renders correctly with header and form elements', () => {
    render(<PasswordEntry />);

    // Check if header is rendered
    expect(screen.getByText('Create your account password')).toBeInTheDocument();

    // Check if both password inputs are rendered
    expect(screen.getByTestId('password-input-password')).toBeInTheDocument();
    expect(screen.getByTestId('password-input-passwordConfirmation')).toBeInTheDocument();

    // Check if submit button is rendered with correct text
    const submitButton = screen.getByRole('button', { name: /create password/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).not.toBeDisabled();
  });

  it('shows loading state when form is submitting', async () => {
    // Mock the useForm to return isSubmitting as true
    vi.mocked(useForm).mockReturnValue({
      register: vi.fn().mockImplementation((name) => ({ name })),
      handleSubmit: vi.fn().mockImplementation(cb => (data: PasswordEntryType) => cb(data)),
      formState: {
        errors: {},
        isSubmitting: true
      },
      reset: vi.fn()
    });

    render(<PasswordEntry />);

    // Check if submit button shows loading text and is disabled
    const submitButton = screen.getByRole('button', { name: /processing/i });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
  });

  it('handles form submission correctly', async () => {
    // Spy on console.log
    const consoleSpy = vi.spyOn(console, 'log');

    // Mock the useForm to return a working handleSubmit
    const resetMock = vi.fn();
    vi.mocked(useForm).mockReturnValue({
      register: vi.fn().mockImplementation((name) => ({ name })),
      handleSubmit: vi.fn().mockImplementation(cb => async (e) => {
        e.preventDefault();
        await cb({
          password: 'Password123!',
          passwordConfirmation: 'Password123!'
        });
      }),
      formState: {
        errors: {},
        isSubmitting: false
      },
      reset: resetMock
    });

    render(<PasswordEntry />);

    // Submit the form
    const submitButton = screen.getByRole('button', { name: /create password/i });
    fireEvent.click(submitButton);

    // Wait for the setTimeout in handleOnSubmit
    await waitFor(() => {
      // Check if console.log was called with the form data
      expect(consoleSpy).toHaveBeenCalledWith('Button clicked', {
        password: 'Password123!',
        passwordConfirmation: 'Password123!'
      });

      // Check if reset was called
      expect(resetMock).toHaveBeenCalled();
    }, { timeout: 2000 });
  });

  it('displays validation errors when form has errors', () => {
    // Mock the useForm to return errors
    vi.mocked(useForm).mockReturnValue({
      register: vi.fn().mockImplementation((name) => ({ name })),
      handleSubmit: vi.fn().mockImplementation(cb => (data: PasswordEntryType) => cb(data)),
      formState: {
        errors: {
          password: {
            message: 'Password is required'
          },
          passwordConfirmation: {
            message: 'Passwords must match'
          }
        },
        isSubmitting: false
      },
      reset: vi.fn()
    });

    render(<PasswordEntry />);

    // Check if error messages are passed to PasswordInput components
    const passwordInput = screen.getByTestId('password-input-password');
    const confirmationInput = screen.getByTestId('password-input-passwordConfirmation');

    expect(passwordInput).toContainHTML('Password is required');
    expect(confirmationInput).toContainHTML('Passwords must match');
  });

  it('applies correct CSS classes', () => {
    render(<PasswordEntry />);

    // Check component root class
    const component = screen.getByText('Create your account password').closest('.PasswordEntry');
    expect(component).toHaveClass('PasswordEntry');

    // Check header class
    const header = screen.getByText('Create your account password');
    expect(header).toHaveClass('PasswordEntry__header');

    // Check submit button class
    const submitButton = screen.getByRole('button', { name: /create password/i });
    expect(submitButton).toHaveClass('PasswordEntry__submit-button');
  });
});
