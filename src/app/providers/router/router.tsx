import { AppRouter } from 'app/providers/router/AppRouter';
import { Login, Register, Restore, ResetPassword } from 'pages/auth';
import { Categories } from 'pages/categories';
import { Home } from 'pages/home';
import { Profile } from 'pages/profile';
import { Rating } from 'pages/rating';
import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from 'shared/constants/routes';
import { AuthLayout } from 'widgets/layout';
import { Questions } from 'widgets/questions';
import { Task } from 'widgets/task';
import { Test } from 'widgets/test';
import { Topics } from 'widgets/topics';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <AppRouter />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: ROUTES.LOGIN, element: <Login /> },
          { path: ROUTES.REGISTER, element: <Register /> },
          { path: ROUTES.RESTORE, element: <Restore /> },
          { path: ROUTES.RESET_PASSWORD, element: <ResetPassword /> },
        ],
      },
      { path: ROUTES.HOME, element: <Home /> },
      { path: ROUTES.QUESTIONS, element: <Categories /> },
      { path: ROUTES.QUESTIONS_CONTENT, element: <Questions /> },
      { path: ROUTES.TESTS, element: <Categories /> },
      { path: ROUTES.TESTS_CATEGORY, element: <Topics /> },
      { path: ROUTES.TEST, element: <Test /> },
      { path: ROUTES.TASKS, element: <Categories /> },
      { path: ROUTES.TASKS_CATEGORY, element: <Topics /> },
      { path: ROUTES.TASK, element: <Task /> },
      { path: ROUTES.PROFILE, element: <Profile /> },
      { path: ROUTES.RATING, element: <Rating /> },
    ],
  },
]);
