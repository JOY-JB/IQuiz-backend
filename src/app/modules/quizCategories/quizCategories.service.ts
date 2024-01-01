import { Prisma, QuizCategory } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { quizCategoriesSearchableFields } from './quizCategories.constant';
import { IQuizCategoryFilterRequest } from './quizCategories.interaface';

const getAllQuizCategories = async (
  filters: IQuizCategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<QuizCategory[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: quizCategoriesSearchableFields.map(field => ({
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
            equals: (filterData as any)[key],
          },
        };
      }),
    });
  }

  const whereConditions: Prisma.QuizCategoryWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.quizCategory.findMany({
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    where: whereConditions,
    include: {
      user: true,
      questions: true,
      QuizAttempts: true,
    },
  });

  const total = await prisma.quizCategory.count({
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
};

const createQuizCategories = async (
  data: QuizCategory
): Promise<QuizCategory> => {
  const isExist = await prisma.quizCategory.findFirst({
    where: {
      title: data.title,
      description: data.description,
      userId: data.userId,
    },
  });

  if (isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category already exist!');
  }

  const createdQuizCategorie = await prisma.quizCategory.create({
    data,
    include: {
      user: true,
    },
  });

  return createdQuizCategorie;
};

const getQuizCategoriesById = async (id: string): Promise<QuizCategory> => {
  const quizCategoryData = await prisma.quizCategory.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
      questions: true,
      QuizAttempts: true,
    },
  });

  if (!quizCategoryData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not Found!');
  }

  return quizCategoryData;
};

const updateQuizCategoriesById = async (
  id: string,
  payload: Partial<QuizCategory>
): Promise<QuizCategory> => {
  const quizCategoryData = await prisma.quizCategory.findUnique({
    where: {
      id,
    },
  });

  if (!quizCategoryData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not Found!');
  }

  const result = await prisma.quizCategory.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteQuizCategoriesById = async (id: string): Promise<QuizCategory> => {
  const categoryData = await prisma.quizCategory.findUnique({
    where: {
      id,
    },
  });

  const isQuestionsExist = await prisma.question.findFirst({
    where: {
      quizCategoryId: id,
    },
  });

  if (!categoryData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'category not Found!');
  }

  if (isQuestionsExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Unable to delete category, category has questions!'
    );
  }

  const result = await prisma.quizCategory.delete({
    where: {
      id,
    },
  });
  return result;
};

export const quizCategoryService = {
  getAllQuizCategories,
  createQuizCategories,
  getQuizCategoriesById,
  updateQuizCategoriesById,
  deleteQuizCategoriesById,
};
