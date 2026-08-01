import { RoleService } from "@/services/roleService";
import { Role } from "@/types/role";
import { useEffect, useState } from "react";
import { Spinner } from '@wordpress/components';
import { RoleCard } from "../cards/roleCard";


export function Roles() {
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRoles = async () => {
      setLoading(true);
      
      const roles = await RoleService.getRoles();

      setAllRoles(roles);
      setLoading(false);
    }

    getRoles();
  }, []);

  const setActiveStatus = async (role: Role, active: boolean) => {
    role.active = active;

    await RoleService.updateRole(role);
  }

  return (
    <div>
      <div>
        <h1>Roles</h1>
      </div>
      <div className="roles-list">
        { loading ? (
          <Spinner></Spinner>
        ) : (
          allRoles.map(role => (
            <RoleCard role={role} onRoleChanged={(async (role) => await setActiveStatus(role, !role.active))}/>
          ))
        )}  
      </div>
    </div>
  );
}
