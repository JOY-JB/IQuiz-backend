"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_controller_1 = require("./user.controller");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.post('/create-performer', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserValidationSchema), user_controller_1.userController.createPerformer);
router.post('/create-admin', (0, validateRequest_1.default)(user_validation_1.UserValidation.UserValidationSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.userController.createAdmin);
exports.userRoutes = router;
