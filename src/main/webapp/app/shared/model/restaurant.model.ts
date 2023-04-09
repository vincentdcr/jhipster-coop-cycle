import { IProduct } from 'app/shared/model/product.model';
import { IOrder } from 'app/shared/model/order.model';
import { ICooperative } from 'app/shared/model/cooperative.model';

export interface IRestaurant {
  id?: number;
  name?: string;
  location?: string;
  products?: IProduct[] | null;
  orders?: IOrder[] | null;
  cooperative?: ICooperative | null;
}

export const defaultValue: Readonly<IRestaurant> = {};
