import { ClassificationInterface } from 'interfaces/classification';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AlgorithmInterface {
  id?: string;
  name: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  classification?: ClassificationInterface[];
  user?: UserInterface;
  _count?: {
    classification?: number;
  };
}

export interface AlgorithmGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  user_id?: string;
}
