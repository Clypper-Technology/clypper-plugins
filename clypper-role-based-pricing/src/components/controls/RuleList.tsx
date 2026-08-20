import { RuleListItem } from "./listItems/RuleListItem";
import type { FieldArrayWithId } from "react-hook-form";
import type { RoleRules } from "@/types/roleRules";
import { RuleKey } from "@/types/RuleKey";

interface RuleListProps {
  fields: FieldArrayWithId<RoleRules, RuleKey, "id">[];
  ruleKey: RuleKey,
  onRemove: (index: number) => void;
}

export const RuleList = ({
  fields,
  ruleKey,
  onRemove,
}: RuleListProps) => {
  return (
    <table className="wp-list-table widefat fixed striped">
      <thead>
        <tr>
          <th style={{width: 70}}></th>
          <th>Name</th>

          { ruleKey == "products" && (
            <th style={{width: 150}}>Price</th>
          )}
          <th>Rule type</th>
          <th style={{width: 130}}>Value</th>
          <th style={{width: 130}}>Min quantity</th>
          <th>Reduction type</th>
          <th style={{width: 130}}>Value</th>
          <th style={{width: 50}}></th>
        </tr>
      </thead>

      <tbody>
        {fields.map((field, index) => (
          <RuleListItem
            key={field.id}
            ruleKey={ruleKey}
            index={index}
            onRemove={() => onRemove(index)}
          />
        ))}
      </tbody>
    </table>
  );
};
