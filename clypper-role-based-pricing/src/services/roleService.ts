import { Role } from "../types/role";
import { ApiPath } from "../shared/apiPaths";
import apiFetch from "@wordpress/api-fetch";

export class RoleService {
  public static async getRoles(): Promise<Role[]> {
    const response = await apiFetch<Role[]>({
      path: ApiPath.rolesPath(),
    });

    return response;
  }

  public static async updateRole(role: Role): Promise<void> {
    await apiFetch({
      path: ApiPath.rolesPath(),
      method: "PATCH",
      data: role
    });
  }

  public static async getExistingRoles(): Promise<Role[]> {
    const response = await apiFetch<Role[]>({
      path: ApiPath.rolesPath("existing"),
    })

    return response;
  }
}
