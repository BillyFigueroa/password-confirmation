import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema, type PasswordEntryType } from '../lib/utilities/schema';
import { PasswordInput } from '../password-input'

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
    <div className="flex flex-col w-full items-center">
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Create your account password</h2>

      <div className="mt-10 w-full">
        <form className="space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
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

          <button
            type="submit"
            className="flex w-full disabled:bg-gray-400 disabled:opacity-50 disabled:text-black disabled:cursor-not-allowed disabled:border-red-400 justify-center rounded-md bg-[#246be8] text-white px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-[#00539b] focus-visible:outline-2 focus-visible:outline-offset-2 mb-10"
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