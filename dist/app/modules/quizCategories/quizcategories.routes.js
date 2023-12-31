"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizCategoryRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const quizCategories_controller_1 = require("./quizCategories.controller");
const quizCategories_validation_1 = require("./quizCategories.validation");
const router = express_1.default.Router();
router.get('/', quizCategories_controller_1.quizCategoryController.getAllQuizCategories);
router.get('/:id', quizCategories_controller_1.quizCategoryController.getQuizCategoryById);
router.post('/', (0, validateRequest_1.default)(quizCategories_validation_1.quizCategoryValidation.quizCategoryCreateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), quizCategories_controller_1.quizCategoryController.createQuizCategories);
router.patch('/:id', (0, validateRequest_1.default)(quizCategories_validation_1.quizCategoryValidation.quizCategoryUpdateValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), quizCategories_controller_1.quizCategoryController.updateQuizCategoryById);
router.delete('/:id', (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), quizCategories_controller_1.quizCategoryController.deleteQuizCategoryById);
exports.quizCategoryRoutes = router;
