"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAttemptRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const quizAttempts_controller_1 = require("./quizAttempts.controller");
const quizAttempts_validation_1 = require("./quizAttempts.validation");
const router = express_1.default.Router();
router.post('/submit', (0, validateRequest_1.default)(quizAttempts_validation_1.quizAttemptValidation.quizAttemptCreateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.PERFORMER), quizAttempts_controller_1.quizAttemptController.submitQuizAttempt);
exports.quizAttemptRoutes = router;
