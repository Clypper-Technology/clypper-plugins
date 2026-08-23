import { ApiPath } from '../shared/apiPaths';
import apifetch from '@wordpress/api-fetch';
import { Product } from '@/types/product';




export class ProductService {
  public static async getProductsByName(name: string): Promise<Product[]> {
    const rule = await apifetch<Product[]>({
      path: ApiPath.productPathSearch(name)
    });

    return rule;
  }
}
