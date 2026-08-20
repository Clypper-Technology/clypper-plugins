import { RoleRules } from "@/types/roleRules";
import { ruleTypeFormValues } from "@/types/ruleType";
import { SelectControl } from "@wordpress/components";
import { Input } from "@wordpress/ui";
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

      <td>
        <Controller 
          control={control}
          name={`products.${index}.rule.value`}
          render={({field}) => (
            <Input
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </td>
      <td>
        <Controller 
          control={control}
          name={`products.${index}.min_qty`}
          render={({field}) => (
            <Input 
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </td>
      <td>
        <Controller 
          control={control}
          name={`products.${index}.rule.quantity_type`}
          render={({ field }) => (
            <SelectControl 
              value={field.value}
              options={ruleTypeFormValues}
              onChange={field.onChange}
            />
          )}
        />
      </td>
      <td>
      <Controller 
          control={control}
          name={`products.${index}.rule.quantity`}
          render={({field}) => (
            <Input 
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </td>
    </tr>
  );
};
