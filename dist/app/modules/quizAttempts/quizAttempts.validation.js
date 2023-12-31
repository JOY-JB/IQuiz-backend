"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizAttemptValidation = void 0;
const zod_1 = require("zod");
const quizAttemptCreateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        quizCategoryId: zod_1.z.string({
            required_error: 'Quiz category ID is required',
        }),
        score: zod_1.z.number({
            required_error: 'Score is required',
        }),
        startedAt: zod_1.z.string({
            required_error: 'Started time is required',
        }),
        completedAt: zod_1.z.string({
            required_error: 'Completed time is required',
        }),
    }),
});
exports.quizAttemptValidation = {
    quizAttemptCreateValidationSchema,
};
