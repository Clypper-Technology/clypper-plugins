import { RoleRules } from "@/types/roleRules";
import { RuleKey } from "@/types/RuleKey";
import { ruleTypeFormValues } from "@/types/ruleType";
import { Button, SelectControl } from "@wordpress/components";
import { trash } from "@wordpress/icons";
import { Input } from "@wordpress/ui";
import { Controller, useFormContext } from "react-hook-form";

interface RuleListItemProps {
  index: number,
  ruleKey: RuleKey,
  onRemove?: () => void
}

export const RuleListItem = ({
  index,
  ruleKey,
  onRemove
}: RuleListItemProps) => {
  const { control, watch } = useFormContext<RoleRules>();
  const rule = watch(`${ruleKey}.${index}`);
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

      {ruleKey === "products" && (
        <td>{rule.price}</td>
      )}
      <td>
        <Controller 
          control={control}
          name={`${ruleKey}.${index}.rule.type`}
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
          name={`${ruleKey}.${index}.rule.value`}
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
          name={`${ruleKey}.${index}.min_qty`}
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
          name={`${ruleKey}.${index}.rule.quantity_type`}
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
          name={`${ruleKey}.${index}.rule.quantity`}
          render={({field}) => (
            <Input 
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </td>
      <td>
        <Button
          icon={trash}
          label="Delete"
          isDestructive
          onClick={onRemove}
        />
      </td>
    </tr>
  );
};
