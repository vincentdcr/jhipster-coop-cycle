import { IProduct } from 'app/shared/model/product.model';
import { IOrder } from 'app/shared/model/order.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface IBasket {
  id?: string;
  price?: number;
  products?: IProduct[] | null;
  order?: IOrder | null;
  utilisateur?: IUtilisateur | null;
}

export const defaultValue: Readonly<IBasket> = {};
