import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { quizCategoryController } from './quizCategories.controller';
import { quizCategoryValidation } from './quizCategories.validation';

const router = express.Router();

router.get('/', quizCategoryController.getAllQuizCategories);

router.get('/:id', quizCategoryController.getQuizCategoryById);

router.post(
  '/',
  validateRequest(quizCategoryValidation.quizCategoryCreateValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  quizCategoryController.createQuizCategories
);

router.patch(
  '/:id',
  validateRequest(quizCategoryValidation.quizCategoryUpdateValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  quizCategoryController.updateQuizCategoryById
);

router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  quizCategoryController.deleteQuizCategoryById
);

export const quizCategoryRoutes = router;
