import { ProductRuleListItem } from "./listItems/ProductRuleListItem";
import type { FieldArrayWithId } from "react-hook-form";
import type { RoleRules } from "@/types/roleRules";

interface ProductRuleListProps {
  fields: FieldArrayWithId<RoleRules, "products", "id">[];
  onRemove: (index: number) => void;
}

export const ProductRuleList = ({
  fields,
  onRemove,
}: ProductRuleListProps) => {
  return (
    <table className="wp-list-table widefat fixed striped">
      <thead>
        <tr>
          <th style={{width: 70}}></th>
          <th>Name</th>
          <th style={{width: 150}}>Price</th>
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
          <ProductRuleListItem
            key={field.id}
            index={index}
            onRemove={() => onRemove(index)}
          />
        ))}
      </tbody>
    </table>
  );
};
