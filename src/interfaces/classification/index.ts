import { ProductInterface } from 'interfaces/product';
import { AlgorithmInterface } from 'interfaces/algorithm';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ClassificationInterface {
  id?: string;
  product_id?: string;
  algorithm_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  product?: ProductInterface;
  algorithm?: AlgorithmInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ClassificationGetQueryInterface extends GetQueryInterface {
  id?: string;
  product_id?: string;
  algorithm_id?: string;
  user_id?: string;
}
