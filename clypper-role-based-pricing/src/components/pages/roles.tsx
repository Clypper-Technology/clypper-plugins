import { RoleService } from "@/services/roleService";
import { Role } from "@/types/role";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Spinner } from '@wordpress/components';
import { useNavigate } from "react-router-dom";
import { AddRolesModal } from "../modals/addRoleModal";
import { RuleService } from "@/services/ruleService";


export function Roles() {

  const [allRoles, setAllRoles] = useState<Role[]>([]);
  const [existingRoles, setExistingRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

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
    RuleService.deleteRule(role.id);

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
            <Card className="row-card">
              <CardBody className="row-card-body">
                <span>{role.name}</span>
                
                <div class="row">
                  <Button onClick={() => navigate(`/role/${role.slug}`)} variant="primary">Edit</Button>
                  <Button isDestructive variant="primary" onClick={() => deleteRole(role)}>Delete</Button>
                </div>
              </CardBody>
            </Card>
          ))
        )}  
      </div>
    </div>
  );
}
