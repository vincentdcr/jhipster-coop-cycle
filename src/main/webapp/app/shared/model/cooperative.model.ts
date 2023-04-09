import { IRestaurant } from 'app/shared/model/restaurant.model';
import { IUtilisateur } from 'app/shared/model/utilisateur.model';

export interface ICooperative {
  id?: number;
  name?: string;
  restaurants?: IRestaurant[] | null;
  utilisateur?: IUtilisateur | null;
}

export const defaultValue: Readonly<ICooperative> = {};
