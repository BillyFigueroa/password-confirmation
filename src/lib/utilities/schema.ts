import { z } from 'zod'

export const passwordSchema = z.object({
  password: z.string()
    .nonempty('Password is required')
    .min(6, 'Password should be at least 6 characters long')
    .regex(/[a-z]{1,}/, 'Password must container a lowcase character')
    .regex(/[A-Z]{1,}/, 'Password must container an uppercase character')
    .regex(/\d{1,}/, 'Password must container a number')
    .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/, 'Password must container a special character'),
  passwordConfirmation: z.string()
    .nonempty('Password is required')
    .min(6, 'Password should be at least 6 characters long')
    .regex(/[a-z]{1,}/, 'Password must container a lowcase character')
    .regex(/[A-Z]{1,}/, 'Password must container an uppercase character')
    .regex(/\d{1,}/, 'Password must container a number')
    .regex(/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/, 'Password must container a special character'),
}).refine(data => data.password === data.passwordConfirmation, {
  message: 'Passwords don\'t match',
  path: ['passwordConfirmation']
})

export type PasswordEntryType = z.infer<typeof passwordSchema>