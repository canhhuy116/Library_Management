import React from 'react';
import { RouteObject } from 'react-router-dom';
import AppLayout from '@/pages/layout';
import { IRoute, appRouters, authRouter } from '@/routes/route.config';
import AuthLayout from '@/pages/layout/authLayout';

export default [
  {
    path: '/',
    element: <AppLayout />,
    children: appRouters.map((route: IRoute) => {
      return {
        path: route.path,
        element: <route.component />,
      };
    }),
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: authRouter.map((route: IRoute) => {
      return {
        path: route.path,
        element: <route.component />,
      };
    }),
  },
] as RouteObject[];
