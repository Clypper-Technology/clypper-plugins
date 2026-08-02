import { RoleRules } from "@/types/roleRules"
import { Badge, CollapsibleCard } from "@wordpress/ui"
import { AddProductRule } from "./addProductRule";
import { ProductRule } from "@/types/productRule";
import { Button } from "@wordpress/components";
import { useState } from "react";

interface ProductRulesPanelProps {
  rule: RoleRules,
  onProductAdded: (rule: RoleRules) => Promise<void>
}

export const ProductRulesPanel = (props: ProductRulesPanelProps) => {
  const [addRule, setAddRule] = useState<boolean>(false);

  async function addProductRule(rule: ProductRule) {

  }

  return (
    <CollapsibleCard.Root defaultOpen>
      <CollapsibleCard.Header>
        <div className="row">
          <h2>Product Rules</h2>
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
          <AddProductRule OnAddProduct={addProductRule} />
        )}

      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
