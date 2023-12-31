"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const questions_controller_1 = require("./questions.controller");
const questions_validation_1 = require("./questions.validation");
const router = express_1.default.Router();
router.get('/', questions_controller_1.questionController.getAllQuestions);
router.get('/:id', questions_controller_1.questionController.getQuestionById);
router.post('/', (0, validateRequest_1.default)(questions_validation_1.questionValidation.questionCreateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), questions_controller_1.questionController.createQuestion);
router.patch('/:id', (0, validateRequest_1.default)(questions_validation_1.questionValidation.questionUpdateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), questions_controller_1.questionController.updateQuestionById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), questions_controller_1.questionController.deleteQuestionById);
exports.questionRoutes = router;
