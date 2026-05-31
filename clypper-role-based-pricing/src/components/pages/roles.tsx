import { RoleService } from "@/services/roleService";
import { Role } from "@/types/role";
import { useEffect, useState } from "react";
import { Button, Card, CardBody, Spinner } from '@wordpress/components';
import { useNavigate } from "react-router-dom";


export function Roles() {

  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const getRoles = async () => {
      const roles = await RoleService.getRoles();

      setRoles(roles);
      setLoading(false);
    }

    getRoles();
  }, [])

  return (
    <div>
      <h1>Role</h1>
      <div className="roles-list">
        { loading ? (
          <Spinner></Spinner>
        ) : (
          roles.map(role => (
            <Card className="row-card">
              <CardBody className="row-card-body">
                <span>{role.name}</span>

                <Button onClick={() => navigate(`/role/${role.slug}`)}>Edit</Button>
              </CardBody>
            </Card>
          ))
        )}  
      </div>
    </div>
  );
}
