import { Role } from "@/types/role";
import { Button, Card, CardBody } from "@wordpress/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface RoleCardProps {
  role: Role,
  onRoleDeleted: (role: Role) => Promise<void>
}

export const RoleCard = (props: RoleCardProps) => {
  const [isLoading, setLoading] = useState(false);
  const role = props.role;
  const navigate = useNavigate();
  
  async function deleteRole(role: Role) {
    setLoading(true);

    await props.onRoleDeleted(role);

    setLoading(false);
  }

  return (
    <Card className="row-card">
      <CardBody className="row-card-body">
        <span>{role.name}</span>
        
        <div className="row">
          <Button onClick={() => navigate(`/role/${role.id}`)} variant="primary" isBusy={isLoading} disabled={isLoading}>Edit</Button>
          <Button isDestructive variant="primary" onClick={() => deleteRole(role)} isBusy={isLoading} disabled={isLoading}>Delete</Button>
        </div>
      </CardBody>
    </Card>
  );
}
