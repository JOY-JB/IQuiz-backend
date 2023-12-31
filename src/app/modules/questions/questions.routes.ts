import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { questionController } from './questions.controller';
import { questionValidation } from './questions.validation';

const router = express.Router();

router.get('/', questionController.getAllQuestions);

router.get('/:id', questionController.getQuestionById);

router.post(
  '/',
  validateRequest(questionValidation.questionCreateValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  questionController.createQuestion
);

router.patch(
  '/:id',
  validateRequest(questionValidation.questionUpdateValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  questionController.updateQuestionById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  questionController.deleteQuestionById
);

export const questionRoutes = router;
