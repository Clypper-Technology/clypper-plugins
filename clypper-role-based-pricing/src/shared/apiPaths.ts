import { ApiBase } from "../types/apiBases"

export class ApiPath {
  public static rulesPath(): string {
    return `${ApiBase.Base}${ApiBase.Rules}`
  }

  public static rulePath(ruleId: number): string {
    return `${this.rulesPath()}/${ruleId}`
  }

  public static rolesPath(status = ""): string {
    if(status) {
      return `${ApiBase.Base}${ApiBase.Roles}?status=${status}`
    }
    return `${ApiBase.Base}${ApiBase.Roles}`
  }

  public static rolePath(roleId: string): string {
    return this.rolesPath() + "/" + roleId;
  }
}
