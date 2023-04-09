import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Basket from './basket';
import BasketDetail from './basket-detail';
import BasketUpdate from './basket-update';
import BasketDeleteDialog from './basket-delete-dialog';

const BasketRoutes = () => (
  <ErrorBoundaryRoutes>
    <Route index element={<Basket />} />
    <Route path="new" element={<BasketUpdate />} />
    <Route path=":id">
      <Route index element={<BasketDetail />} />
      <Route path="edit" element={<BasketUpdate />} />
      <Route path="delete" element={<BasketDeleteDialog />} />
    </Route>
  </ErrorBoundaryRoutes>
);

export default BasketRoutes;
