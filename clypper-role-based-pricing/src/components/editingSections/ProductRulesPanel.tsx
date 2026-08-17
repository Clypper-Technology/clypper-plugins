import { RoleRules } from "@/types/roleRules"
import { Badge, CollapsibleCard } from "@wordpress/ui"
import { ProductRule } from "@/types/productRule";
import { Button } from "@wordpress/components";
import { useState } from "react";
import { AddProductRule } from "./AddProductRule";
import { ProductRuleList } from "../controls/ProductRuleList";
import { Product } from "@/types/product";
import { PricingRule } from "@/types/pricingRule";

interface ProductRulesPanelProps {
  rule: RoleRules,
  onProductAdded: (rule: RoleRules) => void
}

export const ProductRulesPanel = ({ rule, onProductAdded }: ProductRulesPanelProps) => {
  const [addRule, setAddRule] = useState<boolean>(false);

  function addProductRule(product: Product) {
    const pricingRule: PricingRule = {
      type: '',
      value: '0',
      quantity: '0',
      quantity_type: '' 
    };

    const productRule: ProductRule = {
      id: product.id,
      name: product.name,
      rule: pricingRule,
      min_qty: 0,
      image_url: product.image_url
    }

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
        <div className="col">
          <div className="row">
           <Button isDestructive={addRule} variant="primary" onClick={() => setAddRule(!addRule)}>{ addRule ? "Close" : "Add rule"}</Button>
         </div>
        
         { addRule && (
            <AddProductRule onAddProduct={addProductRule} products={rule.products}/>
         )}

          <ProductRuleList productRules={rule.products}/>
        </div>
      </CollapsibleCard.Content>
    </CollapsibleCard.Root>
  )
}
