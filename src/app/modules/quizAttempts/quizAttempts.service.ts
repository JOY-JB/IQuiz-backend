import { QuizAttempt } from '@prisma/client';
import prisma from '../../../shared/prisma';

const submitQuizAttempt = async (data: QuizAttempt): Promise<QuizAttempt> => {
  const submittedQuizAttempt = await prisma.quizAttempt.create({
    data,
  });

  return submittedQuizAttempt;
};

export const quizAttemptService = {
  submitQuizAttempt,
};
