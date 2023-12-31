"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizCategoryValidation = void 0;
const zod_1 = require("zod");
const quizCategoryCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        description: zod_1.z.string({
            required_error: 'Description is required',
        }),
        category: zod_1.z.string({
            required_error: 'Category is required',
        }),
    }),
});
const quizCategoryUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        description: zod_1.z.string().optional(),
        category: zod_1.z.string().optional(),
    }),
});
exports.quizCategoryValidation = {
    quizCategoryCreateValidationSchema,
    quizCategoryUpdateValidationSchema,
};
