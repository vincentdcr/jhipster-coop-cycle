import { ICooperative } from 'app/shared/model/cooperative.model';
import { IBasket } from 'app/shared/model/basket.model';
import { IOrder } from 'app/shared/model/order.model';

export interface IUtilisateur {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  cooperatives?: ICooperative[] | null;
  baskets?: IBasket[] | null;
  orders?: IOrder[] | null;
}

export const defaultValue: Readonly<IUtilisateur> = {};
