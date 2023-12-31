import express from 'express';
import { authRoutes } from '../modules/auth/auth.route';
import { questionRoutes } from '../modules/questions/questions.routes';
import { quizAttemptRoutes } from '../modules/quizAttempts/quizAttempts.routes';
import { quizCategoryRoutes } from '../modules/quizCategories/quizcategories.routes';
import { userRoutes } from '../modules/user/user.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/quiz-attempts',
    routes: quizAttemptRoutes,
  },
  {
    path: '/questions',
    routes: questionRoutes,
  },
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
