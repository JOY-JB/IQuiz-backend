import { z } from 'zod';

const UserValidationSchema = z.object({
  body: z.object({
    name: z.string({
      required_error: 'Name is required',
    }),
    email: z
      .string({
        required_error: 'Email is required',
      })
      .email({
        message: 'Invalid email format',
      }),
    password: z.string({
      required_error: 'Password is required',
    }),
  }),
});

const UserUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email({
        message: 'Invalid email format',
      })
      .optional(),
    password: z.string().optional(),
  }),
});

const userProfileUpdateValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, { message: 'Name is required' }).optional(),
    email: z.string().email({ message: 'Invalid email format' }).optional(),
    oldPassword: z
      .string()
      .min(6, { message: 'Old password is required' })
      .optional(),
    newPassword: z
      .string()
      .min(6, { message: 'New password is required' })
      .optional(),
  }),
});

export const UserValidation = {
  UserValidationSchema,
  UserUpdateValidationSchema,
  userProfileUpdateValidationSchema,
};
