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
exports.questionService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const getAllQuestions = (options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const result = yield prisma_1.default.question.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        select: {
            id: true,
            text: true,
            options: true,
            quizCategoryId: true,
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
const createQuestion = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const createdQuestion = yield prisma_1.default.question.create({
        data,
    });
    return createdQuestion;
});
const getQuestionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const questionData = yield prisma_1.default.question.findUnique({
        where: {
            id,
        },
    });
    if (!questionData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Question not found!');
    }
    return questionData;
});
const updateQuestionById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const questionData = yield prisma_1.default.question.findUnique({
        where: {
            id,
        },
    });
    if (!questionData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Question not found!');
    }
    const result = yield prisma_1.default.question.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteQuestionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const questionData = yield prisma_1.default.question.findUnique({
        where: {
            id,
        },
    });
    if (!questionData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Question not found!');
    }
    const result = yield prisma_1.default.question.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.questionService = {
    getAllQuestions,
    createQuestion,
    getQuestionById,
    updateQuestionById,
    deleteQuestionById,
};
