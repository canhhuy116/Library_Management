import React from 'react';
import { RouteObject } from 'react-router-dom';
import AppLayout from '@/pages/layout';
import { IRoute, appRouters } from '@/routes/route.config';

export default [
  {
    path: '/',
    element: <AppLayout />,
    children: appRouters.map((route: IRoute, index: number) => {
      return {
        path: route.path,
        element: <route.component />,
      };
    }),
  },
] as RouteObject[];
