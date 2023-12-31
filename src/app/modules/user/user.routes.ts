import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { userController } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();

router.post(
  '/create-performer',
  validateRequest(UserValidation.UserValidationSchema),
  userController.createPerformer
);

router.post(
  '/create-admin',
  validateRequest(UserValidation.UserValidationSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  userController.createAdmin
);

export const userRoutes = router;
