import { CategoryRule } from "@/types/categoryRule"
import { RoleRules } from "@/types/roleRules"
import { Button } from "@wordpress/components"
import { Badge, CollapsibleCard } from "@wordpress/ui"
import { useState } from "react"
import { AddCategoryRule } from "./AddCategoryRule"

interface CategoryRulesPanelProps {
  rule: RoleRules,
}

export const CategoryRulesPanel = (props: CategoryRulesPanelProps) => {
  const [addRule, setAddRule] = useState<boolean>(false);

  async function addProductRule(rule: CategoryRule) {

  }

  return (
    <CollapsibleCard.Root defaultOpen>
      <CollapsibleCard.Header>
        <div className="row">
          <h2>Category Rules</h2>
          <Badge intent="draft">
            {`${props.rule.products.length}`}
          </Badge>
        </div>
      </CollapsibleCard.Header>

      <CollapsibleCard.Content>
        <div className="row">
          <Button isDestructive={addRule} variant="primary" onClick={() => setAddRule(!addRule)}>{ addRule ? "Close" : "Add rule"}</Button>
        </div>
        
        { addRule && (
          <AddCategoryRule OnAddProduct={addProductRule} />
        )}

      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
