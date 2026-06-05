import { RoleService } from "@/services/roleService";
import { Role } from "@/types/role";
import { useEffect, useState } from "react";
import { Spinner } from '@wordpress/components';
import { AddRolesModal } from "../modals/addRoleModal";
import { RuleService } from "@/services/ruleService";
import { RoleCard } from "../cards/roleCard";


export function Roles() {
  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [existingRoles, setExistingRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRoles = async () => {
      setLoading(true);
      const roles = await RoleService.getRoles();
      const existingRoles = await RoleService.getExistingRoles();

      setAllRoles(roles);
      setExistingRoles(existingRoles);
      setLoading(false);
    }

    getRoles();
  }, []);

  const deleteRole = async (role: Role) => {
    await RuleService.deleteRule(role.id);

    setExistingRoles(prev => prev.filter(r => r.slug !== role.slug));
  }

  const onRoleAdded = (role: Role) => {
    setExistingRoles(prev => [...prev, role]);
  }

  return (
    <div>
      <div>
        <h1>Roles</h1>
        <AddRolesModal existingRoles={existingRoles} allRoles={allRoles} onRoleAdded={onRoleAdded}/>
      </div>
      <div className="roles-list">
        { loading ? (
          <Spinner></Spinner>
        ) : (
          existingRoles.map(role => (
            <RoleCard role={role} onRoleDeleted={deleteRole}/>
          ))
        )}  
      </div>
    </div>
  );
}
