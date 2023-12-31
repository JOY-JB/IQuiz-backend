import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { quizAttemptService } from './quizAttempts.service';

const submitQuizAttempt = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.user as any;
  const payload = req.body;
  payload.userId = userId;

  const result = await quizAttemptService.submitQuizAttempt(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quiz Attempt submitted successfully!',
    data: result,
  });
});

export const quizAttemptController = {
  submitQuizAttempt,
};
