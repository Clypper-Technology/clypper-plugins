interface RoleStatusProps {
  active: boolean
}

export const RoleStatus = (props: RoleStatusProps) => {
  return (
    <div className={"status-indicator " + (props.active ? "active" : "inactive")} >
    </div>
  );
}
