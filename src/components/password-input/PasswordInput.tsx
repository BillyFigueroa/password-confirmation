import { useState } from 'react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { type PasswordEntryType } from '../../lib/utilities/schema';

import './PasswordInput.css';

export interface PasswordInputProps {
  label: string,
  name: keyof PasswordEntryType,
  register: UseFormRegister<PasswordEntryType>,
  errors: FieldErrors<PasswordEntryType>
}

const PasswordInput = ({ label, name, register, errors }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="PasswordInput">
      <label
        htmlFor={name}
        className="PasswordInput__label"
      >
        {label}
      </label>

      <div className="PasswordInput__element-container">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="i.e. F$Lp.*iCpbA2wqN"
          id={name}
          {...register(name)}
          className="PasswordInput__element"
        />

        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="PasswordInput__visibility-button"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4.5">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>
          )}
        </button>
      </div>

      <div>
        {errors[name] && (
          <div className="text-red-500">{errors[name]?.message}</div>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
