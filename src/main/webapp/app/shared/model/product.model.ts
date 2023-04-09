import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IBasket } from 'app/shared/model/basket.model';

export interface IProduct {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  restaurant?: IRestaurant | null;
  baskets?: IBasket[] | null;
}

export const defaultValue: Readonly<IProduct> = {};
