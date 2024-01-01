"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const utils_1 = require("../../../shared/utils");
const createPerformer = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (isEmailExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Email is Already Registered! Please choose another mail');
    }
    data.role = 'PERFORMER';
    data.password = yield utils_1.utils.hashedPassword(data.password);
    const result = prisma_1.default.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ userId: (yield result).id, role: 'PERFORMER' }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
const createAdmin = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield prisma_1.default.user.findUnique({
        where: {
            email: data.email,
        },
    });
    if (isEmailExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'This Email is Already Registered! Please choose another mail');
    }
    data.role = 'ADMIN';
    data.password = yield utils_1.utils.hashedPassword(data.password);
    const result = prisma_1.default.user.create({
        data,
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    return result;
});
const getAllPerformer = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.user.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: {
            role: client_1.UserRole.PERFORMER,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            quizzes: true,
            quizAttempts: true,
        },
    });
    const total = yield prisma_1.default.question.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const getAllAdmin = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.user.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: {
            role: client_1.UserRole.ADMIN,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
        },
    });
    const total = yield prisma_1.default.question.count();
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
exports.userService = {
    createPerformer,
    createAdmin,
    getAllPerformer,
    getAllAdmin,
};
