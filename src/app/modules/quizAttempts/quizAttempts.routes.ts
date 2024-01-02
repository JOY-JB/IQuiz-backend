import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { quizAttemptController } from './quizAttempts.controller';
import { quizAttemptValidation } from './quizAttempts.validation';

const router = express.Router();

router.post(
  '/submit',
  validateRequest(quizAttemptValidation.quizAttemptCreateValidationSchema),
  auth(ENUM_USER_ROLE.PERFORMER, ENUM_USER_ROLE.ADMIN),
  quizAttemptController.submitQuizAttempt
);

export const quizAttemptRoutes = router;
