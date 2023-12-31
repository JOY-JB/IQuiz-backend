"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const questions_routes_1 = require("../modules/questions/questions.routes");
const quizAttempts_routes_1 = require("../modules/quizAttempts/quizAttempts.routes");
const quizcategories_routes_1 = require("../modules/quizCategories/quizcategories.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/quiz-attempts',
        routes: quizAttempts_routes_1.quizAttemptRoutes,
    },
    {
        path: '/questions',
        routes: questions_routes_1.questionRoutes,
    },
    {
        path: '/quiz-categories',
        routes: quizcategories_routes_1.quizCategoryRoutes,
    },
    {
        path: '/users',
        routes: user_routes_1.userRoutes,
    },
    {
        path: '/auth',
        routes: auth_route_1.authRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.routes));
exports.default = router;
