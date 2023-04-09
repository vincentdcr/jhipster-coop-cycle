import utilisateur from 'app/entities/utilisateur/utilisateur.reducer';
import payment from 'app/entities/payment/payment.reducer';
import basket from 'app/entities/basket/basket.reducer';
import product from 'app/entities/product/product.reducer';
import restaurant from 'app/entities/restaurant/restaurant.reducer';
import cooperative from 'app/entities/cooperative/cooperative.reducer';
import order from 'app/entities/order/order.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

const entitiesReducers = {
  utilisateur,
  payment,
  basket,
  product,
  restaurant,
  cooperative,
  order,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
};

export default entitiesReducers;
