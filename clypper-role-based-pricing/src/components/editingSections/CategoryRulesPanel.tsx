import { Button } from "@wordpress/components"
import { Badge, CollapsibleCard } from "@wordpress/ui"
import { AddCategoryRule } from "./AddCategoryRule"
import { useFieldArray, useFormContext } from "react-hook-form"
import { RoleRules } from "@/types/roleRules"
import { Category } from "@/types/category"
import { createRuleFromCategory } from "@/factories/itemRuleFactory"
import { useState } from "react"
import { RuleList } from "../controls/RuleList"

interface CategoryRulesPanelProps {
}

export const CategoryRulesPanel = (props: CategoryRulesPanelProps) => {
  const [addRule, setAddRule] = useState<boolean>(false);
  const { control } = useFormContext<RoleRules>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'single_categories'
  })

  const onCategoryAdded = (category: Category) => {
    append(createRuleFromCategory(category));
  }

  return (
    <CollapsibleCard.Root defaultOpen>
      <CollapsibleCard.Header>
        <div className="row">
          <h2>Category Rules</h2>
          <Badge intent="draft">
            {`${fields.length}`}
          </Badge>
        </div>
      </CollapsibleCard.Header>

      <CollapsibleCard.Content>
        <div className="row">
          <Button isDestructive={addRule} variant="primary" onClick={() => setAddRule(!addRule)}>{ addRule ? "Close" : "Add rule"}</Button>
        </div>
        
        { addRule && (
          <AddCategoryRule onAdd={onCategoryAdded} />
        )}

        <RuleList fields={fields} ruleKey="single_categories" onRemove={remove}/>

      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
