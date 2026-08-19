import { RoleRules } from "@/types/roleRules";
import { ruleTypeFormValues } from "@/types/ruleType";
import { SelectControl } from "@wordpress/components";
import { Controller, useFormContext } from "react-hook-form";


interface ProductRuleListItemProps {
  index: number
  onRemove?: () => void
}

export const ProductRuleListItem = ({
  index,
  onRemove
}: ProductRuleListItemProps) => {
  const { control, watch } = useFormContext<RoleRules>();
  
  const rule = watch(`products.${index}`);

  return (
    <tr>
      <td>
        <img
          src={rule.image_url}
          alt=""
          style={{
            width: 50,
            height: 50,
            objectFit: "cover",
            borderRadius: 2,
          }}
        />
      </td>

      <td>{rule.name}</td>

      <td>{rule.price}</td>

      <td>
        <Controller 
          control={control}
          name={`products.${index}.rule.type`}
          render={({ field }) => (
            <SelectControl 
              value={field.value}
              options={ruleTypeFormValues}
              onChange={field.onChange}
            />
          )}
        />
      </td>

      <td>{rule.rule.value}</td>
      <td>{rule.min_qty}</td>
      <td>{rule.rule.quantity_type}</td>
      <td>{rule.rule.value}</td>
    </tr>
  );
};
