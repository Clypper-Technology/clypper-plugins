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

  public static async setRoleActive(role: Role, active: boolean): Promise<Role[]> {
    role.active = active;

    await this.updateRole(role);

    return this.getRoles();
  }

  public static async updateRole(role: Role): Promise<number> {
    const id = await apiFetch<number>({
      path: ApiPath.rolesPath(),
      method: "PATCH",
      data: role
    });

    return id;
  }
}
