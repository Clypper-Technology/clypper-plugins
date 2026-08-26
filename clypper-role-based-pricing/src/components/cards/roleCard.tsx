import { Role } from "@/types/role";
import { Button, Card, CardBody } from "@wordpress/components";
import { Badge } from "@wordpress/ui";
import { useNavigate } from "react-router-dom";
import { RoleStatus } from "../feedback/roleStatus";
import { useTransition } from "react";

interface RoleCardProps {
  role: Role,
  onRoleChanged: (role: Role) => Promise<void>
}

export const RoleCard = ({
  role,
  onRoleChanged
}: RoleCardProps) => {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleRoleChange = () => {
    startTransition(async () => {
      await onRoleChanged(role);
    });
  }

  return (
    <Card className="row-card">
      <CardBody className="row-card-body">
        <div className="row space-between card-text">
          <div className="row">
            <RoleStatus active={role.active} />
            <span>{role.name}</span>
          </div>
          <Badge intent="draft">
            {`${role.rule_count} rules`}
          </Badge>
        </div>

        <div className="row">
          { role.active ? (<>
            <Button onClick={() => navigate(`/role/${role.id}`)} variant="secondary" disabled={isPending} isBusy={isPending}>Edit</Button>
            <Button isDestructive onClick={handleRoleChange} disabled={isPending} isBusy={isPending}>Disable</Button>
          </>) : (
            <Button variant="primary" onClick={handleRoleChange} disabled={isPending} isBusy={isPending}>Activate</Button>
          )}
        </div>
      </CardBody>
    </Card>
  );
}
