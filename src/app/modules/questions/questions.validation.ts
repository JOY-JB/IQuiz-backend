import { z } from 'zod';

const questionCreateValidationSchema = z.object({
  body: z.object({
    text: z.string({
      required_error: 'Text is required',
    }),
    options: z.array(z.string(), {
      required_error: 'Options are required',
    }),
    correctOption: z.string({
      required_error: 'Correct option is required',
    }),
    quizCategoryId: z.string({
      required_error: 'Quiz category ID is required',
    }),
  }),
});

const questionUpdateValidationSchema = z.object({
  body: z.object({
    text: z.string().optional(),
    options: z.array(z.string()).optional(),
    correctOption: z.string().optional(),
    quizCategoryId: z.string().optional(),
  }),
});

export const questionValidation = {
  questionCreateValidationSchema,
  questionUpdateValidationSchema,
};
