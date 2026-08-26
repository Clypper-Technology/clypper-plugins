import { Button } from "@wordpress/components"
import { Badge, CollapsibleCard } from "@wordpress/ui"
import { useFieldArray, useFormContext } from "react-hook-form"
import { RoleRules } from "@/types/roleRules"
import { Category } from "@/types/category"
import { createRuleFromCategory } from "@/factories/itemRuleFactory"
import { useState } from "react"
import { RuleList } from "../controls/RuleList"
import { AddRule } from "./AddRule"
import { CategoryService } from "@/services/categoryService"

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

  const search = async (search: strign) => {
    return await CategoryService.getCategoriesByName(search)
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
          <AddRule onAdd={onCategoryAdded} onSearch={search} ruleKey="single_categories"/>
        )}

        <RuleList fields={fields} ruleKey="single_categories" onRemove={remove}/>

      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
