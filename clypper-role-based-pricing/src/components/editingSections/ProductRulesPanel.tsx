import { RoleRules } from "@/types/roleRules"
import { Badge, CollapsibleCard } from "@wordpress/ui"
import { Button } from "@wordpress/components";
import { useState } from "react";
import { AddProductRule } from "./AddProductRule";
import { ProductRuleList } from "../controls/ProductRuleList";
import { Product } from "@/types/product";

interface ProductRulesPanelProps {
  rule: RoleRules,
  onProductAdded: (rule: Product) => void
}

export const ProductRulesPanel = ({ rule, onProductAdded }: ProductRulesPanelProps) => {
  const [addRule, setAddRule] = useState<boolean>(false);

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
        <div className="col">
          <div className="row">
            <Button isDestructive={addRule} variant="primary" onClick={() => setAddRule(!addRule)}>{ addRule ? "Close" : "Add rule"}</Button>
          </div>
        
         { addRule && (
            <AddProductRule onAddProduct={((product) => onProductAdded(product))} products={rule.products}/>
         )}

          <ProductRuleList productRules={rule.products}/>
        </div>
      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
