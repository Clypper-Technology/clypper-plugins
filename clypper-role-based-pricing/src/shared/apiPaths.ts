import { ApiBase } from "../types/apiBases"

export class ApiPath {
  public static rulesPath(): string {
    return `${ApiBase.Base}${ApiBase.Rules}`
  }

  public static rolesPath(): string {
    return `${ApiBase.Base}${ApiBase.Roles}`
  }
}
