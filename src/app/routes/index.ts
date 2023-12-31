import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { quizCategoryRoutes } from '../modules/quizCategories/quizcategories.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/quiz-categories',
    routes: quizCategoryRoutes,
  },
  {
    path: '/users',
    routes: userRoutes,
  },
  {
    path: '/auth',
    routes: authRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
