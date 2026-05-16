import { Role } from "../types/role";
import { ApiPath } from "../shared/apiPaths";
import apiFetch from "@wordpress/api-fetch";

type RolesResponse = Record<string, string>;

export class RoleService {
  public static async getRoles(): Promise<Role[]> {
    const response = await apiFetch<RolesResponse>({
      path: ApiPath.rolesPath(),
    });

    return Object.entries(response).map(([slug, name]) => ({
      slug,
      name,
    }));
  }
}
