import { RoleRules } from '../types/roleRules';
import { ApiPath } from '../shared/apiPaths';
import apifetch from '@wordpress/api-fetch';




export class RuleService {
  private static resource = ApiPath.rulesPath();

  public static async getRule(id: number): Promise<RoleRules> {
    const rule = await apifetch<RoleRules>({
      path: ApiPath.rulePath(id)
    });

    return rule;
  }

  public static async getRules(): Promise<RoleRules[]> {
    const rules = await apifetch<RoleRules[]>({ path: this.resource})

    return rules;
  }

  public static async addRules(slug: string): Promise<number> {
    const id = await apifetch<number>({
      path: this.resource,
      method: "POST",
      data: {
        slug: slug
      }
    })

    return id;
  }

  public static async deleteRule(id: number): Promise<void> {
    await apifetch({
      path: ApiPath.rulePath(id),
      method: "DELETE",
    })


  }
}
