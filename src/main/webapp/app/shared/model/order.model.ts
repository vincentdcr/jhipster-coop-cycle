import dayjs from 'dayjs';
import { IBasket } from 'app/shared/model/basket.model';
import { IPayment } from 'app/shared/model/payment.model';
import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';
import { OrderStatus } from 'app/shared/model/enumerations/order-status.model';

export interface IOrder {
  id?: number;
  orderDate?: string;
  orderStatus?: OrderStatus;
  basket?: IBasket | null;
  payment?: IPayment | null;
  restaurant?: IRestaurant | null;
  utilisateur?: IUtilisateur | null;
}

export const defaultValue: Readonly<IOrder> = {};
