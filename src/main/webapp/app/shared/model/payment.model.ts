import { IOrder } from 'app/shared/model/order.model';
import { PaymentType } from 'app/shared/model/enumerations/payment-type.model';

export interface IPayment {
  id?: number;
  paymentType?: PaymentType;
  amount?: number;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IPayment> = {};
