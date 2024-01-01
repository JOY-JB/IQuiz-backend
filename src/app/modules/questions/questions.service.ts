import { Question } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';

const getAllQuestions = async (
  options: IPaginationOptions
): Promise<IGenericResponse<Partial<Question>[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const result = await prisma.question.findMany({
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

  const total = await prisma.question.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getQuestionByCategory = async (
  quizCategoryId: string
): Promise<Partial<Question[]>> => {
  const categoryData = await prisma.quizCategory.findUnique({
    where: {
      id: quizCategoryId,
    },
  });

  if (!categoryData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Category not found!');
  }

  const questionData = await prisma.question.findMany({
    where: {
      quizCategoryId,
    },
    include: {
      quizzes: true,
    },
  });

  if (!questionData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question not found!');
  }

  return questionData;
};

const createQuestion = async (data: Question): Promise<Question> => {
  const createdQuestion = await prisma.question.create({
    data,
  });

  return createdQuestion;
};

const getQuestionById = async (id: string): Promise<Partial<Question>> => {
  const questionData = await prisma.question.findUnique({
    where: {
      id,
    },
  });

  if (!questionData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question not found!');
  }

  return questionData;
};

const updateQuestionById = async (
  id: string,
  payload: Partial<Question>
): Promise<Question> => {
  const questionData = await prisma.question.findUnique({
    where: {
      id,
    },
  });

  if (!questionData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question not found!');
  }

  const result = await prisma.question.update({
    where: {
      id,
    },
    data: payload,
  });

  return result;
};

const deleteQuestionById = async (id: string): Promise<Question> => {
  const questionData = await prisma.question.findUnique({
    where: {
      id,
    },
  });

  if (!questionData) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Question not found!');
  }

  const result = await prisma.question.delete({
    where: {
      id,
    },
  });

  return result;
};

export const questionService = {
  getAllQuestions,
  createQuestion,
  getQuestionById,
  updateQuestionById,
  deleteQuestionById,
  getQuestionByCategory,
};
