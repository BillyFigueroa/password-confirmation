import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { passwordSchema, type PasswordEntryType } from '../lib/utilities/schema';

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
          <div>
            <label
              htmlFor="password"
              className="block text-sm/6 font-bold text-gray-900"
            >
              Enter password
            </label>

            <div className="mt-2">
              <input
                placeholder="i.e. F$Lp.*iCpbA2wqN"
                id="password"
                {...register('password')}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-[#246be8] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#246be8] sm:text-sm/6"
              />
            </div>
            <div>{errors.password && <div className="text-red-500">{errors.password?.message}</div>}</div>
          </div>

          <div>
            <label
              htmlFor="password-confirmation"
              className="block text-sm/6 font-bold text-gray-900"
            >
              Confirm password
            </label>

            <div className="mt-2">
              <input
                type="password-confirmation"
                placeholder="i.e. F$Lp.*iCpbA2wqN"
                id="password-confirmation"
                {...register('passwordConfirmation')}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-[#246be8] placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#246be8] sm:text-sm/6"
              />
            </div>
            <div>{errors.passwordConfirmation && <div className="text-red-500">{errors.passwordConfirmation?.message}</div>}</div>
          </div>

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