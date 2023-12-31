"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = require("zod");
const UserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({
            required_error: 'Name is required',
        }),
        email: zod_1.z
            .string({
            required_error: 'Email is required',
        })
            .email({
            message: 'Invalid email format',
        }),
        password: zod_1.z.string({
            required_error: 'Password is required',
        }),
    }),
});
const UserUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        email: zod_1.z
            .string()
            .email({
            message: 'Invalid email format',
        })
            .optional(),
        password: zod_1.z.string().optional(),
    }),
});
const userProfileUpdateValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, { message: 'Name is required' }).optional(),
        email: zod_1.z.string().email({ message: 'Invalid email format' }).optional(),
        oldPassword: zod_1.z
            .string()
            .min(6, { message: 'Old password is required' })
            .optional(),
        newPassword: zod_1.z
            .string()
            .min(6, { message: 'New password is required' })
            .optional(),
    }),
});
exports.UserValidation = {
    UserValidationSchema,
    UserUpdateValidationSchema,
    userProfileUpdateValidationSchema,
};
