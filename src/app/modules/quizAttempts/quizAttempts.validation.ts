import { z } from 'zod';

const quizAttemptCreateValidationSchema = z.object({
  body: z.object({
    quizCategoryId: z.string({
      required_error: 'Quiz category ID is required',
    }),
    score: z.number({
      required_error: 'Score is required',
    }),
    startedAt: z.string({
      required_error: 'Started time is required',
    }),
    completedAt: z.string({
      required_error: 'Completed time is required',
    }),
  }),
});

export const quizAttemptValidation = {
  quizAttemptCreateValidationSchema,
};
