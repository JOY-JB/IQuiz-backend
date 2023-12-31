import { z } from 'zod';

const quizCategoryCreateValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    category: z.string({
      required_error: 'Category is required',
    }),
  }),
});

const quizCategoryUpdateValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
  }),
});

export const quizCategoryValidation = {
  quizCategoryCreateValidationSchema,
  quizCategoryUpdateValidationSchema,
};
