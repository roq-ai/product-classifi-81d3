import { ClassificationInterface } from 'interfaces/classification';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProductInterface {
  id?: string;
  description: string;
  category: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  classification?: ClassificationInterface[];
  user?: UserInterface;
  _count?: {
    classification?: number;
  };
}

export interface ProductGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  category?: string;
  user_id?: string;
}
