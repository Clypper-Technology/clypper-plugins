import { RoleRules } from "@/types/roleRules"
import { Badge, CollapsibleCard } from "@wordpress/ui"
import { ProductRule } from "@/types/productRule";
import { Button } from "@wordpress/components";
import { useState } from "react";
import { AddProductRule } from "./AddProductRule";

interface ProductRulesPanelProps {
  rule: RoleRules,
  onProductAdded: (rule: RoleRules) => void
}

export const ProductRulesPanel = ({ rule, onProductAdded }: ProductRulesPanelProps) => {
  const [addRule, setAddRule] = useState<boolean>(false);

  function addProductRule(productRule: ProductRule) {
    const updatedRule: RoleRules = {
      ...rule,
      products: [...rule.products, productRule],
    }

    onProductAdded(updatedRule)
  }

  return (
    <CollapsibleCard.Root defaultOpen>
      <CollapsibleCard.Header>
        <div className="row">
          <h2>Product Rules</h2>
          <Badge intent="draft">
            {`${rule.products.length}`}
          </Badge>
        </div>
      </CollapsibleCard.Header>

      <CollapsibleCard.Content>
        <div className="row">
          <Button isDestructive={addRule} variant="primary" onClick={() => setAddRule(!addRule)}>{ addRule ? "Close" : "Add rule"}</Button>
        </div>
        
        { addRule && (
          <AddProductRule onAddProduct={addProductRule} />
        )}

        {rule.products.map(product => (
          <h2 key={product.id}>{product.name}</h2>
        ))}

      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
