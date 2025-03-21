import { z } from 'zod'
import { useForm  } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const PasswordEntry = () => {
  const pwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={[}\]|:;"'<,>.]).{6,}$/

  const passwordSchema = z.object({
    password: z.string()
      .nonempty('Password is required')
      .min(6, 'Password should be at least 6 characters long')
      .regex(pwRegex, 'Password should have correct format'),
    passwordConfirmation: z.string()
      .nonempty('Password is required')
      .min(6, 'Password should be at least 6 characters long')
      .regex(pwRegex, 'Password should have correct format'),
  }).refine(data => data.password === data.passwordConfirmation, {
    message: 'Passwords don\'t match',
    path: ['passwordConfirmation']
  })

  type PasswordEntryType = z.infer<typeof passwordSchema>

  const { formState: { errors, isSubmitting }, handleSubmit, register } = useForm<PasswordEntryType>({
    resolver: zodResolver(passwordSchema)
  });

  const handleOnSubmit = (formData: PasswordEntryType) => {
    console.log('Button clicked', formData);
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
            className="flex w-full justify-center rounded-md bg-[#246be8] text-white px-3 py-1.5 text-sm/6 font-semibold shadow-xs hover:bg-[#00539b] focus-visible:outline-2 focus-visible:outline-offset-2 mb-10"
            disabled={isSubmitting}
          >
            Create password
          </button>
        </form>
      </div>
    </div>
  )
}

export default PasswordEntry