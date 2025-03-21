import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema, type PasswordEntryType } from '../../lib/utilities/schema';
import { PasswordInput } from '../password-input'

import './PasswordEntry.css';

const PasswordEntry = () => {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset
  } = useForm<PasswordEntryType>({
    resolver: zodResolver(passwordSchema)
  });

  const handleOnSubmit = async (formData: PasswordEntryType) => {
    await new Promise(resolve => setTimeout(resolve, 1500))

    console.log('Button clicked', formData);

    // After form has been submitted reset
    reset()
  }

  return (
    <div className="PasswordEntry">
      <h2 className="PasswordEntry__header">Create your account password</h2>

      <div className="mt-10">
        <form className="space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
          <div>
            <PasswordInput
              label="Enter Password"
              name="password"
              register={register}
              errors={errors}
            />

            <PasswordInput
              label="Enter Password"
              name="passwordConfirmation"
              register={register}
              errors={errors}
            />
          </div>

          <button
            type="submit"
            className="PasswordEntry__submit-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Create password'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordEntry