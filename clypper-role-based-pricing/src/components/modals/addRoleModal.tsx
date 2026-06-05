import { RuleService } from "@/services/ruleService";
import { Role } from "@/types/role";
import { Button, Modal } from "@wordpress/components";
import { useState } from "react";

interface AddRolesModalProps {
  existingRoles: Role[],
  allRoles: Role[],
  onRoleAdded: (role: Role) => void
}

export const AddRolesModal = (props: AddRolesModalProps) => {
  const [isOpen, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const roles = props.allRoles.filter(
      role => !props.existingRoles.find(existing => existing.slug === role.slug)
  );

  const addRole = async (role: Role) => {
    const id = await RuleService.addRules(role.slug);

    props.onRoleAdded(role);
  }
  
  return (
    <div>
      <Button onClick={ openModal } variant="primary">Add Role</Button>
      { isOpen && (
        <Modal title="Add Roles" onRequestClose={ closeModal }>
          <div>
            {roles.map(role => (
              <div className="row space-between">
                <p>{role.name}</p>
                <Button onClick={() => addRole(role)} variant="primary">Add</Button>
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
}
