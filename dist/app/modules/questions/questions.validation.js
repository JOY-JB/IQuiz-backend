"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.questionValidation = void 0;
const zod_1 = require("zod");
const questionCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string({
            required_error: 'Text is required',
        }),
        options: zod_1.z.array(zod_1.z.string(), {
            required_error: 'Options are required',
        }),
        correctOptions: zod_1.z.array(zod_1.z.string(), {
            required_error: 'correctOptions are required',
        }),
        quizCategoryId: zod_1.z.string({
            required_error: 'Quiz category ID is required',
        }),
    }),
});
const questionUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        text: zod_1.z.string().optional(),
        options: zod_1.z.array(zod_1.z.string()).optional(),
        correctOption: zod_1.z.string().optional(),
        quizCategoryId: zod_1.z.string().optional(),
    }),
});
exports.questionValidation = {
    questionCreateValidationSchema,
    questionUpdateValidationSchema,
};
