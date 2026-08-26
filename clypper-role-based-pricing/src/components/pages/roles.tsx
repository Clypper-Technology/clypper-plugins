import { RoleService } from "@/services/roleService";
import { Role } from "@/types/role";
import { useEffect, useState, useTransition } from "react";
import { Spinner } from '@wordpress/components';
import { RoleCard } from "../cards/roleCard";


export function Roles() {
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [isPending, setTransition] = useTransition();

  useEffect(() => {
    setTransition(async () => {
      const roles = await RoleService.getRoles();

      setAllRoles(roles);
    });
  }, []);

  const setActiveStatus = async (role: Role, active: boolean) => {
    const roles = await RoleService.setRoleActive(role, active);
    setAllRoles(roles);
  }

  return (
    <div>
      <div>
        <h1>Roles</h1>
      </div>
      <div className="roles-list">
        { isPending ? (
          <Spinner />
        ) : (
         allRoles.map(role => (
            <RoleCard role={role} onRoleChanged={(async (role) => await setActiveStatus(role, !role.active))}/>
          ))
        )}  
      </div>
    </div>
  );
}
