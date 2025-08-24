import { z } from 'zod';

export const formSchema = z
  .object({
    name: z
      .string()
      .min(1, 'Name is required')
      .regex(/^[A-Z].*$/, 'First letter must be uppercase'),
    age: z.number().positive('Age must be positive'),
    email: z.string().email('Invalid email'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain an uppercase letter')
      .regex(/[a-z]/, 'Must contain a lowercase letter')
      .regex(/[0-9]/, 'Must contain a number')
      .regex(/[^A-Za-z0-9]/, 'Must contain a special character'),
    confirmPassword: z.string(),
    gender: z.enum(['male', 'female']),
    terms: z.literal(true, { error: 'You must accept Terms & Conditions' }),
    picture: z
      .any()
      .refine((file) => file?.length === 1, 'Picture is required')
      .refine(
        (file) => ['image/jpeg', 'image/png'].includes(file?.[0]?.type),
        'Only .jpg or .png allowed'
      )
      .refine((file) => file?.[0]?.size <= 1_000_000, 'Max file size is 1MB'),
    country: z.string().min(1, 'Country is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords must match',
    path: ['confirmPassword'],
  });

export type FormData = z.infer<typeof formSchema>;
