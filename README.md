# Quiz Management Application

This repository contains the source code for a Quiz Management Application. The application allows admins to create and manage quizzes, track performers' scores, and provides an interactive quiz-taking experience. The technology stack includes Next.js, TypeScript, Redux for the frontend, and Express, TypeScript, PostgreSQL, and Prisma for the backend.

## Live Link

[Frontend Live Link](https://iquiz-frontend.vercel.app/)

[Backend Live Llink](https://iquiz-backend.vercel.app/)

## Github Link

[Frontend Github Repository](https://github.com/JOY-JB/IQuiz-frontend.git)

[Backend Github Repository](https://github.com/JOY-JB/IQuiz-backend)

## Overview

This Quiz Management Application is designed to facilitate the creation, management, and tracking of quizzes. Admins can efficiently create quizzes with randomized questions and answer options, while performers can engage in quizzes and receive immediate feedback on their performance.

### Randomization

- Random question selection is managed in the backend.
- Randomization of answer options is handled in the frontend.

### Admin Credentials

- Email: admin@admin.com
- Password: 123456

### Postman Documentation

Explore the API endpoints using the [Postman documentation](https://documenter.getpostman.com/view/24132938/2s9YsDmbDJ).

## Features

1. **User Authentication**

   - Role-based authentication: Admin and Performer roles.
   - Sign up, log in, and account management functionalities.

2. **Quiz Creation and Management**

   - Admins can create quizzes with single and multiple-choice questions.
   - Add questions, answer options, and correct answers.
   - Categorize quizzes.
   - Edit and delete quizzes.

3. **Quiz Taking**

   - Performers can attend quizzes and receive immediate feedback on their answers.
   - Performers select a single category and answer random questions.
   - Questions are presented one by one with randomized answer options.
   - Scores are calculated and displayed upon quiz completion.
   - Leaderboard functionality to showcase top performers.

4. **Score Tracking**

   - Store and display user scores for each quiz.

5. **Database Integration**

   - PostgreSQL is used as the database.
   - Prisma is employed as the ORM for seamless database interactions.

6. **Error Handling**

   - Implement robust error-handling mechanisms.
   - Display informative error messages to users for a smoother experience.

7. **User-Friendly Interface**
   - Clean and intuitive UI using Next.js for views.
   - State management with Redux for enhanced application performance.

## Tech Stack

- **Frontend:**

  - Next.js
  - Ant Design
  - TypeScript
  - Redux

- **Backend:**
  - Express
  - TypeScript
  - PostgreSQL
  - Prisma
