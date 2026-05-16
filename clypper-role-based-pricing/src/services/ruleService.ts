import { RoleRules } from '../types/roleRules';
import { ApiPath } from '../shared/apiPaths';
import apifetch from '@wordpress/api-fetch';




export class RuleService {
  private static resource = ApiPath.rulesPath();

  public static async getRules(): Promise<RoleRules[]> {
    const rules = await apifetch<RoleRules[]>({ path: this.resource})

    return rules;
  }
}
