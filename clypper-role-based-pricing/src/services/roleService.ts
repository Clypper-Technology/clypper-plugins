import { Role } from "../types/role";
import { ApiPath } from "../shared/apiPaths";
import apiFetch from "@wordpress/api-fetch";

type RolesResponse = Record<string, string>;

export class RoleService {
  public static async getRoles(): Promise<Role[]> {
    const response = await apiFetch<Role[]>({
      path: ApiPath.rolesPath(),
    });

    return response;
  }

  public static async getExistingRoles(): Promise<Role[]> {
    const response = await apiFetch<Role[]>({
      path: ApiPath.rolesPath("existing"),
    })

    return response;
  }
}
