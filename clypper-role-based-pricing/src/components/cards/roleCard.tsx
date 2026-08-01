import { Role } from "@/types/role";
import { Button, Card, CardBody } from "@wordpress/components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RoleStatus } from "../feedback/roleStatus";

interface RoleCardProps {
  role: Role,
  onRoleChanged: (role: Role) => Promise<void>
}

export const RoleCard = (props: RoleCardProps) => {
  const [isLoading, setLoading] = useState(false);
  const role = props.role;
  const navigate = useNavigate();
  
  async function changeStatus(role: Role) {
    setLoading(true);

    await props.onRoleChanged(role);

    setLoading(false);
  }

  return (
    <Card className="row-card">
      <CardBody className="row-card-body">
        <div className="row">
          <RoleStatus active={role.active} />
          <span>{role.name}</span>
        </div>
        
        <div className="row">

          { role.active ? (<>
            <Button onClick={() => navigate(`/role/${role.id}`)} variant="primary" isBusy={isLoading} disabled={isLoading}>Edit</Button>
            <Button isDestructive variant="primary" onClick={() => changeStatus(role)} isBusy={isLoading} disabled={isLoading}>Disable</Button>
          </>) : (
            <Button variant="primary" onClick={() => changeStatus(role)} isBusy={isLoading} disabled={isLoading}>Activate</Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
