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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.quizCategoryService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const quizCategories_constant_1 = require("./quizCategories.constant");
const getAllQuizCategories = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            OR: quizCategories_constant_1.quizCategoriesSearchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filterData).length > 0) {
        andConditions.push({
            AND: Object.keys(filterData).map(key => {
                return {
                    [key]: {
                        equals: filterData[key],
                    },
                };
            }),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : {};
    const result = yield prisma_1.default.quizCategory.findMany({
        skip,
        take: limit,
        orderBy: {
            [sortBy]: sortOrder,
        },
        where: whereConditions,
        include: {
            user: true,
        },
    });
    const total = yield prisma_1.default.quizCategory.count({
        where: whereConditions,
    });
    return {
        meta: {
            total,
            page,
            limit,
        },
        data: result,
    };
});
const createQuizCategories = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.quizCategory.findFirst({
        where: {
            title: data.title,
            description: data.description,
            userId: data.userId,
        },
    });
    if (isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Category already exist!');
    }
    const createdQuizCategorie = yield prisma_1.default.quizCategory.create({
        data,
        include: {
            user: true,
        },
    });
    return createdQuizCategorie;
});
const getQuizCategoriesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const quizCategoryData = yield prisma_1.default.quizCategory.findUnique({
        where: {
            id,
        },
    });
    if (!quizCategoryData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Category not Found!');
    }
    return quizCategoryData;
});
const updateQuizCategoriesById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const quizCategoryData = yield prisma_1.default.quizCategory.findUnique({
        where: {
            id,
        },
    });
    if (!quizCategoryData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Category not Found!');
    }
    const result = yield prisma_1.default.quizCategory.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteQuizCategoriesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const categoryData = yield prisma_1.default.quizCategory.findUnique({
        where: {
            id,
        },
    });
    const isQuestionsExist = yield prisma_1.default.question.findFirst({
        where: {
            quizCategoryId: id,
        },
    });
    if (!categoryData) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'category not Found!');
    }
    if (isQuestionsExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Unable to delete category, category has questions!');
    }
    const result = yield prisma_1.default.quizCategory.delete({
        where: {
            id,
        },
    });
    return result;
});
exports.quizCategoryService = {
    getAllQuizCategories,
    createQuizCategories,
    getQuizCategoriesById,
    updateQuizCategoriesById,
    deleteQuizCategoriesById,
};
