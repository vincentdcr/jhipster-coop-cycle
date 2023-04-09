import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import Utilisateur from './utilisateur';
import Payment from './payment';
import Basket from './basket';
import Product from './product';
import Restaurant from './restaurant';
import Cooperative from './cooperative';
import Order from './order';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="utilisateur/*" element={<Utilisateur />} />
        <Route path="payment/*" element={<Payment />} />
        <Route path="basket/*" element={<Basket />} />
        <Route path="product/*" element={<Product />} />
        <Route path="restaurant/*" element={<Restaurant />} />
        <Route path="cooperative/*" element={<Cooperative />} />
        <Route path="order/*" element={<Order />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
