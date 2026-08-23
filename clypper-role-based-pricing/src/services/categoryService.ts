import { ApiPath } from "@/shared/apiPaths";
import { Category } from "@/types/category";
import apiFetch from "@wordpress/api-fetch";

export class CategoryService {
  public static async getCategoriesByName(name: string): Promise<Category[]> {
     const rule = await apiFetch<Category[]>({
      path: ApiPath.categoryPathSearch(name)
    });

    return rule;

  }
}
